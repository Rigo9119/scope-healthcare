import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("#/i18n.js", () => ({
	useLang: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		children,
		to,
		params,
	}: {
		children: React.ReactNode;
		to: string;
		params?: Record<string, string>;
	}) => {
		const href = params
			? to.replace(/\$(\w+)/g, (_, key) => params[key] ?? "")
			: to;
		return <a href={href}>{children}</a>;
	},
}));

import { useLang } from "#/i18n.js";
import NotFound from "./NotFound";

describe("NotFound", () => {
	beforeEach(() => {
		vi.mocked(useLang).mockReturnValue({
			locale: "es",
			switchLocale: vi.fn(),
		});
	});

	it("renders the 404 heading", () => {
		render(<NotFound />);
		expect(screen.getByText("404")).toBeInTheDocument();
	});

	it("renders Spanish copy when locale is es", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "es", switchLocale: vi.fn() });
		render(<NotFound />);
		expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Volver al inicio" }),
		).toBeInTheDocument();
	});

	it("renders English copy when locale is en", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "en", switchLocale: vi.fn() });
		render(<NotFound />);
		expect(screen.getByText("Page not found")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Back home" })).toBeInTheDocument();
	});

	it("links back to the current locale home", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "en", switchLocale: vi.fn() });
		render(<NotFound />);
		const link = screen.getByRole("link", { name: "Back home" });
		expect(link).toHaveAttribute("href", "/en");
	});
});
