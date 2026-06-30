import { Award, HeartPulse, ShieldCheck } from "lucide-react";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";

const VALUES = [
	{
		icon: ShieldCheck,
		title: "Calidad certificada",
		body: "Especialistas con certificaciones internacionales.",
	},
	{
		icon: Award,
		title: "Precios transparentes",
		body: "Presupuesto claro antes de iniciar, sin sorpresas.",
	},
	{
		icon: HeartPulse,
		title: "Acompañamiento integral",
		body: "Contigo desde la consulta hasta la recuperación.",
	},
];

export function AboutPage() {
	return (
		<>
			<PageHeader
				eyebrow="Sobre nosotros"
				title="Atención de clase mundial en Bogotá"
				subtitle="Conectamos a pacientes internacionales con los mejores especialistas de Colombia."
			/>

			{/* Story split */}
			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
					<ImagePlaceholder
						icon={HeartPulse}
						className="aspect-[5/4] w-full shadow-[0_30px_60px_-20px_rgba(16,89,181,0.3)]"
					/>
					<div>
						<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
							Quiénes somos
						</h2>
						<p className="mt-4 text-text-secondary">
							Texto de presentación de Scope Health. Este contenido se podrá
							editar desde el panel de administración. Aquí se describe la
							historia, la misión y el compromiso con los pacientes.
						</p>
						<p className="mt-4 text-text-secondary">
							Nuestro objetivo es que acceder a atención médica de calidad sea
							sencillo, transparente y humano.
						</p>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="bg-primary-50/60 px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-6 md:grid-cols-3">
						{VALUES.map(({ icon: Icon, title, body }) => (
							<div key={title} className="bg-white p-7 shadow-sm">
								<span className="flex h-12 w-12 items-center justify-center bg-primary-50">
									<Icon size={24} className="text-primary-600" />
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

			<BookingCta
				title="¿Tienes preguntas?"
				subtitle="Conversemos por WhatsApp, sin compromiso."
				cta="Hablar con nosotros"
			/>
		</>
	);
}
