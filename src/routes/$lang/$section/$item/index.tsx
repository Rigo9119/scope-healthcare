import { createFileRoute, notFound } from "@tanstack/react-router";
import { PillarItemPage } from "#/components/pages/PillarItemPage.js";
import { toLocale } from "#/lib/localizedRoutes.js";
import { itemBySlug, pillarBySlug } from "#/lib/pillars.js";
import { seoHead } from "#/lib/seo.js";

export const Route = createFileRoute("/$lang/$section/$item/")({
	beforeLoad: ({ params }) => {
		const pillar = pillarBySlug(params.section);
		if (!pillar || !itemBySlug(pillar, params.item)) throw notFound();
	},
	head: ({ params }) => {
		const locale = toLocale(params.lang);
		const pillar = pillarBySlug(params.section);
		const item = pillar ? itemBySlug(pillar, params.item) : null;
		if (!pillar || !item) return {};
		const title = `${item.title[locale]} | ${pillar.title[locale]} | Scope Health`;
		return seoHead({
			locale,
			path: `/${pillar.slug}/${item.slug}`,
			title,
			description: item.body[locale],
		});
	},
	component: ItemPage,
});

function ItemPage() {
	const { lang, section, item } = Route.useParams();
	const locale = toLocale(lang);
	const pillar = pillarBySlug(section);
	const pillarItem = pillar ? itemBySlug(pillar, item) : null;
	if (!pillar || !pillarItem) return null; // beforeLoad guards this
	// locale is derived in child via useLang(); pass resolved data down.
	return <PillarItemPage key={locale} pillar={pillar} item={pillarItem} />;
}
