import { describe, expect, it } from "vitest";
import { withFallback } from "../fallback";
import { HOME_FALLBACK } from "../homeFallback";

describe("withFallback", () => {
	it("keeps fallback values for empty fields and merges nested objects", () => {
		const page = withFallback(
			{ hero: { titleStart: "Hola" }, ctaTitle: "", reasons: [] } as never,
			HOME_FALLBACK.es,
		);
		expect(page.hero.titleStart).toBe("Hola");
		expect(page.hero.eyebrow).toBe(HOME_FALLBACK.es.hero.eyebrow);
		expect(page.ctaTitle).toBe(HOME_FALLBACK.es.ctaTitle);
		expect(page.reasons).toEqual(HOME_FALLBACK.es.reasons);
	});

	it("returns the fallback for a missing document", () => {
		expect(withFallback(null, HOME_FALLBACK.en)).toEqual(HOME_FALLBACK.en);
	});
});
