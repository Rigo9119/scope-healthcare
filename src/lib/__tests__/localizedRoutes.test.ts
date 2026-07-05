import { describe, expect, it } from "vitest";
import {
	sectionFromAnySlug,
	sectionFromSlug,
	sectionPath,
	sectionSlug,
	toLocale,
} from "../localizedRoutes";

describe("toLocale", () => {
	it('maps "en" to "en"', () => {
		expect(toLocale("en")).toBe("en");
	});

	it('maps "es" to "es"', () => {
		expect(toLocale("es")).toBe("es");
	});

	it("maps any unknown string to the default locale es", () => {
		expect(toLocale("fr")).toBe("es");
		expect(toLocale("")).toBe("es");
		expect(toLocale("EN")).toBe("es");
	});
});

describe("sectionSlug", () => {
	it("returns the Spanish slug for each section", () => {
		expect(sectionSlug("services", "es")).toBe("nuestros-servicios");
		expect(sectionSlug("team", "es")).toBe("nuestro-equipo");
		expect(sectionSlug("blog", "es")).toBe("blog");
		expect(sectionSlug("about", "es")).toBe("sobre-nosotros");
		expect(sectionSlug("contact", "es")).toBe("contacto");
	});

	it("returns the English slug for each section", () => {
		expect(sectionSlug("services", "en")).toBe("our-services");
		expect(sectionSlug("team", "en")).toBe("our-team");
		expect(sectionSlug("blog", "en")).toBe("blog");
		expect(sectionSlug("about", "en")).toBe("about-us");
		expect(sectionSlug("contact", "en")).toBe("contact");
	});
});

describe("sectionPath", () => {
	it("prefixes the slug with the locale segment", () => {
		expect(sectionPath("services", "es")).toBe("/es/nuestros-servicios");
		expect(sectionPath("about", "en")).toBe("/en/about-us");
		expect(sectionPath("blog", "es")).toBe("/es/blog");
	});
});

describe("sectionFromSlug", () => {
	it("resolves a Spanish slug to its section key", () => {
		expect(sectionFromSlug("nuestros-servicios", "es")).toBe("services");
		expect(sectionFromSlug("nuestro-equipo", "es")).toBe("team");
		expect(sectionFromSlug("sobre-nosotros", "es")).toBe("about");
		expect(sectionFromSlug("contacto", "es")).toBe("contact");
	});

	it("resolves an English slug to its section key", () => {
		expect(sectionFromSlug("our-services", "en")).toBe("services");
		expect(sectionFromSlug("our-team", "en")).toBe("team");
		expect(sectionFromSlug("about-us", "en")).toBe("about");
		expect(sectionFromSlug("contact", "en")).toBe("contact");
	});

	it("resolves a shared slug (blog) in both locales", () => {
		expect(sectionFromSlug("blog", "es")).toBe("blog");
		expect(sectionFromSlug("blog", "en")).toBe("blog");
	});

	it("returns null for a slug that belongs to the other locale", () => {
		expect(sectionFromSlug("our-services", "es")).toBeNull();
		expect(sectionFromSlug("nuestros-servicios", "en")).toBeNull();
		expect(sectionFromSlug("about-us", "es")).toBeNull();
	});

	it("returns null for an unknown slug", () => {
		expect(sectionFromSlug("nonexistent", "es")).toBeNull();
		expect(sectionFromSlug("", "en")).toBeNull();
	});
});

describe("sectionFromAnySlug", () => {
	it("resolves a Spanish slug and identifies its locale", () => {
		expect(sectionFromAnySlug("nuestro-equipo")).toEqual({
			key: "team",
			locale: "es",
		});
		expect(sectionFromAnySlug("sobre-nosotros")).toEqual({
			key: "about",
			locale: "es",
		});
	});

	it("resolves an English slug and identifies its locale", () => {
		expect(sectionFromAnySlug("about-us")).toEqual({
			key: "about",
			locale: "en",
		});
		expect(sectionFromAnySlug("our-services")).toEqual({
			key: "services",
			locale: "en",
		});
	});

	it("resolves a shared slug (blog) to the first matching locale", () => {
		const result = sectionFromAnySlug("blog");
		expect(result?.key).toBe("blog");
	});

	it("returns null for an unknown slug", () => {
		expect(sectionFromAnySlug("nonexistent")).toBeNull();
		expect(sectionFromAnySlug("")).toBeNull();
	});
});
