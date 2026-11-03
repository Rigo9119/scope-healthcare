import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LOCALES, SECTIONS, type SectionKey } from "../localizedRoutes";
import { PILLARS, uniqueItems } from "../pillars";

// scripts/prerender.mjs and public/sitemap.xml can't import the TS registries,
// so they're hand-maintained lists: this keeps them in sync.
const read = (p: string) => readFileSync(p, "utf8");
const RETIRED: SectionKey[] = ["services"];
const NOINDEX: SectionKey[] = ["blog"];

function sectionRoutes(skip: SectionKey[]) {
	return LOCALES.flatMap((l) =>
		(Object.keys(SECTIONS) as SectionKey[])
			.filter((k) => !skip.includes(k))
			.map((k) => `/${l}/${SECTIONS[k][l]}`),
	);
}

describe("route lists", () => {
	it("prerenders every page, including both paths of shared items", () => {
		const expected = [
			...LOCALES.map((l) => `/${l}`),
			...sectionRoutes(RETIRED),
			...LOCALES.flatMap((l) => PILLARS.map((p) => `/${l}/${p.slug}`)),
			...LOCALES.flatMap((l) =>
				PILLARS.flatMap((p) =>
					p.items.map((i) => `/${l}/${p.slug}/${i.path[l]}`),
				),
			),
		];
		const listed = [
			...read("scripts/prerender.mjs").matchAll(/^\t"(\/[^"]*)",$/gm),
		].map((m) => m[1]);
		expect([...listed].sort()).toEqual([...expected].sort());
	});

	it("lists canonical, indexable pages in the sitemap", () => {
		const expected = [
			...LOCALES.map((l) => `/${l}/`),
			...sectionRoutes([...RETIRED, ...NOINDEX]).map((r) => `${r}/`),
			...LOCALES.flatMap((l) => PILLARS.map((p) => `/${l}/${p.slug}/`)),
			...LOCALES.flatMap((l) =>
				uniqueItems().map(
					({ pillar, item }) => `/${l}/${pillar.slug}/${item.path[l]}/`,
				),
			),
		];
		const locs = [
			...read("public/sitemap.xml").matchAll(
				/<loc>[^<]*?(\/(?:es|en)\/[^<]*)<\/loc>/g,
			),
		].map((m) => m[1]);
		expect([...locs].sort()).toEqual([...expected].sort());
	});
});
