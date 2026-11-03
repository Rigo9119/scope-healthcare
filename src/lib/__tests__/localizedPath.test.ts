import { describe, expect, it } from "vitest";
import { localizedPath } from "../localizedRoutes";

describe("localizedPath", () => {
	it("maps the home page", () => {
		expect(localizedPath("/es", "en")).toBe("/en/");
		expect(localizedPath("/en/", "es")).toBe("/es/");
	});

	it("translates localized section slugs", () => {
		expect(localizedPath("/es/contacto", "en")).toBe("/en/contact/");
		expect(localizedPath("/en/our-team", "es")).toBe("/es/nuestro-equipo/");
		expect(localizedPath("/es/blog", "en")).toBe("/en/blog/");
	});

	it("keeps pillar slugs, which are shared across locales", () => {
		expect(localizedPath("/es/scope-clinic", "en")).toBe("/en/scope-clinic/");
	});

	it("translates pillar item segments", () => {
		expect(localizedPath("/es/scope-clinic/gastroenterologia", "en")).toBe(
			"/en/scope-clinic/gastroenterology/",
		);
		expect(localizedPath("/en/scope-ageless/healthy-weight", "es")).toBe(
			"/es/scope-ageless/peso-saludable/",
		);
		// A wrong-locale segment still maps to the target locale.
		expect(localizedPath("/en/scope-clinic/urologia", "en")).toBe(
			"/en/scope-clinic/urology/",
		);
	});
});
