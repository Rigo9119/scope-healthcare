// ─── Client-side search index ──────────────────────────────────────────────────
// The site is a static SPA, so search runs entirely in the browser over an index
// built from the same registries that drive the routes: the pillars + their items
// (src/lib/pillars.ts) and the localized sections (src/lib/localizedRoutes.ts).
// Results carry the route pattern + params so navigation stays type-safe.

import {
	type Locale,
	SECTION_SEO,
	SECTIONS,
	type SectionKey,
} from "./localizedRoutes";
import { PILLARS } from "./pillars";

export type SearchEntry =
	| { kind: "home"; title: string; description: string; group: string }
	| {
			kind: "section";
			slug: string;
			title: string;
			description: string;
			group: string;
	  }
	| {
			kind: "item";
			section: string;
			item: string;
			title: string;
			description: string;
			group: string;
	  };

const GROUP: Record<Locale, { pillar: string; page: string; home: string }> = {
	es: { pillar: "Pilares", page: "Páginas", home: "Inicio" },
	en: { pillar: "Pillars", page: "Pages", home: "Home" },
};

const SEARCHABLE_SECTIONS: SectionKey[] = [
	"services",
	"team",
	"blog",
	"about",
	"contact",
	"privacy",
	"terms",
	"cookies",
];

/** SEO titles carry a " | Scope Health" suffix; drop it for the search label. */
function stripBrand(title: string): string {
	return title.replace(/\s*\|\s*Scope Health\s*$/i, "");
}

export function buildSearchIndex(locale: Locale): SearchEntry[] {
	const g = GROUP[locale];
	const entries: SearchEntry[] = [
		{
			kind: "home",
			title: g.home,
			description:
				locale === "es"
					? "Página principal de Scope Health"
					: "Scope Health home page",
			group: g.home,
		},
	];

	for (const pillar of PILLARS) {
		entries.push({
			kind: "section",
			slug: pillar.slug,
			title: pillar.navLabel,
			description: pillar.tagline[locale],
			group: g.pillar,
		});
		for (const item of pillar.items) {
			entries.push({
				kind: "item",
				section: pillar.slug,
				item: item.slug,
				title: item.title[locale],
				description: item.body[locale],
				group: pillar.title[locale],
			});
		}
	}

	for (const key of SEARCHABLE_SECTIONS) {
		const seo = SECTION_SEO[key][locale];
		entries.push({
			kind: "section",
			slug: SECTIONS[key][locale],
			title: stripBrand(seo.title),
			description: seo.description,
			group: g.page,
		});
	}

	return entries;
}

/** Lowercase + strip accents so "urologia" matches "Urología". */
function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");
}

export function searchEntries(
	index: SearchEntry[],
	query: string,
): SearchEntry[] {
	const q = normalize(query.trim());
	if (!q) return [];
	const tokens = q.split(/\s+/);
	return index
		.filter((e) => {
			const hay = normalize(`${e.title} ${e.description} ${e.group}`);
			return tokens.every((t) => hay.includes(t));
		})
		.slice(0, 12);
}
