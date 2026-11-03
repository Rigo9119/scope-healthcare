import { type Locale, localizedPath } from "./localizedRoutes";
import { SITE_SETTINGS_FALLBACK } from "./siteSettingsFallback";

// Central SEO config + per-route <head> builders for TanStack Router.
//
// Production base URL (no trailing slash). Currently the live Netlify URL —
// switch to the custom domain once the client migrates it. Also hardcoded in
// `public/robots.txt` and `public/sitemap.xml`.
export const SITE_URL = "https://scope-healthcare.netlify.app";
export const SITE_NAME = "Scope Health";
export const DEFAULT_OG_IMAGE = "/logo512.png";

interface SeoInput {
	title: string;
	description: string;
	locale: Locale;
	/** Path WITHOUT the locale prefix, e.g. "" for home, "/servicios". */
	path?: string;
	image?: string;
	/** Keep the page out of search results (e.g. a "coming soon" page). */
	noindex?: boolean;
}

/**
 * Builds a TanStack Router `head` object: title, description, Open Graph,
 * Twitter cards, canonical, es/en/x-default hreflang alternates and the clinic
 * JSON-LD. URLs end in "/" because Netlify serves each prerendered page as
 * `<path>/index.html` and 301s the slash-less address.
 */
export function seoHead({
	title,
	description,
	locale,
	path = "",
	image = DEFAULT_OG_IMAGE,
	noindex = false,
}: SeoInput) {
	const url = `${SITE_URL}/${locale}${path}/`;
	// Section and item slugs are translated, so each alternate has its own path.
	const alt = (l: Locale) =>
		`${SITE_URL}${localizedPath(`/${locale}${path}`, l)}`;
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
			{
				name: "twitter:card",
				// The default image is the square logo, which only suits the small card.
				content: image === DEFAULT_OG_IMAGE ? "summary" : "summary_large_image",
			},
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },
			...(noindex ? [{ name: "robots", content: "noindex" }] : []),
		],
		links: [
			{ rel: "canonical", href: url },
			{ rel: "alternate", hrefLang: "es", href: alt("es") },
			{ rel: "alternate", hrefLang: "en", href: alt("en") },
			{ rel: "alternate", hrefLang: "x-default", href: alt("es") },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(clinicJsonLd(locale)),
			},
		],
	};
}

/** schema.org MedicalClinic for local/medical search, from the real contact data. */
export function clinicJsonLd(locale: Locale) {
	const s = SITE_SETTINGS_FALLBACK[locale];
	return {
		"@context": "https://schema.org",
		"@type": "MedicalClinic",
		name: SITE_NAME,
		url: `${SITE_URL}/${locale}/`,
		description: HOME_SEO[locale].description,
		telephone: s.footerPhone,
		...(s.footerEmail && { email: s.footerEmail }),
		address: {
			"@type": "PostalAddress",
			streetAddress: s.footerAddress.replace(/, Bogotá$/, ""),
			addressLocality: "Bogotá",
			addressCountry: "CO",
		},
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
			opens: "08:00",
			closes: "18:00",
		},
		availableLanguage: ["es", "en"],
	};
}

/** Per-locale SEO copy for the home page. Real, keyword-aware defaults the
 *  client can refine later (or we can move these into Sanity). */
export const HOME_SEO: Record<Locale, { title: string; description: string }> =
	{
		es: {
			title:
				"Scope Health | Turismo médico en Bogotá, atención de clase mundial",
			description:
				"Cirugías y tratamientos médicos de alta calidad en Bogotá, Colombia, para pacientes internacionales. Especialistas certificados, precios transparentes y acompañamiento integral.",
		},
		en: {
			title: "Scope Health | Medical Tourism in Bogotá, World-Class Care",
			description:
				"High-quality surgery and medical treatments in Bogotá, Colombia for international patients. Board-certified specialists, transparent pricing, and full-journey support.",
		},
	};
