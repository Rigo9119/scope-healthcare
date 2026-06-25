import type { SiteSettings } from "./queries";

// Inline global footer/contact content used when the Sanity fetch fails or
// returns null. Mirrors the "Configuración del sitio" singleton.
export const SITE_SETTINGS_FALLBACK: SiteSettings = {
	footerTagline:
		"Conectamos pacientes con los mejores especialistas médicos internacionales.",
	footerColServicesLabel: "Servicios",
	footerServices: [
		{ label: "Odontología" },
		{ label: "Estética" },
		{ label: "Ortopedia" },
		{ label: "Oftalmología" },
	],
	footerColCompanyLabel: "Empresa",
	footerCompany: [
		{ label: "Nosotros" },
		{ label: "Proceso" },
		{ label: "Especialistas" },
		{ label: "Blog" },
	],
	footerColContactLabel: "Contacto",
	footerAddress: "Calle 100 #19-61, Bogotá",
	footerPhone: "+57 (1) 000 0000",
	footerEmail: "hola@scopehealth.co",
	footerHours: "Lun–Sáb · 8:00–18:00",
	footerCopyright: "© 2026 Scope Health. Todos los derechos reservados.",
	footerPrivacyLabel: "Privacidad",
	footerTermsLabel: "Términos",
	footerCookiesLabel: "Cookies",
};
