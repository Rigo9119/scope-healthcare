import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLang } from "#/i18n.js";
import { sectionSlug } from "#/lib/localizedRoutes.js";
import { m } from "#/paraglide/messages.js";
import { useSiteSettings } from "#/siteSettings.js";

export default function TopBar() {
	const { locale } = useLang();
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
				<div className="flex items-center gap-6">
					<Link
						to="/$lang/$section"
						params={{ lang: locale, section: sectionSlug("about", locale) }}
						className="link-animated font-medium text-primary-100 transition-colors hover:text-white"
					>
						{m.nav_find_us()}
					</Link>
					<Link
						to="/$lang/$section"
						params={{ lang: locale, section: sectionSlug("contact", locale) }}
						className="link-animated font-medium text-primary-100 transition-colors hover:text-white"
					>
						{m.nav_contact()}
					</Link>
					{footerAddress && (
						<span className="inline-flex items-center gap-1.5 text-primary-100">
							<MapPin size={13} /> {footerAddress}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
