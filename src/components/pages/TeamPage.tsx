import { UserRound } from "lucide-react";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";

// Placeholder team — real members will come from Sanity later.
const TEAM = [
	{ name: "Dr. Nombre Apellido", role: "Director médico" },
	{ name: "Dra. Nombre Apellido", role: "Cirugía estética" },
	{ name: "Dr. Nombre Apellido", role: "Ortopedia" },
	{ name: "Dra. Nombre Apellido", role: "Cardiología" },
];

export function TeamPage() {
	return (
		<>
			<PageHeader
				eyebrow="Nuestro equipo"
				title="Especialistas en quienes confiar"
				subtitle="Un equipo certificado internacionalmente, dedicado a tu bienestar en cada etapa."
			/>

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{TEAM.map(({ name, role }, i) => (
							<div
								key={`${name}-${i}`}
								className="overflow-hidden border border-border-default bg-white shadow-sm"
							>
								<ImagePlaceholder
									icon={UserRound}
									className="aspect-square w-full"
								/>
								<div className="p-5">
									<h3 className="font-heading text-base font-bold text-text-primary">
										{name}
									</h3>
									<p className="mt-1 text-sm text-primary-600">{role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<BookingCta
				title="¿Quieres una segunda opinión?"
				subtitle="Habla directamente con nuestro equipo por WhatsApp."
				cta="Escribir por WhatsApp"
			/>
		</>
	);
}
