import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("#/lib/booking.js", () => ({
	useBookingLink: () => ({
		channel: "whatsapp",
		link: {
			href: "https://wa.me/573000000000",
			target: "_blank",
			rel: "noopener noreferrer",
		},
		Icon: () => <svg data-testid="icon" />,
	}),
}));

import { BookingButton } from "./BookingButton";

describe("BookingButton", () => {
	it("links to the booking channel with its icon", () => {
		render(<BookingButton label="Agendar consulta" />);
		const link = screen.getByRole("link", { name: "Agendar consulta" });
		expect(link).toHaveAttribute("href", "https://wa.me/573000000000");
		expect(link).toHaveAttribute("target", "_blank");
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("uses the white outline by default and the blue one on white surfaces", () => {
		const { rerender } = render(<BookingButton label="A" />);
		expect(screen.getByRole("link")).toHaveClass("btn-glass");
		rerender(<BookingButton label="A" tone="dark" />);
		expect(screen.getByRole("link")).toHaveClass("btn-glass-dark");
	});

	it("calls onClick (the mobile menu closes itself)", () => {
		const onClick = vi.fn();
		render(<BookingButton label="A" onClick={onClick} />);
		fireEvent.click(screen.getByRole("link"));
		expect(onClick).toHaveBeenCalledOnce();
	});
});
