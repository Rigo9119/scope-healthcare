import { describe, expect, it } from "vitest";
import { homePageQueryOptions, siteSettingsQueryOptions } from "../queries";

describe("homePageQueryOptions", () => {
	it("produces a locale-scoped query key", () => {
		expect(homePageQueryOptions("es").queryKey).toEqual(["homePage", "es"]);
		expect(homePageQueryOptions("en").queryKey).toEqual(["homePage", "en"]);
	});

	it("different locales produce different query keys", () => {
		expect(homePageQueryOptions("es").queryKey).not.toEqual(
			homePageQueryOptions("en").queryKey,
		);
	});

	it("has a staleTime of 5 minutes", () => {
		expect(homePageQueryOptions("es").staleTime).toBe(1000 * 60 * 5);
	});

	it("does not retry on error", () => {
		expect(homePageQueryOptions("es").retry).toBe(false);
	});
});

describe("siteSettingsQueryOptions", () => {
	it("produces a locale-scoped query key", () => {
		expect(siteSettingsQueryOptions("es").queryKey).toEqual([
			"siteSettings",
			"es",
		]);
		expect(siteSettingsQueryOptions("en").queryKey).toEqual([
			"siteSettings",
			"en",
		]);
	});

	it("different locales produce different query keys", () => {
		expect(siteSettingsQueryOptions("es").queryKey).not.toEqual(
			siteSettingsQueryOptions("en").queryKey,
		);
	});

	it("has a staleTime of 5 minutes", () => {
		expect(siteSettingsQueryOptions("es").staleTime).toBe(1000 * 60 * 5);
	});

	it("does not retry on error", () => {
		expect(siteSettingsQueryOptions("es").retry).toBe(false);
	});
});
