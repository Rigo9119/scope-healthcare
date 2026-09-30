import { useLocation, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect } from "react";
import { localizedPath } from "#/lib/localizedRoutes.js";

type Locale = "es" | "en";
const LOCALES: Locale[] = ["es", "en"];

interface LangContextValue {
	locale: Locale;
	switchLocale: (locale: Locale) => void;
}

const LangContext = createContext<LangContextValue>({
	locale: "es",
	switchLocale: () => {},
});

function localeFromPath(pathname: string): Locale {
	const seg = pathname.split("/")[1];
	return (LOCALES as string[]).includes(seg) ? (seg as Locale) : "es";
}

// The URL is the source of truth for the active locale (e.g. /es, /en). Paraglide
// itself is synced in the `/$lang` route's beforeLoad; here we just mirror the URL
// into React context and navigate when the user switches languages.
export function LangProvider({ children }: { children: React.ReactNode }) {
	const { pathname, searchStr, hash } = useLocation();
	const navigate = useNavigate();
	const locale = localeFromPath(pathname);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	function switchLocale(next: Locale) {
		if (next === locale) return;
		// Stay on the same page in the other locale, keeping query and hash.
		navigate({
			href: `${localizedPath(pathname, next)}${searchStr}${hash ? `#${hash}` : ""}`,
		});
	}

	return (
		<LangContext.Provider value={{ locale, switchLocale }}>
			{children}
		</LangContext.Provider>
	);
}

export const useLang = () => useContext(LangContext);
