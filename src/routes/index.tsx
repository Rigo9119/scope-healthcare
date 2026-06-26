import { createFileRoute, redirect } from "@tanstack/react-router";
import { getLocale } from "#/paraglide/runtime.js";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		// Send the bare "/" to a locale-prefixed URL. Prefer the visitor's
		// remembered locale (Paraglide cookie), falling back to the base locale.
		const locale = getLocale() === "en" ? "en" : "es";
		throw redirect({ to: "/$lang", params: { lang: locale } });
	},
});
