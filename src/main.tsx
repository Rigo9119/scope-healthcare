import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 300_000,
			gcTime: 1_800_000,
			retry: 1,
		},
	},
});

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultViewTransition: true,
	// Netlify serves prerendered pages at "<path>/" (see seoHead).
	trailingSlash: "always",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Root element #app not found");
// A prerendered snapshot already carries the route's head tags; React doesn't
// own those nodes, so they'd linger (stale canonical, duplicate title) next to
// the ones HeadContent renders. Drop them before the app mounts.
for (const el of document.head.querySelectorAll(
	'title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"], script[type="application/ld+json"]',
)) {
	el.remove();
}
const root = ReactDOM.createRoot(rootElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>,
);
