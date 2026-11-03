import { Newspaper } from "lucide-react";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import type { Locale } from "#/lib/localizedRoutes.js";

// No articles yet: a "coming soon" page (noindex, see the route head) until the
// client sends the first posts.
const COPY: Record<
	Locale,
	{
		title: string;
		subtitle: string;
		soon: string;
		soonBody: string;
		ctaTitle: string;
		ctaSubtitle: string;
		cta: string;
	}
> = {
	es: {
		title: "Guías y artículos de salud",
		subtitle: "Información útil sobre tratamientos, prevención y bienestar.",
		soon: "Próximamente",
		soonBody:
			"Estamos preparando los primeros artículos de nuestro equipo médico.",
		ctaTitle: "¿Tienes una pregunta ahora?",
		ctaSubtitle: "Contáctanos y un coordinador te orienta sin costo.",
		cta: "Contáctanos",
	},
	en: {
		title: "Health guides and articles",
		subtitle: "Useful information on treatments, prevention and wellbeing.",
		soon: "Coming soon",
		soonBody: "Our medical team is preparing the first articles.",
		ctaTitle: "Have a question now?",
		ctaSubtitle: "Get in touch and a coordinator guides you at no cost.",
		cta: "Contact us",
	},
};

export function BlogPage() {
	const { locale } = useLang();
	const copy = COPY[locale];
	return (
		<>
			<PageHeader eyebrow="Blog" title={copy.title} subtitle={copy.subtitle} />

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto flex max-w-xl flex-col items-center border border-border-default bg-white p-8 text-center shadow-sm sm:p-12">
					<span className="flex h-14 w-14 items-center justify-center bg-primary-50">
						<Newspaper size={26} className="text-primary-600" aria-hidden />
					</span>
					<h2 className="mt-5 font-heading text-2xl font-extrabold text-text-primary">
						{copy.soon}
					</h2>
					<p className="mt-2 text-text-secondary">{copy.soonBody}</p>
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
