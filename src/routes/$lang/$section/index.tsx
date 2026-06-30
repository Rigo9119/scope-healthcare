import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { AboutPage } from "#/components/pages/AboutPage.js";
import { BlogPage } from "#/components/pages/BlogPage.js";
import { ContactPage } from "#/components/pages/ContactPage.js";
import { ServicesPage } from "#/components/pages/ServicesPage.js";
import { TeamPage } from "#/components/pages/TeamPage.js";
import {
	SECTION_SEO,
	sectionFromAnySlug,
	sectionFromSlug,
	sectionSlug,
	toLocale,
} from "#/lib/localizedRoutes.js";
import { seoHead } from "#/lib/seo.js";

export const Route = createFileRoute("/$lang/$section/")({
	beforeLoad: ({ params }) => {
		const locale = toLocale(params.lang);
		// Slug is valid for THIS locale → render it. (Checking current-locale first
		// is essential for slugs shared across locales, e.g. "blog", otherwise the
		// wrong-locale redirect would loop back to the same URL.)
		if (sectionFromSlug(params.section, locale)) return;
		// Slug belongs to the OTHER locale → redirect to the correct localized slug
		// (e.g. /en/nuestros-servicios → /en/our-services).
		const match = sectionFromAnySlug(params.section);
		if (match) {
			throw redirect({
				to: "/$lang/$section",
				params: { lang: locale, section: sectionSlug(match.key, locale) },
			});
		}
		// Unknown slug → 404.
		throw notFound();
	},
	head: ({ params }) => {
		const locale = toLocale(params.lang);
		const key = sectionFromSlug(params.section, locale);
		const seo = key
			? SECTION_SEO[key][locale]
			: { title: "Scope Health", description: "" };
		return seoHead({
			locale,
			path: `/${params.section}`,
			title: seo.title,
			description: seo.description,
		});
	},
	component: SectionPage,
});

function SectionPage() {
	const { lang, section } = Route.useParams();
	const key = sectionFromSlug(section, toLocale(lang));
	switch (key) {
		case "services":
			return <ServicesPage />;
		case "team":
			return <TeamPage />;
		case "blog":
			return <BlogPage />;
		case "about":
			return <AboutPage />;
		case "contact":
			return <ContactPage />;
		default:
			return null; // beforeLoad already guards unknown slugs
	}
}
