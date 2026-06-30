// ─── Localized route registry ─────────────────────────────────────────────────
// Single source of truth for top-level pages whose URL slug is translated per
// locale (e.g. /es/nuestros-servicios ⇄ /en/our-services). Used by the dynamic
// `$lang/$section` route, the navbar, the per-section SEO, and the sitemap.

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const SECTIONS = {
	services: { es: "nuestros-servicios", en: "our-services" },
	team: { es: "nuestro-equipo", en: "our-team" },
	blog: { es: "blog", en: "blog" },
	about: { es: "sobre-nosotros", en: "about-us" },
	contact: { es: "contacto", en: "contact" },
} as const;

export type SectionKey = keyof typeof SECTIONS;

/** Order the sections appear in the navbar. */
export const NAV_SECTIONS: SectionKey[] = [
	"services",
	"team",
	"blog",
	"about",
	"contact",
];

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

// ─── Per-section SEO copy (defaults; real copy can later come from Sanity) ──────
export const SECTION_SEO: Record<
	SectionKey,
	Record<Locale, { title: string; description: string }>
> = {
	services: {
		es: {
			title: "Nuestros servicios y especialidades | Scope Health",
			description:
				"Servicios médicos y especialidades de Scope Health en Bogotá: tratamientos certificados para pacientes internacionales.",
		},
		en: {
			title: "Our Services & Specialties | Scope Health",
			description:
				"Scope Health's medical services and specialties in Bogotá — certified treatments for international patients.",
		},
	},
	team: {
		es: {
			title: "Nuestro equipo | Scope Health",
			description:
				"Conoce a los especialistas certificados detrás de Scope Health en Bogotá.",
		},
		en: {
			title: "Our Team | Scope Health",
			description:
				"Meet the board-certified specialists behind Scope Health in Bogotá.",
		},
	},
	blog: {
		es: {
			title: "Blog | Scope Health",
			description:
				"Artículos y guías sobre turismo médico, tratamientos y salud en Scope Health.",
		},
		en: {
			title: "Blog | Scope Health",
			description:
				"Articles and guides on medical tourism, treatments and health from Scope Health.",
		},
	},
	about: {
		es: {
			title: "Sobre nosotros | Scope Health",
			description:
				"Quiénes somos: turismo médico de clase mundial en Bogotá para pacientes internacionales.",
		},
		en: {
			title: "About Us | Scope Health",
			description:
				"Who we are: world-class medical tourism in Bogotá for international patients.",
		},
	},
	contact: {
		es: {
			title: "Contacto | Scope Health",
			description:
				"Contáctanos para agendar tu consulta. Estamos en Bogotá y atendemos a pacientes internacionales.",
		},
		en: {
			title: "Contact | Scope Health",
			description:
				"Get in touch to book your consultation. Based in Bogotá, serving international patients.",
		},
	},
};
