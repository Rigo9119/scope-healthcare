import { sanityClient } from "./sanity";

export interface HomePageData {
	hero: {
		eyebrow: string;
		titleStart: string;
		titleAccent: string;
		subtitle: string;
		ctaPrimaryLabel: string;
		ctaSecondaryLabel: string;
	};
	stats: Array<{ value: string; label: string; icon: string }>;
	specialtiesEyebrow: string;
	specialtiesTitle: string;
	specialtiesSubtitle: string;
	specialtiesLinkLabel: string;
	specialties: Array<{ icon: string; title: string; body: string }>;
	processEyebrow: string;
	processTitle: string;
	journey: Array<{ icon: string; title: string; body: string }>;
	whyUsEyebrow: string;
	whyUsTitle: string;
	whyUsSubtitle: string;
	whyUsBadgeText: string;
	reasons: Array<{ icon: string; title: string; body: string }>;
	testimonialsEyebrow: string;
	testimonialsTitle: string;
	testimonials: Array<{
		name: string;
		detail: string;
		rating: number;
		text: string;
	}>;
	ctaEyebrow: string;
	ctaTitle: string;
	ctaSubtitle: string;
	ctaPrimaryLabel: string;
	ctaPhone: string;
}

const HOME_PAGE_QUERY = `
  *[_id == "homePage-" + $locale][0] {
    hero,
    stats,
    specialtiesEyebrow, specialtiesTitle, specialtiesSubtitle, specialtiesLinkLabel,
    specialties,
    processEyebrow, processTitle,
    journey,
    whyUsEyebrow, whyUsTitle, whyUsSubtitle, whyUsBadgeText,
    reasons,
    testimonialsEyebrow, testimonialsTitle,
    testimonials,
    ctaEyebrow, ctaTitle, ctaSubtitle, ctaPrimaryLabel, ctaPhone
  }
`;

export function fetchHomePage(locale: string): Promise<HomePageData | null> {
	return sanityClient.fetch(HOME_PAGE_QUERY, { locale });
}

// Global site chrome (footer + contact), edited once in the "Configuración del
// sitio" singleton rather than per page. Rendered from the root layout.
export interface SiteSettings {
	footerTagline: string;
	footerColServicesLabel: string;
	footerServices: Array<{ label: string }>;
	footerColCompanyLabel: string;
	footerCompany: Array<{ label: string }>;
	footerColContactLabel: string;
	footerAddress: string;
	footerPhone: string;
	footerEmail: string;
	footerHours: string;
	footerCopyright: string;
	footerPrivacyLabel: string;
	footerTermsLabel: string;
	footerCookiesLabel: string;
}

const SITE_SETTINGS_QUERY = `
  *[_id == "siteSettings-" + $locale][0] {
    footerTagline,
    footerColServicesLabel, footerServices[]{ label },
    footerColCompanyLabel, footerCompany[]{ label },
    footerColContactLabel,
    footerAddress, footerPhone, footerEmail, footerHours,
    footerCopyright, footerPrivacyLabel, footerTermsLabel, footerCookiesLabel
  }
`;

export function fetchSiteSettings(
	locale: string,
): Promise<SiteSettings | null> {
	return sanityClient.fetch(SITE_SETTINGS_QUERY, { locale });
}
