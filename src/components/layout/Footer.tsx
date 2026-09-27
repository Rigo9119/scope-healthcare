import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "#/components/ui/BrandMark.js";
import { useLang } from "#/i18n.js";
import { type SectionKey, sectionSlug } from "#/lib/localizedRoutes.js";
import { PILLAR_ORDER, pillarByKey } from "#/lib/pillars.js";
import { m } from "#/paraglide/messages.js";
import { useSiteSettings } from "#/siteSettings.js";

// "Empresa" column → the secondary pages kept out of the main (pillar) nav.
const COMPANY_LINKS: { key: SectionKey; label: () => string }[] = [
	{ key: "about", label: () => m.nav_about() },
	{ key: "team", label: () => m.nav_our_team() },
	{ key: "blog", label: () => m.nav_blog() },
	{ key: "contact", label: () => m.nav_contact() },
];

export function Footer() {
	const { locale } = useLang();
	const data = useSiteSettings();
	const pillars = PILLAR_ORDER.map(pillarByKey);

	const {
		footerTagline,
		footerColServicesLabel,
		footerColCompanyLabel,
		footerColContactLabel,
		footerAddress,
		footerPhone,
		footerEmail,
		footerCopyright,
		footerPrivacyLabel,
		footerTermsLabel,
		footerCookiesLabel,
	} = data;

	const legalLinks: { key: SectionKey; label: string }[] = [
		{ key: "privacy", label: footerPrivacyLabel },
		{ key: "terms", label: footerTermsLabel },
		{ key: "cookies", label: footerCookiesLabel },
	];

	return (
		<footer className="bg-text-primary px-4 pb-8 pt-12 text-neutral-400 sm:px-6 sm:pb-10 sm:pt-16">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
					<div>
						<BrandMark tone="light" />
						<p className="mt-5 max-w-xs text-sm leading-relaxed">
							{footerTagline}
						</p>
					</div>

					<div>
						<h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
							{footerColServicesLabel}
						</h3>
						<ul className="space-y-3 text-sm">
							{pillars.map((pillar) => (
								<li key={pillar.key}>
									<Link
										to="/$lang/$section"
										params={{ lang: locale, section: pillar.slug }}
										className="link-animated transition-colors duration-200 hover:text-primary-300"
									>
										{pillar.navLabel}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
							{footerColCompanyLabel}
						</h3>
						<ul className="space-y-3 text-sm">
							{COMPANY_LINKS.map(({ key, label }) => (
								<li key={key}>
									<Link
										to="/$lang/$section"
										params={{ lang: locale, section: sectionSlug(key, locale) }}
										className="link-animated transition-colors duration-200 hover:text-primary-300"
									>
										{label()}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
							{footerColContactLabel}
						</h3>
						<ul className="space-y-4 text-sm">
							{footerAddress && (
								<li className="flex items-start gap-3">
									<MapPin
										size={16}
										className="mt-0.5 shrink-0 text-primary-400"
									/>{" "}
									{footerAddress}
								</li>
							)}
							{footerPhone && (
								<li className="flex items-start gap-3">
									<Phone
										size={16}
										className="mt-0.5 shrink-0 text-primary-400"
									/>{" "}
									{footerPhone}
								</li>
							)}
							{footerEmail && (
								<li className="flex items-start gap-3">
									<Mail
										size={16}
										className="mt-0.5 shrink-0 text-primary-400"
									/>{" "}
									{footerEmail}
								</li>
							)}
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:mt-14 sm:flex-row sm:pt-8">
					<p>{footerCopyright}</p>
					<div className="flex gap-6">
						{legalLinks.map(({ key, label }) => (
							<Link
								key={key}
								to="/$lang/$section"
								params={{ lang: locale, section: sectionSlug(key, locale) }}
								className="link-animated transition-colors duration-200 hover:text-white"
							>
								{label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
