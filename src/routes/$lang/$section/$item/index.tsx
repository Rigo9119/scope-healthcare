import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PillarItemPage } from "#/components/pages/PillarItemPage.js";
import { toLocale } from "#/lib/localizedRoutes.js";
import { itemContent } from "#/lib/pillarContent.js";
import { canonicalPillar, itemBySlug, pillarBySlug } from "#/lib/pillars.js";
import { ensureWithTimeout, pillarItemsQueryOptions } from "#/lib/queries.js";
import { seoHead } from "#/lib/seo.js";

export const Route = createFileRoute("/$lang/$section/$item/")({
	beforeLoad: ({ params }) => {
		const pillar = pillarBySlug(params.section);
		if (!pillar || !itemBySlug(pillar, params.item)) throw notFound();
	},
	loader: ({ context: { queryClient }, params }) =>
		ensureWithTimeout(
			queryClient.ensureQueryData(pillarItemsQueryOptions(params.lang)),
		),
	head: ({ params, loaderData }) => {
		const locale = toLocale(params.lang);
		const pillar = pillarBySlug(params.section);
		const item = pillar ? itemBySlug(pillar, params.item) : null;
		if (!pillar || !item) return {};
		// Items listed under two pillars share one canonical URL.
		const home = canonicalPillar(item.slug) ?? pillar;
		const title = `${item.title[locale]} | ${home.title[locale]} | Scope Health`;
		return seoHead({
			locale,
			path: `/${home.slug}/${item.slug}`,
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
	const pillarItem = pillar ? itemBySlug(pillar, item) : null;
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
