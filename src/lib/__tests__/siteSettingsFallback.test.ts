import { describe, expect, it } from "vitest";
import {
	SITE_SETTINGS_FALLBACK,
	withSettingsFallback,
} from "../siteSettingsFallback";

describe("withSettingsFallback", () => {
	it("uses the locale fallback when Sanity has no document", () => {
		expect(withSettingsFallback(null, "en")).toEqual(SITE_SETTINGS_FALLBACK.en);
	});

	it("keeps Sanity values and fills empty fields per field", () => {
		const s = withSettingsFallback(
			{
				footerPhone: "+57 1",
				footerTagline: null as unknown as string,
				footerPrivacyLabel: "",
				socialLinks: [],
			},
			"es",
		);
		expect(s.footerPhone).toBe("+57 1");
		expect(s.footerTagline).toBe(SITE_SETTINGS_FALLBACK.es.footerTagline);
		expect(s.footerPrivacyLabel).toBe("Privacidad");
		expect(s.socialLinks).toEqual([]);
	});
});
