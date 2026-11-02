import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import { useLang } from "#/i18n.js";
import { type SiteSettings, siteSettingsQueryOptions } from "#/lib/queries.js";
import {
	SITE_SETTINGS_FALLBACK,
	withSettingsFallback,
} from "#/lib/siteSettingsFallback.js";

const SiteSettingsContext = createContext<SiteSettings>(
	SITE_SETTINGS_FALLBACK.es,
);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
	const { locale } = useLang();
	const { data } = useQuery(siteSettingsQueryOptions(locale));

	return (
		<SiteSettingsContext.Provider value={withSettingsFallback(data, locale)}>
			{children}
		</SiteSettingsContext.Provider>
	);
}

export function useSiteSettings(): SiteSettings {
	return useContext(SiteSettingsContext);
}
