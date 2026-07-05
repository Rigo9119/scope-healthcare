import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("#/i18n.js", () => ({
	useLang: vi.fn(),
}));

import { useLang } from "#/i18n.js";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";

const switchLocale = vi.fn();
const setOpen = vi.fn();

describe("LanguageSwitcherMobile", () => {
	beforeEach(() => {
		switchLocale.mockClear();
		setOpen.mockClear();
		vi.mocked(useLang).mockReturnValue({ locale: "es", switchLocale });
	});

	it("renders one button per locale", () => {
		render(<LanguageSwitcherMobile setOpen={setOpen} />);
		expect(screen.getByRole("button", { name: "es" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "en" })).toBeInTheDocument();
	});

	it("highlights the active locale", () => {
		render(<LanguageSwitcherMobile setOpen={setOpen} />);
		expect(screen.getByRole("button", { name: "es" }).className).toContain(
			"bg-primary-500",
		);
		expect(screen.getByRole("button", { name: "en" }).className).not.toContain(
			"bg-primary-500",
		);
	});

	it("calls switchLocale with the clicked locale", () => {
		render(<LanguageSwitcherMobile setOpen={setOpen} />);
		fireEvent.click(screen.getByRole("button", { name: "en" }));
		expect(switchLocale).toHaveBeenCalledWith("en");
	});

	it("calls setOpen(false) to close the menu after switching locale", () => {
		render(<LanguageSwitcherMobile setOpen={setOpen} />);
		fireEvent.click(screen.getByRole("button", { name: "en" }));
		expect(setOpen).toHaveBeenCalledWith(false);
	});
});
