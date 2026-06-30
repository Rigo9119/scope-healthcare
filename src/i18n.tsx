import { useLocation, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect } from "react";
import { sectionFromAnySlug, sectionSlug } from "#/lib/localizedRoutes.js";

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
		// If on a localized section page, translate the slug to the target locale
		// (e.g. /es/nuestros-servicios → /en/our-services); otherwise go home.
		const slug = pathname.split("/").filter(Boolean)[1];
		const match = slug ? sectionFromAnySlug(slug) : null;
		if (match) {
			navigate({
				to: "/$lang/$section",
				params: { lang: next, section: sectionSlug(match.key, next) },
			});
		} else {
			navigate({ to: "/$lang", params: { lang: next } });
		}
	}

	return (
		<LangContext.Provider value={{ locale, switchLocale }}>
			{children}
		</LangContext.Provider>
	);
}

export const useLang = () => useContext(LangContext);
