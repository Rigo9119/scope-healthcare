import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/layout/Footer.js";
import { Header } from "#/components/layout/Header.js";
import { LangProvider } from "#/i18n.js";
import { SITE_NAME } from "#/lib/seo.js";
import { SiteSettingsProvider } from "#/siteSettings.js";

import "../styles.css";

export const Route = createRootRoute({
  // Site-wide default; per-route `head` (e.g. the home page) overrides this.
  head: () => ({ meta: [{ title: SITE_NAME }] }),
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
