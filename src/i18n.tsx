import { useLocation, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect } from "react";

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
	const pathname = useLocation({ select: (l) => l.pathname });
	const navigate = useNavigate();
	const locale = localeFromPath(pathname);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	function switchLocale(next: Locale) {
		if (next === locale) return;
		// Swap the leading /es or /en, preserving any sub-path (e.g. /es/x → /en/x).
		const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
		navigate({ to: `/${next}${rest}` });
	}

	return (
		<LangContext.Provider value={{ locale, switchLocale }}>
			{children}
		</LangContext.Provider>
	);
}

export const useLang = () => useContext(LangContext);
