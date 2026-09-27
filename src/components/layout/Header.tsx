import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "#/components/ui/BrandMark.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useLang } from "#/i18n.js";
import { useBookingLink } from "#/lib/booking.js";
import { PILLAR_ORDER, pillarByKey } from "#/lib/pillars.js";
import { m } from "#/paraglide/messages.js";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";

export function Header() {
	const { locale } = useLang();
	const booking = useBookingLink();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const pillars = PILLAR_ORDER.map(pillarByKey);

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
						? "shadow-[0_6px_20px_-2px_rgba(16,89,181,0.18)]"
						: "border-b border-border-default"
				}`}
			>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
					<Link to="/$lang" params={{ lang: locale }}>
						<BrandMark />
					</Link>

					<nav className="hidden items-center gap-8 lg:flex">
						{pillars.map((pillar) => (
							<Link
								key={pillar.key}
								to="/$lang/$section"
								params={{ lang: locale, section: pillar.slug }}
								className="link-animated text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-primary-600"
							>
								{pillar.navLabel}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-4 lg:flex">
						<LanguageSwitcher />
						<a
							href={booking.general}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-btn-primary-active"
						>
							<WhatsappIcon size={16} /> {m.nav_book()}
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
					<MobileMenu
						setOpen={setOpen}
						pillars={pillars.map((p) => ({ slug: p.slug, label: p.navLabel }))}
						booking={booking}
					/>
				)}
			</div>
		</header>
	);
}
