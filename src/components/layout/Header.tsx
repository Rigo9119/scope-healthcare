import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "#/components/ui/BrandMark.js";
import { SocialLinks } from "#/components/ui/SocialLinks.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useLang } from "#/i18n.js";
import { useBookingLink } from "#/lib/booking.js";
import { sectionSlug } from "#/lib/localizedRoutes.js";
import { PILLAR_ORDER, pillarByKey } from "#/lib/pillars.js";
import { m } from "#/paraglide/messages.js";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { SearchDialog } from "./SearchDialog";

export function Header() {
	const { locale } = useLang();
	const booking = useBookingLink();
	const pathname = useLocation({ select: (l) => l.pathname });
	const [open, setOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pillars = PILLAR_ORDER.map(pillarByKey);

	// The home page has a dark full-bleed hero, so the header overlays it
	// transparently (light text) at the top and turns solid on scroll. Every
	// other page has a light background, so the header stays solid there.
	const segments = pathname.split("/").filter(Boolean);
	const isHome =
		segments.length === 1 && (segments[0] === "es" || segments[0] === "en");
	// Opening the mobile menu drops a white panel, so force the bar solid then too.
	const light = isHome && !scrolled && !open;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Cmd/Ctrl+K opens the search overlay.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const utilityLinkCls = `link-animated text-sm font-medium transition-colors duration-200 ${
		light
			? "text-white/80 hover:text-white"
			: "text-text-secondary hover:text-primary-600"
	}`;
	const iconBtnCls = light ? "text-white" : "text-text-primary";
	const barCls = light
		? "bg-transparent"
		: `bg-white ${
				scrolled
					? "shadow-[0_6px_20px_-2px_rgba(16,89,181,0.18)]"
					: "border-b border-border-default"
			}`;

	return (
		<header
			className={`z-50 ${isHome ? "fixed inset-x-0 top-0" : "sticky top-0"}`}
		>
			<div className={`transition-colors duration-300 ${barCls}`}>
				{/* Desktop: utilities + centered logo, then centered pillar nav below. */}
				<div className="mx-auto hidden max-w-7xl px-6 lg:block">
					<div className="grid grid-cols-3 items-center py-4">
						<div className="flex items-center gap-5">
							<LanguageSwitcher light={light} />
							<Link
								to="/$lang/$section"
								params={{ lang: locale, section: sectionSlug("about", locale) }}
								className={utilityLinkCls}
							>
								{m.nav_find_us()}
							</Link>
							<Link
								to="/$lang/$section"
								params={{
									lang: locale,
									section: sectionSlug("contact", locale),
								}}
								className={utilityLinkCls}
							>
								{m.nav_contact()}
							</Link>
						</div>

						<div className="flex justify-center">
							<Link to="/$lang" params={{ lang: locale }}>
								<BrandMark tone={light ? "light" : "dark"} />
							</Link>
						</div>

						<div className="flex items-center justify-end gap-4">
							<button
								type="button"
								onClick={() => setSearchOpen(true)}
								className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
									light
										? "text-white/80 hover:text-white"
										: "text-text-secondary hover:text-primary-600"
								}`}
							>
								<Search size={16} /> {m.nav_search()}
							</button>
							<a
								href={booking.general}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-btn-primary-active"
							>
								<WhatsappIcon size={16} /> {m.nav_book()}
							</a>
							<SocialLinks light={light} />
						</div>
					</div>

					<nav
						className={`flex items-center justify-center gap-10 border-t py-3 ${
							light ? "border-white/20" : "border-border-default"
						}`}
					>
						{pillars.map((pillar) => (
							<Link
								key={pillar.key}
								to="/$lang/$section"
								params={{ lang: locale, section: pillar.slug }}
								className={`link-animated text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
									light
										? "text-white/90 hover:text-white"
										: "text-text-secondary hover:text-primary-600"
								}`}
							>
								{pillar.navLabel}
							</Link>
						))}
					</nav>
				</div>

				{/* Mobile: hamburger · centered logo · search. */}
				<div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-4 lg:hidden">
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className={`justify-self-start ${iconBtnCls}`}
						aria-label="Menú"
					>
						{open ? <X size={24} /> : <Menu size={24} />}
					</button>
					<div className="flex justify-center">
						<Link to="/$lang" params={{ lang: locale }}>
							<BrandMark tone={light ? "light" : "dark"} />
						</Link>
					</div>
					<button
						type="button"
						onClick={() => setSearchOpen(true)}
						className={`justify-self-end ${iconBtnCls}`}
						aria-label={m.nav_search()}
					>
						<Search size={22} />
					</button>
				</div>

				{open && (
					<MobileMenu
						setOpen={setOpen}
						pillars={pillars.map((p) => ({ slug: p.slug, label: p.navLabel }))}
						booking={booking}
					/>
				)}
			</div>

			<SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
		</header>
	);
}
