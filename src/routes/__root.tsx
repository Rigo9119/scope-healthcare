import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/layout/Footer.js";
import { Navbar } from "#/components/layout/Navbar.js";
import { LangProvider } from "#/i18n.js";
import { SiteSettingsProvider } from "#/siteSettings.js";

import "../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<LangProvider>
			<SiteSettingsProvider>
				<div className="min-h-screen overflow-x-hidden bg-bg-page font-body text-text-secondary">
					<Navbar />
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
	);
}
