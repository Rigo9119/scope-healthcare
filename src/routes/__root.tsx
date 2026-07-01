import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/layout/Footer.js";
import { Header } from "#/components/layout/Header.js";
import { LangProvider } from "#/i18n.js";
import { SITE_NAME } from "#/lib/seo.js";
import { setLocale } from "#/paraglide/runtime.js";
import { SiteSettingsProvider } from "#/siteSettings.js";

import "../styles.css";
import NotFound from "#/components/ui/NotFound";

export const Route = createRootRoute({
	// Site-wide default; per-route `head` (e.g. the home page) overrides this.
	head: () => ({ meta: [{ title: SITE_NAME }] }),
	notFoundComponent: NotFound,
	beforeLoad: ({ location }) => {
		// Detectamos el idioma directamente desde el primer segmento de la URL real
		const segments = location.pathname.split("/").filter(Boolean);
		const currentLang = segments[0];

		// Si el usuario entra a la raíz limpia "/" o pone un idioma inválido, lo redireccionamos a /es
		if (currentLang !== "es" && currentLang !== "en") {
			throw redirect({ to: "/$lang", params: { lang: "es" } });
		}

		// Sincronizamos el estado interno de Paraglide
		setLocale(currentLang, { reload: false });
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<HeadContent />
			<LangProvider>
				<SiteSettingsProvider>
					<div className="min-h-screen overflow-x-hidden bg-bg-page font-body text-text-secondary">
						<Header />
						<main>
							<Outlet />
						</main>
						<Footer />
					</div>
				</SiteSettingsProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</LangProvider>
		</>
	);
}
