import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("#/i18n.js", () => ({
	useLang: vi.fn(),
}));

import { useLang } from "#/i18n.js";
import LanguageSwitcher from "./LanguageSwitcher";

const switchLocale = vi.fn();

describe("LanguageSwitcher", () => {
	beforeEach(() => {
		switchLocale.mockClear();
	});

	it("renders one button per locale", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "es", switchLocale });
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button", { name: "es" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "en" })).toBeInTheDocument();
	});

	it("highlights the active locale and mutes the inactive one", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "es", switchLocale });
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button", { name: "es" }).className).toContain(
			"text-primary-600",
		);
		expect(screen.getByRole("button", { name: "en" }).className).toContain(
			"text-text-muted",
		);
	});

	it("calls switchLocale with the clicked locale", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "es", switchLocale });
		render(<LanguageSwitcher />);
		fireEvent.click(screen.getByRole("button", { name: "en" }));
		expect(switchLocale).toHaveBeenCalledWith("en");
		expect(switchLocale).toHaveBeenCalledTimes(1);
	});

	it("reflects the active locale when English is current", () => {
		vi.mocked(useLang).mockReturnValue({ locale: "en", switchLocale });
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button", { name: "en" }).className).toContain(
			"text-primary-600",
		);
		expect(screen.getByRole("button", { name: "es" }).className).toContain(
			"text-text-muted",
		);
	});
});
