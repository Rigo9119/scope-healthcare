import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "#/components/ui/BrandMark.js";
import { useSiteSettings } from "#/siteSettings.js";

export function Footer() {
	const data = useSiteSettings();

	const {
		footerTagline,
		footerColServicesLabel,
		footerServices,
		footerColCompanyLabel,
		footerCompany,
		footerColContactLabel,
		footerAddress,
		footerPhone,
		footerEmail,
		footerCopyright,
		footerPrivacyLabel,
		footerTermsLabel,
		footerCookiesLabel,
	} = data;

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
							{footerServices?.map((l) => (
								<li key={l.label}>
									<a
										href="#especialidades"
										className="link-animated transition-colors duration-200 hover:text-primary-300"
									>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
							{footerColCompanyLabel}
						</h3>
						<ul className="space-y-3 text-sm">
							{footerCompany?.map((l) => (
								<li key={l.label}>
									<a
										href="#"
										className="link-animated transition-colors duration-200 hover:text-primary-300"
									>
										{l.label}
									</a>
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
						<a
							href="#"
							className="link-animated transition-colors duration-200 hover:text-white"
						>
							{footerPrivacyLabel}
						</a>
						<a
							href="#"
							className="link-animated transition-colors duration-200 hover:text-white"
						>
							{footerTermsLabel}
						</a>
						<a
							href="#"
							className="link-animated transition-colors duration-200 hover:text-white"
						>
							{footerCookiesLabel}
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
