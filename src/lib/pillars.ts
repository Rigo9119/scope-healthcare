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
	/** URL slug, same in both locales. */
	slug: string;
	/** Icon name resolved in `ICON_MAP` (src/components/Icon.tsx). */
	icon: string;
	title: Record<Locale, string>;
	body: Record<Locale, string>;
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
				body: {
					es: "Diagnóstico y tratamiento integral del sistema digestivo con tecnología de última generación.",
					en: "Comprehensive diagnosis and treatment of the digestive system with state-of-the-art technology.",
				},
			},
			{
				slug: "urologia",
				icon: "Droplets",
				title: { es: "Urología", en: "Urology" },
				body: {
					es: "Cuidado especializado de la salud urinaria y reproductiva con un enfoque preventivo.",
					en: "Specialized care for urinary and reproductive health with a preventive focus.",
				},
			},
			{
				slug: "medicina-fisica-deporte",
				icon: "Dumbbell",
				title: {
					es: "Medicina Física y del Deporte",
					en: "Physical & Sports Medicine",
				},
				body: {
					es: "Recuperación funcional, rendimiento y prevención de lesiones para cada etapa de tu vida.",
					en: "Functional recovery, performance and injury prevention for every stage of your life.",
				},
			},
			{
				slug: "reumatologia",
				icon: "Bone",
				title: { es: "Reumatología", en: "Rheumatology" },
				body: {
					es: "Manejo integral de enfermedades articulares y autoinmunes para mejorar tu calidad de vida.",
					en: "Comprehensive management of joint and autoimmune conditions to improve your quality of life.",
				},
			},
			{
				slug: "nutricion",
				icon: "Salad",
				title: { es: "Nutrición", en: "Nutrition" },
				body: {
					es: "Planes de alimentación personalizados basados en evidencia para tu bienestar a largo plazo.",
					en: "Personalized, evidence-based nutrition plans for your long-term wellbeing.",
				},
			},
			{
				slug: "psicologia",
				icon: "Brain",
				title: { es: "Psicología", en: "Psychology" },
				body: {
					es: "Acompañamiento emocional y salud mental con especialistas dedicados a tu equilibrio.",
					en: "Emotional support and mental health with specialists dedicated to your balance.",
				},
			},
		],
	},
	{
		key: "ageless",
		slug: "scope-ageless",
		navLabel: "Scope Ageless",
		title: { es: "Scope Ageless", en: "Scope Ageless" },
		eyebrow: {
			es: "Medicina estética y antienvejecimiento",
			en: "Aesthetic & anti-aging medicine",
		},
		tagline: {
			es: "Medicina estética y antienvejecimiento respaldada por evidencia científica, para que te veas y te sientas como quieres, con seguridad y resultados naturales.",
			en: "Aesthetic and anti-aging medicine backed by scientific evidence, so you look and feel the way you want — safely and with natural results.",
		},
		items: [
			{
				slug: "bienestar-longevidad",
				icon: "Leaf",
				title: { es: "Bienestar y Longevidad", en: "Wellness & Longevity" },
				body: {
					es: "Programas de longevidad que optimizan tu energía, vitalidad y salud a lo largo del tiempo.",
					en: "Longevity programs that optimize your energy, vitality and health over time.",
				},
			},
			{
				slug: "peso-saludable",
				icon: "Scale",
				title: { es: "Peso Saludable", en: "Healthy Weight" },
				body: {
					es: "Control de peso médico y sostenible con acompañamiento nutricional y metabólico.",
					en: "Medical, sustainable weight management with nutritional and metabolic support.",
				},
			},
			{
				slug: "estetica-medica",
				icon: "Sparkles",
				title: { es: "Estética Médica", en: "Medical Aesthetics" },
				body: {
					es: "Procedimientos estéticos mínimamente invasivos con resultados naturales y seguros.",
					en: "Minimally invasive aesthetic procedures with natural, safe results.",
				},
			},
			{
				slug: "enfoque-deportivo",
				icon: "Activity",
				title: { es: "Enfoque Deportivo", en: "Sports Focus" },
				body: {
					es: "Optimización del rendimiento físico y recuperación con un enfoque de medicina deportiva.",
					en: "Physical performance optimization and recovery with a sports-medicine approach.",
				},
			},
			{
				slug: "prevencion-ejecutiva",
				icon: "Briefcase",
				title: { es: "Prevención Ejecutiva", en: "Executive Prevention" },
				body: {
					es: "Chequeos preventivos integrales diseñados para agendas exigentes y vidas de alto rendimiento.",
					en: "Comprehensive preventive check-ups designed for demanding schedules and high-performance lives.",
				},
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
				body: {
					es: "Un modelo de atención continua que cuida tu salud más allá de la consulta.",
					en: "A continuous-care model that looks after your health beyond the appointment.",
				},
			},
			{
				slug: "financiamiento",
				icon: "CreditCard",
				title: { es: "Financiamiento", en: "Financing" },
				body: {
					es: "Opciones de pago flexibles para que accedas a tu tratamiento sin barreras.",
					en: "Flexible payment options so you can access your treatment without barriers.",
				},
			},
			{
				slug: "telemedicina",
				icon: "Video",
				title: { es: "Telemedicina", en: "Telemedicine" },
				body: {
					es: "Consultas médicas a distancia con la misma calidad y cercanía, dondequiera que estés.",
					en: "Remote medical consultations with the same quality and closeness, wherever you are.",
				},
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

// ─── Per-pillar SEO copy (defaults; can later come from Sanity) ─────────────────
export const PILLAR_SEO: Record<
	PillarKey,
	Record<Locale, { title: string; description: string }>
> = {
	clinic: {
		es: {
			title: "Scope Clinic | Atención médica especializada | Scope Health",
			description:
				"Especialidades médicas de Scope Clinic: gastroenterología, urología, reumatología, nutrición, psicología y medicina física y del deporte.",
		},
		en: {
			title: "Scope Clinic | Specialized Medical Care | Scope Health",
			description:
				"Scope Clinic medical specialties: gastroenterology, urology, rheumatology, nutrition, psychology and physical & sports medicine.",
		},
	},
	ageless: {
		es: {
			title: "Scope Ageless | Medicina estética y longevidad | Scope Health",
			description:
				"Programas de Scope Ageless: bienestar y longevidad, peso saludable, estética médica, enfoque deportivo y prevención ejecutiva.",
		},
		en: {
			title: "Scope Ageless | Aesthetic & Longevity Medicine | Scope Health",
			description:
				"Scope Ageless programs: wellness & longevity, healthy weight, medical aesthetics, sports focus and executive prevention.",
		},
	},
	live: {
		es: {
			title: "Live by Scope | Bienestar integrado a tu vida | Scope Health",
			description:
				"Live by Scope: Living Medical, financiamiento y telemedicina para integrar la medicina de Scope a tu estilo de vida.",
		},
		en: {
			title: "Live by Scope | Wellbeing built into your life | Scope Health",
			description:
				"Live by Scope: Living Medical, financing and telemedicine to weave Scope's medicine into your lifestyle.",
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
		faqTitle: string;
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
		faqTitle: "Preguntas frecuentes",
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
		faqTitle: "Frequently asked questions",
		bookTitle: "Ready to get started?",
		bookSubtitle:
			"Message us on WhatsApp and a coordinator guides you at no cost.",
		bookCta: "Book a consultation",
	},
};
