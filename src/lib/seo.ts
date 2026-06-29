// Central SEO config + per-route <head> builders for TanStack Router.
//
// Production base URL (no trailing slash). Currently the live Netlify URL —
// switch to the custom domain once the client migrates it. Also hardcoded in
// `public/robots.txt`, `public/sitemap.xml`, and the JSON-LD in `index.html`.
export const SITE_URL = "https://scope-healthcare.netlify.app";
export const SITE_NAME = "Scope Health";
export const DEFAULT_OG_IMAGE = "/logo512.png";

type Locale = "es" | "en";

interface SeoInput {
	title: string;
	description: string;
	locale: Locale;
	/** Path WITHOUT the locale prefix, e.g. "" for home, "/servicios". */
	path?: string;
	image?: string;
}

/**
 * Builds a TanStack Router `head` object: title, description, Open Graph,
 * Twitter cards, canonical, and es/en/x-default hreflang alternates.
 */
export function seoHead({
	title,
	description,
	locale,
	path = "",
	image = DEFAULT_OG_IMAGE,
}: SeoInput) {
	const url = `${SITE_URL}/${locale}${path}`;
	const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: locale === "es" ? "es_CO" : "en_US" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: imageUrl },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },
		],
		links: [
			{ rel: "canonical", href: url },
			{ rel: "alternate", hrefLang: "es", href: `${SITE_URL}/es${path}` },
			{ rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en${path}` },
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: `${SITE_URL}/es${path}`,
			},
		],
	};
}

/** Per-locale SEO copy for the home page. Real, keyword-aware defaults the
 *  client can refine later (or we can move these into Sanity). */
export const HOME_SEO: Record<Locale, { title: string; description: string }> =
	{
		es: {
			title:
				"Scope Health | Turismo médico en Bogotá — atención de clase mundial",
			description:
				"Cirugías y tratamientos médicos de alta calidad en Bogotá, Colombia, para pacientes internacionales. Especialistas certificados, precios transparentes y acompañamiento integral.",
		},
		en: {
			title: "Scope Health | Medical Tourism in Bogotá — World-Class Care",
			description:
				"High-quality surgery and medical treatments in Bogotá, Colombia for international patients. Board-certified specialists, transparent pricing, and full-journey support.",
		},
	};
