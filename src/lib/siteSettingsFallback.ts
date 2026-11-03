import { withFallback } from "./fallback";
import type { Locale } from "./localizedRoutes";
import type { SiteSettings } from "./queries";

// Global footer/contact content used field by field wherever the "Configuración
// del sitio" document (per locale) is missing or leaves a field empty.
const SHARED = {
	// Real contact data from the client's flyers.
	footerAddress: "Cra. 7a #123-25, Piso 7, Edificio MPH 123, Bogotá",
	mapQuery: "Cra. 7a #123-25, Bogotá, Colombia",
	footerPhone: "+57 310 344 5645",
	footerEmail: "",
	// Empty until the client has a WhatsApp line: booking CTAs call the phone.
	whatsappNumber: "",
	// Empty until the client adds real URLs in "Configuración del sitio" → Redes
	// sociales; the header/menu render the social row only when this is non-empty.
	socialLinks: [],
};

export const SITE_SETTINGS_FALLBACK: Record<Locale, SiteSettings> = {
	es: {
		...SHARED,
		footerTagline:
			"Conectamos pacientes con especialistas médicos líderes en Bogotá.",
		footerColServicesLabel: "Servicios",
		footerColCompanyLabel: "Empresa",
		footerColContactLabel: "Contacto",
		footerHours: "Lun–Sáb · 8:00–18:00",
		footerCopyright: "© 2026 Scope Health. Todos los derechos reservados.",
		footerPrivacyLabel: "Privacidad",
		footerTermsLabel: "Términos",
		footerCookiesLabel: "Cookies",
	},
	en: {
		...SHARED,
		footerTagline:
			"We connect patients with leading medical specialists in Bogotá.",
		footerColServicesLabel: "Services",
		footerColCompanyLabel: "Company",
		footerColContactLabel: "Contact",
		footerHours: "Mon–Sat · 8:00–18:00",
		footerCopyright: "© 2026 Scope Health. All rights reserved.",
		footerPrivacyLabel: "Privacy",
		footerTermsLabel: "Terms",
		footerCookiesLabel: "Cookies",
	},
};

/** Sanity values win; empty ones (null, "", []) fall back per field. */
export function withSettingsFallback(
	data: Partial<SiteSettings> | null | undefined,
	locale: Locale,
): SiteSettings {
	return withFallback(data, SITE_SETTINGS_FALLBACK[locale]);
}
