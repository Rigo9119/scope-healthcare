import { Check, HeartHandshake, Layers, Stethoscope } from "lucide-react";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import type { Locale } from "#/lib/localizedRoutes.js";

const VALUE_ICONS = [Stethoscope, HeartHandshake, Layers];

// Copy from the client's content doc ("Nuestra filosofía de atención").
const COPY: Record<
	Locale,
	{
		eyebrow: string;
		title: string;
		subtitle: string;
		storyTitle: string;
		story: string;
		pillars: Array<{ title: string; body: string }>;
		values: Array<{ title: string; body: string }>;
		ctaTitle: string;
		ctaSubtitle: string;
		cta: string;
	}
> = {
	es: {
		eyebrow: "Sobre nosotros",
		title: "Nuestra filosofía de atención",
		subtitle:
			"En Scope Healthcare no solo tratamos síntomas: cuidamos tu bienestar global.",
		storyTitle: "Quiénes somos",
		story:
			"Nuestro enfoque integra la prevención, el diagnóstico oportuno y procedimientos especializados para acompañarte a recuperar y mantener tu calidad de vida en cada etapa.",
		pillars: [
			{
				title: "Prevención y diagnóstico oportuno",
				body: "Identificamos y tratamos afecciones antes de que impacten tu ritmo de vida.",
			},
			{
				title: "Acompañamiento continuo",
				body: "Desde tu primera consulta hasta tu seguimiento posprocedimiento, estás en manos expertas.",
			},
		],
		values: [
			{
				title: "Criterio médico especializado",
				body: "Profesionalismo y ética en cada diagnóstico y procedimiento.",
			},
			{
				title: "Atención humanizada",
				body: "Procesos claros, cercanos y enfocados en el bienestar del paciente.",
			},
			{
				title: "Integralidad en salud",
				body: "Especialidades interconectadas para ofrecer respuestas completas en un solo lugar.",
			},
		],
		ctaTitle: "¿Tienes preguntas?",
		ctaSubtitle: "Conversemos, sin compromiso.",
		cta: "Hablar con nosotros",
	},
	en: {
		eyebrow: "About us",
		title: "Our philosophy of care",
		subtitle:
			"At Scope Healthcare we don't just treat symptoms: we care for your overall wellbeing.",
		storyTitle: "Who we are",
		story:
			"Our approach brings together prevention, timely diagnosis and specialized procedures to help you regain and maintain your quality of life at every stage.",
		pillars: [
			{
				title: "Prevention and timely diagnosis",
				body: "We identify and treat conditions before they affect your daily life.",
			},
			{
				title: "Continuous support",
				body: "From your first visit to your post-procedure follow-up, you're in expert hands.",
			},
		],
		values: [
			{
				title: "Specialist medical judgment",
				body: "Professionalism and ethics in every diagnosis and procedure.",
			},
			{
				title: "Human-centered care",
				body: "Clear, close processes focused on the patient's wellbeing.",
			},
			{
				title: "Integrated health",
				body: "Interconnected specialties for complete answers in one place.",
			},
		],
		ctaTitle: "Have questions?",
		ctaSubtitle: "Let's talk, no strings attached.",
		cta: "Talk to us",
	},
};

export function AboutPage() {
	const { locale } = useLang();
	const copy = COPY[locale];

	return (
		<>
			<PageHeader
				eyebrow={copy.eyebrow}
				title={copy.title}
				subtitle={copy.subtitle}
			/>

			{/* Story split */}
			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
					<ImagePlaceholder
						icon={HeartHandshake}
						className="aspect-[5/4] w-full shadow-[0_30px_60px_-20px_rgba(16,89,181,0.3)]"
					/>
					<div>
						<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
							{copy.storyTitle}
						</h2>
						<p className="mt-4 leading-relaxed text-text-secondary sm:text-lg">
							{copy.story}
						</p>
						<ul className="mt-8 space-y-5">
							{copy.pillars.map(({ title, body }) => (
								<li key={title} className="flex gap-4">
									<span className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary-50">
										<Check
											size={18}
											strokeWidth={2.5}
											className="text-primary-600"
										/>
									</span>
									<div>
										<h3 className="font-heading font-bold text-text-primary">
											{title}
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-text-secondary">
											{body}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="bg-primary-50/60 px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-6 md:grid-cols-3">
						{copy.values.map(({ title, body }, i) => {
							const Icon = VALUE_ICONS[i];
							return (
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
							);
						})}
					</div>
				</div>
			</section>

			<BookingCta
				title={copy.ctaTitle}
				subtitle={copy.ctaSubtitle}
				cta={copy.cta}
			/>
		</>
	);
}
