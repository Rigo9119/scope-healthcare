import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useBookingLink } from "#/lib/booking.js";
import { useSiteSettings } from "#/siteSettings.js";

export function ContactPage() {
	const booking = useBookingLink();
	const { footerAddress, footerPhone, footerEmail, footerHours } =
		useSiteSettings();

	const items = [
		{ icon: MapPin, label: "Dirección", value: footerAddress },
		{ icon: Phone, label: "Teléfono", value: footerPhone },
		{ icon: Mail, label: "Email", value: footerEmail },
		{ icon: Clock, label: "Horario", value: footerHours },
	].filter((i) => i.value);

	return (
		<>
			<PageHeader
				eyebrow="Contacto"
				title="Estamos para ayudarte"
				subtitle="Agenda tu consulta o escríbenos. Te respondemos lo antes posible."
			/>

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
					{/* Contact details */}
					<div>
						<h2 className="font-heading text-2xl font-extrabold text-text-primary">
							Datos de contacto
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
							<WhatsappIcon size={18} /> Agendar por WhatsApp
						</a>
					</div>

					{/* Map placeholder */}
					<div className="min-h-[320px] bg-primary-50">
						<div className="flex h-full min-h-[320px] items-center justify-center text-sm text-text-muted">
							Mapa (próximamente)
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
