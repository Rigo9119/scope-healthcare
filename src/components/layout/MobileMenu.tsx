import { Link } from "@tanstack/react-router";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useLang } from "#/i18n.js";
import { type SectionKey, sectionSlug } from "#/lib/localizedRoutes.js";
import { m } from "#/paraglide/messages.js";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";

export interface MobileMenuProps {
	setOpen: (open: boolean) => void;
	sections: { key: SectionKey; label: string }[];
	booking: { general: string };
}

const linkClass =
	"link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700";

export default function MobileMenu({
	setOpen,
	sections,
	booking,
}: MobileMenuProps) {
	const { locale } = useLang();
	return (
		<div className="border-t border-border-default bg-white px-6 pb-5 lg:hidden">
			<nav className="flex flex-col gap-1 pt-3">
				<Link
					to="/$lang"
					params={{ lang: locale }}
					onClick={() => setOpen(false)}
					className={linkClass}
				>
					{m.nav_home()}
				</Link>
				{sections.map(({ key, label }) => (
					<Link
						key={key}
						to="/$lang/$section"
						params={{ lang: locale, section: sectionSlug(key, locale) }}
						onClick={() => setOpen(false)}
						className={linkClass}
					>
						{label}
					</Link>
				))}
				<a
					href={booking.general}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => setOpen(false)}
					className="mt-3 inline-flex items-center justify-center gap-2 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:bg-primary-600 active:shadow-btn-primary-active"
				>
					<WhatsappIcon size={16} /> {m.nav_book()}
				</a>

				{/* Language switcher mobile */}
				<LanguageSwitcherMobile setOpen={setOpen} />
			</nav>
		</div>
	);
}
