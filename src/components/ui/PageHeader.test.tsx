import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
	it("renders the title in an h1", () => {
		render(<PageHeader title="Sobre nosotros" />);
		expect(
			screen.getByRole("heading", { level: 1, name: "Sobre nosotros" }),
		).toBeInTheDocument();
	});

	it("renders the eyebrow when provided", () => {
		render(<PageHeader title="Title" eyebrow="Quiénes somos" />);
		expect(screen.getByText("Quiénes somos")).toBeInTheDocument();
	});

	it("does not render an eyebrow when the prop is omitted", () => {
		render(<PageHeader title="Title" />);
		// If no eyebrow, the Eyebrow bullet span is absent
		const bullets = document.querySelectorAll(".bg-primary-500.rounded-full");
		expect(bullets).toHaveLength(0);
	});

	it("renders the subtitle when provided", () => {
		render(<PageHeader title="Title" subtitle="World-class medical care" />);
		expect(screen.getByText("World-class medical care")).toBeInTheDocument();
	});

	it("does not render a subtitle element when the prop is omitted", () => {
		render(<PageHeader title="Title" />);
		expect(
			screen.queryByText("World-class medical care"),
		).not.toBeInTheDocument();
	});
});
