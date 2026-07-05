import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
	it("renders children in the dark variant", () => {
		render(<Eyebrow>Nuestros Servicios</Eyebrow>);
		expect(screen.getByText("Nuestros Servicios")).toBeInTheDocument();
	});

	it("renders children in the light variant", () => {
		render(<Eyebrow light>Our Services</Eyebrow>);
		expect(screen.getByText("Our Services")).toBeInTheDocument();
	});

	it("applies a primary-50 background in the default dark variant", () => {
		render(<Eyebrow>Label</Eyebrow>);
		const el = screen.getByText("Label").closest("p");
		expect(el?.className).toContain("bg-primary-50");
	});

	it("applies white text in the light variant", () => {
		render(<Eyebrow light>Label</Eyebrow>);
		const el = screen.getByText("Label").closest("p");
		expect(el?.className).toContain("text-white");
	});

	it("does not apply white text in the dark variant", () => {
		render(<Eyebrow>Label</Eyebrow>);
		const el = screen.getByText("Label").closest("p");
		expect(el?.className).not.toContain("text-white");
	});
});
