import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PillarItemPage } from "#/components/pages/PillarItemPage.js";
import { toLocale } from "#/lib/localizedRoutes.js";
import { itemContent } from "#/lib/pillarContent.js";
import { canonicalPillar, itemFromPath, pillarBySlug } from "#/lib/pillars.js";
import { pillarItemsQueryOptions } from "#/lib/queries.js";
import { seoHead } from "#/lib/seo.js";

export const Route = createFileRoute("/$lang/$section/$item/")({
	beforeLoad: ({ params }) => {
		const pillar = pillarBySlug(params.section);
		const match = pillar && itemFromPath(pillar, params.item);
		if (!match) throw notFound();
		// The other locale's segment (e.g. /en/scope-clinic/urologia) redirects.
		const segment = match.item.path[toLocale(params.lang)];
		if (segment !== params.item) {
			throw redirect({
				to: "/$lang/$section/$item/",
				params: { ...params, item: segment },
			});
		}
	},
	loader: ({ context: { queryClient }, params }) =>
		queryClient.ensureQueryData(pillarItemsQueryOptions(params.lang)),
	head: ({ params, loaderData }) => {
		const locale = toLocale(params.lang);
		const pillar = pillarBySlug(params.section);
		const item = pillar ? itemFromPath(pillar, params.item)?.item : null;
		if (!pillar || !item) return {};
		// Items listed under two pillars share one canonical URL.
		const home = canonicalPillar(item.slug) ?? pillar;
		const title = `${item.title[locale]} | ${home.title[locale]} | Scope Health`;
		return seoHead({
			locale,
			path: `/${home.slug}/${item.path[locale]}`,
			title,
			description: itemContent(item.slug, locale, loaderData).summary,
		});
	},
	component: ItemPage,
});

function ItemPage() {
	const { lang, section, item } = Route.useParams();
	const locale = toLocale(lang);
	const { data } = useSuspenseQuery(pillarItemsQueryOptions(locale));
	const pillar = pillarBySlug(section);
	const pillarItem = pillar ? itemFromPath(pillar, item)?.item : null;
	if (!pillar || !pillarItem) return null; // beforeLoad guards this
	return (
		<PillarItemPage
			key={locale}
			pillar={pillar}
			item={pillarItem}
			content={itemContent(pillarItem.slug, locale, data)}
		/>
	);
}
