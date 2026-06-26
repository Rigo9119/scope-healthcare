import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { setLocale } from "#/paraglide/runtime.js";

export const Route = createFileRoute("/$lang")({
	beforeLoad: ({ params }) => {
		// Only `es` / `en` are valid locale segments; anything else → default home.
		if (params.lang !== "es" && params.lang !== "en") {
			throw redirect({ to: "/$lang", params: { lang: "es" } });
		}
		// Sync Paraglide before any component renders so m.*() messages are correct
		// on first paint (the URL is the source of truth for the active locale).
		setLocale(params.lang, { reload: false });
	},
	component: () => <Outlet />,
});
