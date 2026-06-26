import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

// Always mount: on prerendered pages (#app holds an SSG snapshot) createRoot
// clears it and renders the live SPA over the static HTML.
const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={router} />);
