import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLang } from "#/i18n.js";
import { fetchSiteSettings, type SiteSettings } from "#/lib/queries.js";
import { SITE_SETTINGS_FALLBACK } from "#/lib/siteSettingsFallback.js";

// Global footer + contact content, fetched once and shared by the Navbar's
// TopBar and the Footer so the same Sanity document isn't fetched twice.
const SiteSettingsContext = createContext<SiteSettings>(SITE_SETTINGS_FALLBACK);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
	const { locale } = useLang();
	const [data, setData] = useState<SiteSettings>(SITE_SETTINGS_FALLBACK);

	useEffect(() => {
		let active = true;
		fetchSiteSettings(locale)
			.then((d) => {
				if (active && d) setData(d);
			})
			.catch(() => {});
		return () => {
			active = false;
		};
	}, [locale]);

	return (
		<SiteSettingsContext.Provider value={data}>
			{children}
		</SiteSettingsContext.Provider>
	);
}

export function useSiteSettings(): SiteSettings {
	return useContext(SiteSettingsContext);
}
