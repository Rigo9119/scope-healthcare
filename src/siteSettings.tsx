import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import { useLang } from "#/i18n.js";
import { type SiteSettings, siteSettingsQueryOptions } from "#/lib/queries.js";
import { SITE_SETTINGS_FALLBACK } from "#/lib/siteSettingsFallback.js";

const SiteSettingsContext = createContext<SiteSettings>(SITE_SETTINGS_FALLBACK);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
	const { locale } = useLang();
	const { data } = useQuery({
		...siteSettingsQueryOptions(locale),
		placeholderData: SITE_SETTINGS_FALLBACK,
	});

	return (
		<SiteSettingsContext.Provider value={data ?? SITE_SETTINGS_FALLBACK}>
			{children}
		</SiteSettingsContext.Provider>
	);
}

export function useSiteSettings(): SiteSettings {
	return useContext(SiteSettingsContext);
}
