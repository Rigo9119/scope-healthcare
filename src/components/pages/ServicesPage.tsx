import { IconComponent } from "#/components/Icon.js";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useBookingLink } from "#/lib/booking.js";

// Placeholder content — real copy will come from Sanity later.
const SERVICES = [
	{
		icon: "ClipboardCheck",
		title: "Valoración médica",
		body: "Evaluación inicial y orientación con un coordinador médico.",
	},
	{
		icon: "Stethoscope",
		title: "Tratamiento integral",
		body: "Atención con especialistas certificados internacionalmente.",
	},
	{
		icon: "HeartPulse",
		title: "Seguimiento",
		body: "Acompañamiento post-tratamiento hasta tu recuperación.",
	},
	{
		icon: "ShieldCheck",
		title: "Logística y viaje",
		body: "Coordinamos vuelos, hospedaje y traslados en Bogotá.",
	},
];

const SPECIALTIES = [
	{ icon: "Smile", title: "Odontología" },
	{ icon: "Sparkles", title: "Estética" },
	{ icon: "Bone", title: "Ortopedia" },
	{ icon: "Eye", title: "Oftalmología" },
	{ icon: "HeartPulse", title: "Cardiología" },
	{ icon: "Baby", title: "Pediatría" },
	{ icon: "Scale", title: "Bariátrica" },
	{ icon: "Microscope", title: "Oncología" },
];

export function ServicesPage() {
	const booking = useBookingLink();
	return (
		<>
			<PageHeader
				eyebrow="Servicios y especialidades"
				title="Atención médica integral en Bogotá"
				subtitle="Acompañamos a pacientes internacionales en cada etapa, con especialistas certificados y precios transparentes."
			/>

			{/* Servicios */}
			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<Eyebrow>Servicios</Eyebrow>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
						Lo que hacemos por ti
					</h2>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{SERVICES.map(({ icon, title, body }) => (
							<div
								key={title}
								className="border border-border-default bg-white p-7 shadow-sm"
							>
								<span className="flex h-12 w-12 items-center justify-center bg-primary-50">
									<IconComponent
										name={icon}
										size={24}
										className="text-primary-600"
									/>
								</span>
								<h3 className="mt-5 font-heading text-lg font-bold text-text-primary">
									{title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-text-secondary">
									{body}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Especialidades */}
			<section className="bg-primary-50/60 px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<Eyebrow>Especialidades</Eyebrow>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
						Áreas de atención
					</h2>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{SPECIALTIES.map(({ icon, title }) => (
							<a
								key={title}
								href={booking.forSpecialty(title)}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-4 border border-border-default bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
							>
								<span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50 transition group-hover:bg-primary-500">
									<IconComponent
										name={icon}
										size={22}
										className="text-primary-600 transition group-hover:text-white"
									/>
								</span>
								<span className="font-heading text-base font-bold text-text-primary">
									{title}
								</span>
							</a>
						))}
					</div>
				</div>
			</section>

			<BookingCta
				title="¿Listo para empezar?"
				subtitle="Escríbenos por WhatsApp y un coordinador te orienta sin costo."
				cta="Agendar consulta"
			/>
		</>
	);
}
