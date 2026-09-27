import { Link } from "@tanstack/react-router";
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

const utilityLinkCls =
	"link-animated text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-primary-600";

export function Header() {
	const { locale } = useLang();
	const booking = useBookingLink();
	const [open, setOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pillars = PILLAR_ORDER.map(pillarByKey);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
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

	return (
		<header className="sticky top-0 z-50">
			<div
				className={`bg-white transition-shadow duration-300 ${
					scrolled
						? "shadow-[0_6px_20px_-2px_rgba(16,89,181,0.18)]"
						: "border-b border-border-default"
				}`}
			>
				{/* Desktop: utilities + centered logo, then centered pillar nav below. */}
				<div className="mx-auto hidden max-w-7xl px-6 lg:block">
					<div className="grid grid-cols-3 items-center py-4">
						<div className="flex items-center gap-5">
							<LanguageSwitcher />
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
								<BrandMark />
							</Link>
						</div>

						<div className="flex items-center justify-end gap-4">
							<button
								type="button"
								onClick={() => setSearchOpen(true)}
								className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-primary-600"
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
							<SocialLinks />
						</div>
					</div>

					<nav className="flex items-center justify-center gap-10 border-t border-border-default py-3">
						{pillars.map((pillar) => (
							<Link
								key={pillar.key}
								to="/$lang/$section"
								params={{ lang: locale, section: pillar.slug }}
								className="link-animated text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors duration-200 hover:text-primary-600"
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
						className="justify-self-start text-text-primary"
						aria-label="Menú"
					>
						{open ? <X size={24} /> : <Menu size={24} />}
					</button>
					<div className="flex justify-center">
						<Link to="/$lang" params={{ lang: locale }}>
							<BrandMark />
						</Link>
					</div>
					<button
						type="button"
						onClick={() => setSearchOpen(true)}
						className="justify-self-end text-text-primary"
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
