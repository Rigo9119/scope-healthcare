import { describe, expect, it } from "vitest";
import { itemContent, PILLAR_CONTENT } from "../pillarContent";
import { canonicalPillar, PILLARS, uniqueItems } from "../pillars";
import { TEAM_SEED, TEAM_SERVICES } from "../team";

describe("pillar content", () => {
	it("has es + en content for every registry item", () => {
		for (const pillar of PILLARS) {
			for (const item of pillar.items) {
				expect(PILLAR_CONTENT.es[item.slug]?.summary).toBeTruthy();
				expect(PILLAR_CONTENT.en[item.slug]?.summary).toBeTruthy();
			}
		}
	});

	it("lists each item once, under its canonical pillar", () => {
		const slugs = uniqueItems().map(({ item }) => item.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		expect(canonicalPillar("estetica-capilar")?.key).toBe("clinic");
	});

	it("prefers Sanity content and falls back per item", () => {
		const remote = { urologia: { summary: "remote" } };
		expect(itemContent("urologia", "es", remote).summary).toBe("remote");
		expect(itemContent("nutricion", "es", remote)).toBe(
			PILLAR_CONTENT.es.nutricion,
		);
		expect(itemContent("nutricion", "en", null)).toBe(
			PILLAR_CONTENT.en.nutricion,
		);
	});

	it("only assigns team members to services that have a page", () => {
		const slugs = new Set(uniqueItems().map(({ item }) => item.slug));
		for (const service of TEAM_SERVICES) expect(slugs.has(service)).toBe(true);
		for (const m of TEAM_SEED) expect(TEAM_SERVICES).toContain(m.service);
	});
});
