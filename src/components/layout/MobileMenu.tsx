import { Link } from "@tanstack/react-router";
import { SocialLinks } from "#/components/ui/SocialLinks.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useLang } from "#/i18n.js";
import { sectionSlug } from "#/lib/localizedRoutes.js";
import { m } from "#/paraglide/messages.js";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";

export interface MobileMenuProps {
	setOpen: (open: boolean) => void;
	pillars: { slug: string; label: string }[];
	booking: { general: string };
}

const linkClass =
	"link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700 data-[status=active]:bg-primary-50 data-[status=active]:text-primary-700 data-[status=active]:after:hidden";

export default function MobileMenu({
	setOpen,
	pillars,
	booking,
}: MobileMenuProps) {
	const { locale } = useLang();
	const close = () => setOpen(false);
	return (
		<div className="border-t border-border-default bg-white px-6 pb-5 lg:hidden">
			<nav className="flex flex-col gap-1 pt-3">
				<Link
					to="/$lang"
					params={{ lang: locale }}
					activeOptions={{ exact: true }}
					onClick={close}
					className={linkClass}
				>
					{m.nav_home()}
				</Link>
				{pillars.map(({ slug, label }) => (
					<Link
						key={slug}
						to="/$lang/$section"
						params={{ lang: locale, section: slug }}
						onClick={close}
						className={linkClass}
					>
						{label}
					</Link>
				))}

				<span className="mt-2 border-t border-border-default" />

				<Link
					to="/$lang/$section"
					params={{ lang: locale, section: sectionSlug("about", locale) }}
					onClick={close}
					className={linkClass}
				>
					{m.nav_find_us()}
				</Link>
				<Link
					to="/$lang/$section"
					params={{ lang: locale, section: sectionSlug("contact", locale) }}
					onClick={close}
					className={linkClass}
				>
					{m.nav_contact()}
				</Link>

				<a
					href={booking.general}
					target="_blank"
					rel="noopener noreferrer"
					onClick={close}
					className="mt-3 inline-flex items-center justify-center gap-2 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:bg-primary-600 active:shadow-btn-primary-active"
				>
					<WhatsappIcon size={16} /> {m.nav_book()}
				</a>

				{/* Language switcher mobile */}
				<LanguageSwitcherMobile setOpen={setOpen} />

				<SocialLinks className="mt-3 px-3" />
			</nav>
		</div>
	);
}
