// ─── Pillar registry ───────────────────────────────────────────────────────────
// Single source of truth for the three brand pillars proposed by the client
// (SCOPE CLINIC · SCOPE AGELESS · LIVE BY SCOPE) and their sub-items. Powers the
// navbar, the pillar index pages (grid of items), the per-item detail pages, the
// per-pillar SEO, the sitemap, and the home-page pillar cards.
//
// Content here is static placeholder ("Imagen + descripción" in the client's
// wireframe) — the client refines the real copy later (or we move it to Sanity).
//
// Pillar and item slugs are brand/Spanish-based and IDENTICAL across locales, so
// no cross-locale slug redirect is needed (unlike the legacy `SECTIONS`).

import type { Locale } from "./localizedRoutes";

export type PillarKey = "clinic" | "ageless" | "live";

export interface PillarItem {
	/** URL slug, same in both locales. Also the Sanity id stem (`pillarItem-{slug}-{locale}`). */
	slug: string;
	/** Icon name resolved in `ICON_MAP` (src/components/Icon.tsx). */
	icon: string;
	title: Record<Locale, string>;
}

export interface Pillar {
	key: PillarKey;
	/** URL slug, same in both locales (brand name). */
	slug: string;
	/** Brand label shown in the navbar (not translated). */
	navLabel: string;
	title: Record<Locale, string>;
	eyebrow: Record<Locale, string>;
	/** Short lede shown under the title on the index page + home card. */
	tagline: Record<Locale, string>;
	items: PillarItem[];
}

// Listed under both Clinic and Ageless (client request); one content document,
// canonical URL under the first pillar that lists it (see `canonicalPillar`).
const AESTHETICS: PillarItem = {
	slug: "estetica-capilar",
	icon: "Sparkles",
	title: {
		es: "Medicina Estética y Capilar",
		en: "Aesthetic & Hair Medicine",
	},
};

export const PILLARS: Pillar[] = [
	{
		key: "clinic",
		slug: "scope-clinic",
		navLabel: "Scope Clinic",
		title: { es: "Scope Clinic", en: "Scope Clinic" },
		eyebrow: {
			es: "Atención médica especializada",
			en: "Specialized medical care",
		},
		tagline: {
			es: "Atención médica especializada con calidez humana y rigor clínico, donde cada diagnóstico y cada tratamiento están pensados para tu salud a largo plazo.",
			en: "Specialized medical care with human warmth and clinical rigor, where every diagnosis and treatment is designed for your long-term health.",
		},
		items: [
			{
				slug: "gastroenterologia",
				icon: "Activity",
				title: { es: "Gastroenterología", en: "Gastroenterology" },
			},
			{
				slug: "urologia",
				icon: "Droplets",
				title: { es: "Urología", en: "Urology" },
			},
			{
				slug: "medicina-fisica-deporte",
				icon: "Dumbbell",
				title: {
					es: "Medicina Física y del Deporte",
					en: "Physical & Sports Medicine",
				},
			},
			{
				slug: "reumatologia",
				icon: "Bone",
				title: { es: "Reumatología", en: "Rheumatology" },
			},
			AESTHETICS,
			{
				slug: "psicologia",
				icon: "Brain",
				title: { es: "Psicología", en: "Psychology" },
			},
			{
				slug: "nutricion",
				icon: "Salad",
				title: { es: "Nutrición", en: "Nutrition" },
			},
		],
	},
	{
		key: "ageless",
		slug: "scope-ageless",
		navLabel: "Scope Ageless",
		title: { es: "Scope Ageless", en: "Scope Ageless" },
		eyebrow: {
			es: "Longevidad · Bienestar · Estética",
			en: "Longevity · Wellbeing · Aesthetics",
		},
		tagline: {
			es: "Te acompañamos en la construcción de una vida con mayor bienestar, vitalidad y calidad de vida, a través de estrategias personalizadas de prevención, cuidado y envejecimiento saludable.",
			en: "We support you in building a life with more wellbeing, vitality and quality of life, through personalized strategies for prevention, care and healthy aging.",
		},
		items: [
			{
				slug: "peso-saludable",
				icon: "Scale",
				title: { es: "Peso Saludable", en: "Healthy Weight" },
			},
			{
				slug: "bienestar-longevidad",
				icon: "Leaf",
				title: { es: "Bienestar y Longevidad", en: "Wellness & Longevity" },
			},
			AESTHETICS,
			{
				slug: "enfoque-deportivo",
				icon: "Activity",
				title: { es: "Enfoque Deportivo", en: "Sports Focus" },
			},
			{
				slug: "prevencion-ejecutiva",
				icon: "Briefcase",
				title: { es: "Prevención Ejecutiva", en: "Executive Prevention" },
			},
		],
	},
	{
		key: "live",
		slug: "live-by-scope",
		navLabel: "Live by Scope",
		title: { es: "Live by Scope", en: "Live by Scope" },
		eyebrow: {
			es: "Bienestar integrado a tu vida",
			en: "Wellbeing built into your life",
		},
		tagline: {
			es: "Servicios y experiencias que integran la medicina de Scope a tu estilo de vida, con acceso flexible y acompañamiento continuo.",
			en: "Services and experiences that weave Scope's medicine into your lifestyle, with flexible access and continuous support.",
		},
		items: [
			{
				slug: "living-medical",
				icon: "HeartPulse",
				title: { es: "Living Medical", en: "Living Medical" },
			},
			{
				slug: "telemedicina",
				icon: "Video",
				title: { es: "Telemedicina", en: "Telemedicine" },
			},
			{
				slug: "financiamiento",
				icon: "CreditCard",
				title: { es: "Financiamiento", en: "Financing" },
			},
		],
	},
];

/** Order the pillars appear in the navbar and on the home page. */
export const PILLAR_ORDER: PillarKey[] = ["clinic", "ageless", "live"];

export function pillarByKey(key: PillarKey): Pillar {
	// biome-ignore lint/style/noNonNullAssertion: key is a closed union always present in PILLARS.
	return PILLARS.find((p) => p.key === key)!;
}

export function pillarBySlug(slug: string): Pillar | null {
	return PILLARS.find((p) => p.slug === slug) ?? null;
}

export function itemBySlug(pillar: Pillar, slug: string): PillarItem | null {
	return pillar.items.find((i) => i.slug === slug) ?? null;
}

/** First pillar (in nav order) listing the item: owns its canonical URL. */
export function canonicalPillar(itemSlug: string): Pillar | null {
	return (
		PILLAR_ORDER.map(pillarByKey).find((p) => itemBySlug(p, itemSlug)) ?? null
	);
}

/** Every item once, paired with its canonical pillar (sitemap, Studio seed). */
export function uniqueItems(): Array<{ pillar: Pillar; item: PillarItem }> {
	const seen = new Set<string>();
	const out: Array<{ pillar: Pillar; item: PillarItem }> = [];
	for (const pillar of PILLAR_ORDER.map(pillarByKey)) {
		for (const item of pillar.items) {
			if (seen.has(item.slug)) continue;
			seen.add(item.slug);
			out.push({ pillar, item });
		}
	}
	return out;
}

// ─── Per-pillar SEO copy (defaults; can later come from Sanity) ─────────────────
export const PILLAR_SEO: Record<
	PillarKey,
	Record<Locale, { title: string; description: string }>
> = {
	clinic: {
		es: {
			title: "Scope Clinic | Atención médica especializada | Scope Health",
			description:
				"Especialidades médicas de Scope Clinic: gastroenterología, urología, medicina física y del deporte, reumatología, medicina estética y capilar, psicología y nutrición.",
		},
		en: {
			title: "Scope Clinic | Specialized Medical Care | Scope Health",
			description:
				"Scope Clinic medical specialties: gastroenterology, urology, physical & sports medicine, rheumatology, aesthetic & hair medicine, psychology and nutrition.",
		},
	},
	ageless: {
		es: {
			title: "Scope Ageless | Medicina estética y longevidad | Scope Health",
			description:
				"Programas de Scope Ageless: peso saludable, bienestar y longevidad, medicina estética y capilar, enfoque deportivo y prevención ejecutiva.",
		},
		en: {
			title: "Scope Ageless | Aesthetic & Longevity Medicine | Scope Health",
			description:
				"Scope Ageless programs: healthy weight, wellness & longevity, aesthetic & hair medicine, sports focus and executive prevention.",
		},
	},
	live: {
		es: {
			title: "Live by Scope | Bienestar integrado a tu vida | Scope Health",
			description:
				"Live by Scope: Living Medical, telemedicina y financiamiento para integrar la medicina de Scope a tu estilo de vida.",
		},
		en: {
			title: "Live by Scope | Wellbeing built into your life | Scope Health",
			description:
				"Live by Scope: Living Medical, telemedicine and financing to weave Scope's medicine into your lifestyle.",
		},
	},
};

// ─── UI micro-copy (per-locale, kept here to avoid bloating Paraglide) ──────────
export const PILLAR_UI: Record<
	Locale,
	{
		readMore: string;
		backTo: (name: string) => string;
		programTitle: string;
		programBody: string;
		programsEyebrow: string;
		programsTitle: string;
		programIncludes: string;
		stepsEyebrow: string;
		stepsTitle: string;
		bookTitle: string;
		bookSubtitle: string;
		bookCta: string;
	}
> = {
	es: {
		readMore: "Leer más",
		backTo: (name) => `Volver a ${name}`,
		programTitle: "Experiencia exclusiva",
		programBody:
			"Cada programa se diseña a la medida de tus objetivos, con un equipo que te acompaña de principio a fin.",
		programsEyebrow: "Programas",
		programsTitle: "Elige el programa para ti",
		programIncludes: "Incluye",
		stepsEyebrow: "Paso a paso",
		stepsTitle: "Qué incluye",
		bookTitle: "¿Listo para empezar?",
		bookSubtitle:
			"Escríbenos por WhatsApp y un coordinador te orienta sin costo.",
		bookCta: "Agendar consulta",
	},
	en: {
		readMore: "Read more",
		backTo: (name) => `Back to ${name}`,
		programTitle: "Exclusive experience",
		programBody:
			"Each program is tailored to your goals, with a team that supports you from start to finish.",
		programsEyebrow: "Programs",
		programsTitle: "Choose the program for you",
		programIncludes: "Includes",
		stepsEyebrow: "Step by step",
		stepsTitle: "What's included",
		bookTitle: "Ready to get started?",
		bookSubtitle:
			"Message us on WhatsApp and a coordinator guides you at no cost.",
		bookCta: "Book a consultation",
	},
};
