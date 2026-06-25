import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "#/components/ui/BrandMark.js";
import { useLang } from "#/i18n.js";
import { m } from "#/paraglide/messages.js";
import { useSiteSettings } from "#/siteSettings.js";

function TopBar() {
	const { footerPhone, footerEmail, footerHours, footerAddress } =
		useSiteSettings();
	return (
		<div className="hidden bg-primary-700 text-white lg:block">
			<div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs">
				<div className="flex items-center gap-6">
					{footerPhone && (
						<span className="inline-flex items-center gap-1.5">
							<Phone size={13} /> {footerPhone}
						</span>
					)}
					{footerEmail && (
						<span className="inline-flex items-center gap-1.5">
							<Mail size={13} /> {footerEmail}
						</span>
					)}
					{footerHours && (
						<span className="inline-flex items-center gap-1.5">
							<Clock size={13} /> {footerHours}
						</span>
					)}
				</div>
				{footerAddress && (
					<span className="inline-flex items-center gap-1.5 text-primary-100">
						<MapPin size={13} /> {footerAddress}
					</span>
				)}
			</div>
		</div>
	);
}

export function Navbar() {
	const { locale, switchLocale } = useLang();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const navLinks = [
		{ href: "#especialidades", label: m.nav_specialties() },
		{ href: "#proceso", label: m.nav_process() },
		{ href: "#testimonios", label: m.nav_testimonials() },
		{ href: "#contacto", label: m.nav_contact() },
	];

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="sticky top-0 z-50">
			<TopBar />
			<div
				className={`bg-white transition-shadow duration-300 ${
					scrolled
						? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
						: "border-b border-border-default"
				}`}
			>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
					<Link to="/">
						<BrandMark />
					</Link>

					<nav className="hidden items-center gap-8 lg:flex">
						{navLinks.map(({ href, label }) => (
							<a
								key={href}
								href={href}
								className="link-animated text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-primary-600"
							>
								{label}
							</a>
						))}
					</nav>

					<div className="hidden items-center gap-4 lg:flex">
						{/* Language switcher */}
						<div className="flex items-center gap-0.5">
							{(["es", "en"] as const).map((lang, i) => (
								<>
									{i > 0 && (
										<span
											key={`sep-${lang}`}
											className="text-xs text-border-default"
										>
											|
										</span>
									)}
									<button
										key={lang}
										type="button"
										onClick={() => switchLocale(lang)}
										className={`px-2 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
											locale === lang
												? "text-primary-600"
												: "text-text-muted hover:text-text-secondary"
										}`}
									>
										{lang}
									</button>
								</>
							))}
						</div>

						<a
							href="#contacto"
							className="inline-flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-btn-primary-active"
						>
							<Calendar size={16} /> {m.nav_book()}
						</a>
					</div>

					<button
						type="button"
						onClick={() => setOpen(!open)}
						className="text-text-primary lg:hidden"
						aria-label="Menú"
					>
						{open ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{open && (
					<div className="border-t border-border-default bg-white px-6 pb-5 lg:hidden">
						<nav className="flex flex-col gap-1 pt-3">
							{navLinks.map(({ href, label }) => (
								<a
									key={href}
									href={href}
									onClick={() => setOpen(false)}
									className="link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
								>
									{label}
								</a>
							))}
							<a
								href="#contacto"
								onClick={() => setOpen(false)}
								className="mt-3 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:bg-primary-600 active:shadow-btn-primary-active"
							>
								{m.nav_book()}
							</a>

							{/* Language switcher mobile */}
							<div className="mt-3 flex items-center gap-2 border-t border-border-default pt-4">
								<span className="text-xs text-text-muted">Idioma:</span>
								{(["es", "en"] as const).map((lang) => (
									<button
										key={lang}
										type="button"
										onClick={() => {
											switchLocale(lang);
											setOpen(false);
										}}
										className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
											locale === lang
												? "bg-primary-500 text-white"
												: "text-text-muted hover:text-primary-600"
										}`}
									>
										{lang}
									</button>
								))}
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
