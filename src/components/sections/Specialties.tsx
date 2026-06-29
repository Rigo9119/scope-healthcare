import { ArrowRight } from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { useBookingLink } from "#/lib/booking.js";
import type { HomePageData } from "#/lib/queries.js";

type SpecialtiesProps = Pick<
	HomePageData,
	| "specialtiesEyebrow"
	| "specialtiesTitle"
	| "specialtiesSubtitle"
	| "specialtiesLinkLabel"
	| "specialties"
>;

export function Specialties({
	specialtiesEyebrow,
	specialtiesTitle,
	specialtiesSubtitle,
	specialtiesLinkLabel,
	specialties,
}: SpecialtiesProps) {
	const booking = useBookingLink();
	return (
		<section
			id="especialidades"
			className="px-4 py-12 sm:px-6 sm:py-20 lg:py-28"
		>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
					<div className="flex justify-center">
						<Eyebrow>{specialtiesEyebrow}</Eyebrow>
					</div>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl lg:text-4xl">
						{specialtiesTitle}
					</h2>
					<p className="mt-4 text-text-secondary">{specialtiesSubtitle}</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{specialties?.map(({ icon, title, body }) => (
						<div
							key={title}
							className="group border border-border-default bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card sm:p-7"
						>
							<span className="flex h-12 w-12 items-center justify-center bg-primary-50 transition group-hover:bg-primary-500 sm:h-14 sm:w-14">
								<IconComponent
									name={icon}
									size={22}
									className="text-primary-600 transition group-hover:text-white sm:size-[26px]"
								/>
							</span>
							<h3 className="mt-4 font-heading text-lg font-bold text-text-primary sm:mt-5">
								{title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-text-secondary">
								{body}
							</p>
							<a
								href={booking.forSpecialty(title)}
								target="_blank"
								rel="noopener noreferrer"
								className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700"
							>
								<span className="link-animated">{specialtiesLinkLabel}</span>
								<ArrowRight
									size={15}
									className="transition-transform duration-200 group-hover/link:translate-x-1"
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
