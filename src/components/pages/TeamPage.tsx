import { useSuspenseQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import type { Locale } from "#/lib/localizedRoutes.js";
import { PILLARS } from "#/lib/pillars.js";
import { teamQueryOptions } from "#/lib/queries.js";
import { TEAM_SERVICES, type TeamMember, teamFallback } from "#/lib/team.js";

const COPY: Record<
	Locale,
	{
		eyebrow: string;
		title: string;
		subtitle: string;
		ctaTitle: string;
		ctaSubtitle: string;
		cta: string;
	}
> = {
	es: {
		eyebrow: "Nuestro equipo",
		title: "Especialistas en quienes confiar",
		subtitle:
			"Un equipo médico interconectado, con criterio especializado y trato humano en cada consulta.",
		ctaTitle: "¿Quieres una segunda opinión?",
		ctaSubtitle: "Habla directamente con nuestro equipo.",
		cta: "Contáctanos",
	},
	en: {
		eyebrow: "Our team",
		title: "Specialists you can trust",
		subtitle:
			"An interconnected medical team, with specialist judgment and a human touch at every visit.",
		ctaTitle: "Want a second opinion?",
		ctaSubtitle: "Talk to our team directly.",
		cta: "Contact us",
	},
};

function serviceTitle(slug: string, locale: Locale): string {
	for (const pillar of PILLARS) {
		const item = pillar.items.find((i) => i.slug === slug);
		if (item) return item.title[locale];
	}
	return slug;
}

export function TeamPage() {
	const { locale } = useLang();
	const { data } = useSuspenseQuery(teamQueryOptions(locale));
	const team = data ?? teamFallback(locale);
	const copy = COPY[locale];

	const groups = TEAM_SERVICES.map((service) => ({
		service,
		members: team.filter((m) => m.service === service),
	})).filter((g) => g.members.length > 0);

	return (
		<>
			<PageHeader
				eyebrow={copy.eyebrow}
				title={copy.title}
				subtitle={copy.subtitle}
			/>

			<section className="px-4 py-16 sm:px-6 lg:py-24">
				<div className="mx-auto max-w-7xl space-y-16 lg:space-y-20">
					{groups.map(({ service, members }) => (
						<div key={service}>
							<h2 className="border-l-4 border-primary-500 pl-4 font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
								{serviceTitle(service, locale)}
							</h2>
							<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
								{members.map((member) => (
									<MemberCard key={member.name} member={member} />
								))}
							</div>
						</div>
					))}
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

function MemberCard({ member }: { member: TeamMember }) {
	return (
		<div className="flex flex-col overflow-hidden border border-border-default bg-white shadow-sm">
			{member.photo ? (
				<img
					src={photoUrl(member)}
					alt={member.name}
					loading="lazy"
					className="aspect-square w-full object-cover"
				/>
			) : (
				<ImagePlaceholder icon={UserRound} className="aspect-square w-full" />
			)}
			<div className="flex-1 p-5">
				<h3 className="font-heading text-base font-bold text-text-primary">
					{member.name}
				</h3>
				<p className="mt-1 text-sm text-primary-600">{member.role}</p>
				{member.credentials?.length ? (
					<ul className="mt-3 space-y-1 border-t border-border-default pt-3 text-xs leading-relaxed text-text-secondary">
						{member.credentials.map((c) => (
							<li key={c}>{c}</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	);
}

/** Square crop centred on the hotspot the editor set in the Studio. */
function photoUrl({ photo, hotspot }: TeamMember) {
	const focus = hotspot
		? `&crop=focalpoint&fp-x=${hotspot.x}&fp-y=${hotspot.y}`
		: "";
	return `${photo}?w=600&h=600&fit=crop${focus}&auto=format`;
}
