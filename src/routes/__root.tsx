import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/layout/Footer.js";
import { Header } from "#/components/layout/Header.js";
import { LangProvider, useLang } from "#/i18n.js";
import { SITE_NAME } from "#/lib/seo.js";
import { setLocale } from "#/paraglide/runtime.js";
import { SiteSettingsProvider } from "#/siteSettings.js";

import "../styles.css";

function NotFound() {
	const { locale } = useLang();
	return (
		<section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
			<p className="font-heading text-6xl font-extrabold text-primary-500">
				404
			</p>
			<h2 className="mt-4 font-heading text-2xl font-bold text-text-primary">
				{locale === "en" ? "Page not found" : "Página no encontrada"}
			</h2>
			<p className="mt-2 text-text-secondary">
				{locale === "en"
					? "The page you're looking for doesn't exist."
					: "La página que buscas no existe."}
			</p>
			<Link
				to="/$lang"
				params={{ lang: locale }}
				className="mt-8 inline-flex bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-btn-primary transition hover:bg-primary-600"
			>
				{locale === "en" ? "Back home" : "Volver al inicio"}
			</Link>
		</section>
	);
}

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
