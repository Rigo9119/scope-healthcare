// ─── Localized route registry ─────────────────────────────────────────────────
// Single source of truth for top-level pages whose URL slug is translated per
// locale (e.g. /es/nuestros-servicios ⇄ /en/our-services). Used by the dynamic
// `$lang/$section` route, the navbar, the per-section SEO, and the sitemap.

import { itemFromPath, pillarBySlug } from "./pillars";

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const SECTIONS = {
	// Retired page; kept so old links redirect to home.
	services: { es: "nuestros-servicios", en: "our-services" },
	team: { es: "nuestro-equipo", en: "our-team" },
	blog: { es: "blog", en: "blog" },
	about: { es: "sobre-nosotros", en: "about-us" },
	contact: { es: "contacto", en: "contact" },
	privacy: { es: "privacidad", en: "privacy" },
	terms: { es: "terminos", en: "terms" },
	cookies: { es: "cookies", en: "cookies" },
} as const;

export type SectionKey = keyof typeof SECTIONS;

export function toLocale(lang: string): Locale {
	return lang === "en" ? "en" : "es";
}

export function sectionSlug(key: SectionKey, locale: Locale): string {
	return SECTIONS[key][locale];
}

export function sectionPath(key: SectionKey, locale: Locale): string {
	return `/${locale}/${SECTIONS[key][locale]}`;
}

/** Resolve a slug to its section, requiring it to match the given locale. */
export function sectionFromSlug(
	slug: string,
	locale: Locale,
): SectionKey | null {
	for (const key of Object.keys(SECTIONS) as SectionKey[]) {
		if (SECTIONS[key][locale] === slug) return key;
	}
	return null;
}

/** Resolve a slug to its section in ANY locale — used to detect a slug that's
 *  valid but for the wrong locale (so we can redirect to the correct one). */
export function sectionFromAnySlug(
	slug: string,
): { key: SectionKey; locale: Locale } | null {
	for (const key of Object.keys(SECTIONS) as SectionKey[]) {
		for (const locale of LOCALES) {
			if (SECTIONS[key][locale] === slug) return { key, locale };
		}
	}
	return null;
}

/** The same page in another locale (with a trailing slash, like every URL on
 *  the site): swaps the `/{locale}` prefix, translates a
 *  localized section slug (e.g. /es/contacto → /en/contact) and a pillar item
 *  segment (e.g. /es/scope-clinic/urologia → /en/scope-clinic/urology). Pillar
 *  slugs are identical across locales. */
export function localizedPath(pathname: string, next: Locale): string {
	const [slug, ...rest] = pathname.split("/").filter(Boolean).slice(1);
	if (!slug) return `/${next}/`;
	const match = sectionFromAnySlug(slug);
	const translated = match ? sectionSlug(match.key, next) : slug;
	const pillar = pillarBySlug(slug);
	const item = pillar && rest[0] ? itemFromPath(pillar, rest[0]) : null;
	if (item) rest[0] = item.item.path[next];
	return `${["", next, translated, ...rest].join("/")}/`;
}

// ─── Per-section SEO copy (defaults; real copy can later come from Sanity) ──────
export const SECTION_SEO: Record<
	SectionKey,
	Record<Locale, { title: string; description: string }>
> = {
	services: {
		es: {
			title: "Nuestros servicios y especialidades | Scope Healthcare",
			description:
				"Servicios médicos y especialidades de Scope Healthcare en Bogotá: tratamientos certificados para pacientes internacionales.",
		},
		en: {
			title: "Our Services & Specialties | Scope Healthcare",
			description:
				"Scope Healthcare's medical services and specialties in Bogotá: certified treatments for international patients.",
		},
	},
	team: {
		es: {
			title: "Nuestro equipo | Scope Healthcare",
			description:
				"Conoce a los especialistas certificados detrás de Scope Healthcare en Bogotá.",
		},
		en: {
			title: "Our Team | Scope Healthcare",
			description:
				"Meet the board-certified specialists behind Scope Healthcare in Bogotá.",
		},
	},
	blog: {
		es: {
			title: "Blog | Scope Healthcare",
			description:
				"Artículos y guías sobre turismo médico, tratamientos y salud en Scope Healthcare.",
		},
		en: {
			title: "Blog | Scope Healthcare",
			description:
				"Articles and guides on medical tourism, treatments and health from Scope Healthcare.",
		},
	},
	about: {
		es: {
			title: "Sobre nosotros | Scope Healthcare",
			description:
				"Quiénes somos: turismo médico de clase mundial en Bogotá para pacientes internacionales.",
		},
		en: {
			title: "About Us | Scope Healthcare",
			description:
				"Who we are: world-class medical tourism in Bogotá for international patients.",
		},
	},
	contact: {
		es: {
			title: "Contacto | Scope Healthcare",
			description:
				"Contáctanos para agendar tu consulta. Estamos en Bogotá y atendemos a pacientes internacionales.",
		},
		en: {
			title: "Contact | Scope Healthcare",
			description:
				"Get in touch to book your consultation. Based in Bogotá, serving international patients.",
		},
	},
	privacy: {
		es: {
			title: "Política de privacidad | Scope Healthcare",
			description:
				"Cómo Scope Healthcare recopila, usa y protege tus datos personales.",
		},
		en: {
			title: "Privacy Policy | Scope Healthcare",
			description:
				"How Scope Healthcare collects, uses and protects your personal data.",
		},
	},
	terms: {
		es: {
			title: "Términos y condiciones | Scope Healthcare",
			description:
				"Términos y condiciones de uso del sitio y los servicios de Scope Healthcare.",
		},
		en: {
			title: "Terms & Conditions | Scope Healthcare",
			description:
				"Terms and conditions for using Scope Healthcare's website and services.",
		},
	},
	cookies: {
		es: {
			title: "Política de cookies | Scope Healthcare",
			description:
				"Qué cookies utiliza Scope Healthcare y cómo puedes gestionarlas.",
		},
		en: {
			title: "Cookie Policy | Scope Healthcare",
			description:
				"Which cookies Scope Healthcare uses and how you can manage them.",
		},
	},
};
