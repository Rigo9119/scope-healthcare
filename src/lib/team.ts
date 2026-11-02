// ─── Medical team ──────────────────────────────────────────────────────────────
// Roster from the client's content doc, grouped by service. Lives in Sanity as
// `teamMember` documents; this is the fallback AND the seed for them
// (`scripts/seed-sanity.ts`). `service` is a pillar item slug, so group headings
// reuse the item titles from `src/lib/pillars.ts`.

import type { Locale } from "./localizedRoutes";

export interface TeamMember {
	name: string;
	service: TeamService;
	role: string;
	credentials?: string[];
	photo?: string;
}

/** Order the services appear on the team page (as in the client's doc). */
export const TEAM_SERVICES = [
	"reumatologia",
	"gastroenterologia",
	"medicina-fisica-deporte",
	"urologia",
	"estetica-capilar",
] as const;

export type TeamService = (typeof TEAM_SERVICES)[number];

type Localized<T> = Record<Locale, T>;

interface TeamSeed {
	name: string;
	service: TeamService;
	role: Localized<string>;
	credentials?: Localized<string[]>;
}

const INTERNIST_RHEUM_F = {
	es: "Médica internista, reumatóloga",
	en: "Internist, rheumatologist",
};
const INTERNIST_GASTRO = {
	es: "Médico internista, gastroenterólogo",
	en: "Internist, gastroenterologist",
};
const INTERNIST_GASTRO_ENDO = {
	es: "Médico internista, gastroenterólogo y endoscopista digestivo",
	en: "Internist, gastroenterologist and digestive endoscopist",
};

export const TEAM_SEED: TeamSeed[] = [
	{
		name: "Dra. Sandra Liliana Pulido Daza",
		service: "reumatologia",
		role: INTERNIST_RHEUM_F,
	},
	{
		name: "Dra. María Isabel Narváez Reyes",
		service: "reumatologia",
		role: INTERNIST_RHEUM_F,
	},
	{
		name: "Dr. Jairo Hernán Cajamarca Barón",
		service: "reumatologia",
		role: {
			es: "Médico internista, reumatólogo",
			en: "Internist, rheumatologist",
		},
	},
	{
		name: "Dr. Andrés Mauricio Murillo",
		service: "gastroenterologia",
		role: INTERNIST_GASTRO_ENDO,
	},
	{
		name: "Dr. Javier Alfredo Pérez Martínez",
		service: "gastroenterologia",
		role: INTERNIST_GASTRO,
	},
	{
		name: "Dr. Alberto Ramón Torres",
		service: "gastroenterologia",
		role: INTERNIST_GASTRO_ENDO,
	},
	{
		name: "Dr. Andy Dieter Schreiber",
		service: "gastroenterologia",
		role: INTERNIST_GASTRO,
	},
	{
		name: "Dr. Jesús Antonio Rodríguez",
		service: "gastroenterologia",
		role: {
			es: "Médico cirujano general, cirujano gastrointestinal y endoscopista digestivo",
			en: "General surgeon, gastrointestinal surgeon and digestive endoscopist",
		},
	},
	{
		name: "Dr. Orlando Javier Pereira Navarro",
		service: "medicina-fisica-deporte",
		role: {
			es: "Médico general, deportólogo",
			en: "Physician, sports medicine specialist",
		},
	},
	{
		name: "Dra. Lisset Fernanda Arroyo Malaver",
		service: "urologia",
		role: { es: "Médica cirujana, uróloga", en: "Surgeon, urologist" },
	},
	{
		name: "Dra. Danixa Catalina Murcia Monroy",
		service: "estetica-capilar",
		role: {
			es: "Médica general, medicina estética, antienvejecimiento y longevidad",
			en: "Physician, aesthetic, anti-aging and longevity medicine",
		},
		credentials: {
			es: ["Máster en Tricología y Microinjerto Capilar"],
			en: ["Master's in Trichology and Hair Micrografting"],
		},
	},
	{
		name: "Dra. Zaira Alejandra Peña Mejía",
		service: "estetica-capilar",
		role: {
			es: "Médica cirujana, medicina estética, antienvejecimiento y longevidad",
			en: "Surgeon, aesthetic, anti-aging and longevity medicine",
		},
		credentials: {
			es: [
				"Armonización orofacial",
				"Máster de Formación Permanente en Medicina Estética",
				"Máster Rino-Lips",
			],
			en: [
				"Orofacial harmonization",
				"Master's in Aesthetic Medicine (continuing education)",
				"Master's in Rhino-Lips",
			],
		},
	},
	{
		name: "Dra. María Alejandra",
		service: "estetica-capilar",
		role: {
			es: "Médica general, medicina estética, antienvejecimiento y longevidad",
			en: "Physician, aesthetic, anti-aging and longevity medicine",
		},
	},
];

export function teamFallback(locale: Locale): TeamMember[] {
	return TEAM_SEED.map(({ role, credentials, ...rest }) => ({
		...rest,
		role: role[locale],
		credentials: credentials?.[locale],
	}));
}
