import { describe, expect, it } from "vitest";
import { DEFAULT_OG_IMAGE, SITE_URL, seoHead } from "../seo";

const BASE = {
	title: "Test Title",
	description: "Test description",
	locale: "es" as const,
	path: "",
};

describe("seoHead — meta tags", () => {
	it("includes title and description", () => {
		const { meta } = seoHead(BASE);
		expect(meta).toContainEqual({ title: "Test Title" });
		expect(meta).toContainEqual({
			name: "description",
			content: "Test description",
		});
	});

	it("populates og:title and og:description", () => {
		const { meta } = seoHead(BASE);
		expect(meta).toContainEqual({
			property: "og:title",
			content: "Test Title",
		});
		expect(meta).toContainEqual({
			property: "og:description",
			content: "Test description",
		});
	});

	it("sets og:locale to es_CO for Spanish", () => {
		const { meta } = seoHead({ ...BASE, locale: "es" });
		expect(meta).toContainEqual({ property: "og:locale", content: "es_CO" });
	});

	it("sets og:locale to en_US for English", () => {
		const { meta } = seoHead({ ...BASE, locale: "en" });
		expect(meta).toContainEqual({ property: "og:locale", content: "en_US" });
	});

	it("sets og:url to the full canonical URL", () => {
		const { meta } = seoHead({
			...BASE,
			locale: "es",
			path: "/nuestros-servicios",
		});
		expect(meta).toContainEqual({
			property: "og:url",
			content: `${SITE_URL}/es/nuestros-servicios`,
		});
	});

	it("uses an absolute image URL as-is", () => {
		const { meta } = seoHead({
			...BASE,
			image: "https://cdn.example.com/photo.jpg",
		});
		expect(meta).toContainEqual({
			property: "og:image",
			content: "https://cdn.example.com/photo.jpg",
		});
	});

	it("prepends SITE_URL to a relative image path", () => {
		const { meta } = seoHead({ ...BASE, image: "/my-image.png" });
		expect(meta).toContainEqual({
			property: "og:image",
			content: `${SITE_URL}/my-image.png`,
		});
	});

	it("falls back to the default image when none is provided", () => {
		const { meta } = seoHead(BASE);
		expect(meta).toContainEqual({
			property: "og:image",
			content: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
		});
	});

	it("populates twitter:title, twitter:description, twitter:image", () => {
		const { meta } = seoHead(BASE);
		expect(meta).toContainEqual({
			name: "twitter:title",
			content: "Test Title",
		});
		expect(meta).toContainEqual({
			name: "twitter:description",
			content: "Test description",
		});
	});
});

describe("seoHead — link tags", () => {
	it("generates a canonical link for the current locale and path", () => {
		const { links } = seoHead({ ...BASE, locale: "en", path: "/about-us" });
		expect(links).toContainEqual({
			rel: "canonical",
			href: `${SITE_URL}/en/about-us`,
		});
	});

	it("generates es, en, and x-default hreflang alternates", () => {
		const { links } = seoHead({ ...BASE, path: "/blog" });
		expect(links).toContainEqual({
			rel: "alternate",
			hrefLang: "es",
			href: `${SITE_URL}/es/blog`,
		});
		expect(links).toContainEqual({
			rel: "alternate",
			hrefLang: "en",
			href: `${SITE_URL}/en/blog`,
		});
		expect(links).toContainEqual({
			rel: "alternate",
			hrefLang: "x-default",
			href: `${SITE_URL}/es/blog`,
		});
	});

	it("defaults x-default to the Spanish URL", () => {
		const { links } = seoHead({ ...BASE, locale: "en", path: "/contact" });
		const xDefault = links.find((l) => l.hrefLang === "x-default");
		expect(xDefault?.href).toBe(`${SITE_URL}/es/contact`);
	});
});
