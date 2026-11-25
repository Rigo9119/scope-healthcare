import { Link } from "@tanstack/react-router";
import { BookingButton } from "#/components/ui/BookingButton.js";
import { SocialLinks } from "#/components/ui/SocialLinks.js";
import { useLang } from "#/i18n.js";
import { sectionSlug } from "#/lib/localizedRoutes.js";
import { m } from "#/paraglide/messages.js";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";

export interface MobileMenuProps {
	setOpen: (open: boolean) => void;
	pillars: { slug: string; label: string }[];
}

const linkClass =
	"link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700 data-[status=active]:bg-primary-50 data-[status=active]:text-primary-700 data-[status=active]:after:hidden";

export default function MobileMenu({ setOpen, pillars }: MobileMenuProps) {
	const { locale } = useLang();
	const close = () => setOpen(false);
	return (
		<div
			id="mobile-menu"
			className="border-t border-border-default bg-white px-6 pb-5 lg:hidden"
		>
			<nav className="flex flex-col gap-1 pt-3">
				<Link
					to="/$lang/"
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
						to="/$lang/$section/"
						params={{ lang: locale, section: slug }}
						onClick={close}
						className={linkClass}
					>
						{label}
					</Link>
				))}

				<span className="mt-2 border-t border-border-default" />

				<Link
					to="/$lang/$section/"
					params={{ lang: locale, section: sectionSlug("about", locale) }}
					onClick={close}
					className={linkClass}
				>
					{m.nav_find_us()}
				</Link>
				<Link
					to="/$lang/$section/"
					params={{ lang: locale, section: sectionSlug("contact", locale) }}
					onClick={close}
					className={linkClass}
				>
					{m.nav_contact()}
				</Link>

				<BookingButton
					label={m.nav_book()}
					tone="dark"
					size="sm"
					onClick={close}
					className="mt-3"
				/>

				{/* Language switcher mobile */}
				<LanguageSwitcherMobile setOpen={setOpen} />

				<SocialLinks className="mt-3 px-3" />
			</nav>
		</div>
	);
}
