import { HeartPulse, ShieldCheck } from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import type { HomePageData } from "#/lib/queries.js";

type WhyUsProps = Pick<
	HomePageData,
	"whyUsEyebrow" | "whyUsTitle" | "whyUsSubtitle" | "whyUsBadgeText" | "reasons"
>;

export function WhyUs({
	whyUsEyebrow,
	whyUsTitle,
	whyUsSubtitle,
	whyUsBadgeText,
	reasons,
}: WhyUsProps) {
	return (
		<section className="px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
			<div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
				<div className="relative order-2 pb-7 lg:order-1 lg:pb-0">
					<ImagePlaceholder
						icon={HeartPulse}
						className="aspect-[5/4] w-full shadow-[0_30px_60px_-20px_rgba(16,89,181,0.3)]"
					/>
					<div className="absolute -bottom-5 left-6 right-6 flex items-center justify-between bg-white px-5 py-4 shadow-lg">
						<div className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center bg-primary-50">
								<ShieldCheck size={18} className="text-primary-600" />
							</span>
							<span className="text-sm font-semibold text-text-primary">
								{whyUsBadgeText}
							</span>
						</div>
						<span className="font-heading text-lg font-extrabold text-primary-600">
							100%
						</span>
					</div>
				</div>

				<div className="order-1 lg:order-2">
					<Eyebrow>{whyUsEyebrow}</Eyebrow>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl lg:text-4xl">
						{whyUsTitle}
					</h2>
					<p className="mt-4 text-text-secondary">{whyUsSubtitle}</p>

					<div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
						{reasons?.map(({ icon, title, body }) => (
							<div key={title} className="flex gap-4">
								<span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50">
									<IconComponent
										name={icon}
										size={22}
										className="text-primary-600"
									/>
								</span>
								<div>
									<h3 className="font-heading text-base font-bold text-text-primary">
										{title}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-text-secondary">
										{body}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
