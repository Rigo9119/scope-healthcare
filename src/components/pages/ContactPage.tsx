import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useLang } from "#/i18n.js";
import { useBookingLink } from "#/lib/booking.js";
import type { Locale } from "#/lib/localizedRoutes.js";
import { useSiteSettings } from "#/siteSettings.js";

const COPY: Record<
	Locale,
	{
		eyebrow: string;
		title: string;
		subtitle: string;
		details: string;
		address: string;
		phone: string;
		email: string;
		hours: string;
		book: string;
		mapTitle: string;
		directions: string;
	}
> = {
	es: {
		eyebrow: "Contacto",
		title: "Estamos para ayudarte",
		subtitle:
			"Agenda tu consulta o escríbenos. Te respondemos lo antes posible.",
		details: "Datos de contacto",
		address: "Dirección",
		phone: "Teléfono",
		email: "Email",
		hours: "Horario",
		book: "Agendar por WhatsApp",
		mapTitle: "Mapa de la ubicación de Scope Healthcare",
		directions: "Cómo llegar",
	},
	en: {
		eyebrow: "Contact",
		title: "We're here to help",
		subtitle:
			"Book your consultation or message us. We'll get back to you as soon as possible.",
		details: "Contact details",
		address: "Address",
		phone: "Phone",
		email: "Email",
		hours: "Hours",
		book: "Book on WhatsApp",
		mapTitle: "Map of the Scope Healthcare location",
		directions: "Get directions",
	},
};

export function ContactPage() {
	const { locale } = useLang();
	const booking = useBookingLink();
	const { footerAddress, mapQuery, footerPhone, footerEmail, footerHours } =
		useSiteSettings();
	const copy = COPY[locale];
	const place = mapQuery || footerAddress;

	const items = [
		{ icon: MapPin, label: copy.address, value: footerAddress },
		{ icon: Phone, label: copy.phone, value: footerPhone },
		{ icon: Mail, label: copy.email, value: footerEmail },
		{ icon: Clock, label: copy.hours, value: footerHours },
	].filter((i) => i.value);

	return (
		<>
			<PageHeader
				eyebrow={copy.eyebrow}
				title={copy.title}
				subtitle={copy.subtitle}
			/>

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
					{/* Contact details */}
					<div>
						<h2 className="font-heading text-2xl font-extrabold text-text-primary">
							{copy.details}
						</h2>
						<ul className="mt-8 space-y-6">
							{items.map(({ icon: Icon, label, value }) => (
								<li key={label} className="flex items-start gap-4">
									<span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-50">
										<Icon size={20} className="text-primary-600" />
									</span>
									<div>
										<p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
											{label}
										</p>
										<p className="mt-0.5 text-text-primary">{value}</p>
									</div>
								</li>
							))}
						</ul>

						<a
							href={booking.general}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-10 inline-flex items-center gap-2 bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600"
						>
							<WhatsappIcon size={18} /> {copy.book}
						</a>
					</div>

					{/* Map: keyless Google Maps embed, lazy so it costs nothing until scrolled to. */}
					{place && (
						<div className="flex flex-col border border-border-default bg-white shadow-sm">
							<iframe
								title={copy.mapTitle}
								src={`https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed&hl=${locale}`}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="aspect-[4/3] w-full flex-1 border-0 bg-primary-50 lg:aspect-auto lg:min-h-[420px]"
							/>
							<div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-default p-4 sm:px-6">
								<p className="flex min-w-0 items-start gap-2 text-sm text-text-secondary">
									<MapPin
										size={16}
										className="mt-0.5 shrink-0 text-primary-600"
										aria-hidden
									/>
									{footerAddress}
								</p>
								<a
									href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
								>
									<Navigation size={15} aria-hidden />
									<span className="link-animated">{copy.directions}</span>
								</a>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
