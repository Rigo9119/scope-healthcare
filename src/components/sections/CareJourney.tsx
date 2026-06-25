import { IconComponent } from "#/components/Icon.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import type { HomePageData } from "#/lib/queries.js";

type CareJourneyProps = Pick<
	HomePageData,
	"processEyebrow" | "processTitle" | "journey"
>;

export function CareJourney({
	processEyebrow,
	processTitle,
	journey,
}: CareJourneyProps) {
	return (
		<section
			id="proceso"
			className="bg-primary-50/60 px-4 py-12 sm:px-6 sm:py-20 lg:py-28"
		>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
					<div className="flex justify-center">
						<Eyebrow>{processEyebrow}</Eyebrow>
					</div>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl lg:text-4xl">
						{processTitle}
					</h2>
				</div>

				<div className="grid gap-8 pt-5 md:grid-cols-2 md:gap-6 md:pt-0 lg:grid-cols-4">
					{journey?.map(({ icon, title, body }, i) => (
						<div key={title} className="relative bg-white p-5 shadow-sm sm:p-7">
							<span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center bg-primary-600 font-heading text-sm font-bold text-white shadow-md">
								{i + 1}
							</span>
							<span className="mt-3 flex h-12 w-12 items-center justify-center bg-primary-50">
								<IconComponent
									name={icon}
									size={24}
									className="text-primary-600"
								/>
							</span>
							<h3 className="mt-4 font-heading text-base font-bold text-text-primary">
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
	);
}
