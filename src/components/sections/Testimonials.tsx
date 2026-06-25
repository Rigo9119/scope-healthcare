import { Quote } from "lucide-react";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { Stars } from "#/components/ui/Stars.js";
import type { HomePageData } from "#/lib/queries.js";

const AVATAR_COLORS = ["#80d9d9", "#4dcaca", "#26bebe", "#009999", "#006666"];

type TestimonialsProps = Pick<
	HomePageData,
	"testimonialsEyebrow" | "testimonialsTitle" | "testimonials"
>;

export function Testimonials({
	testimonialsEyebrow,
	testimonialsTitle,
	testimonials,
}: TestimonialsProps) {
	return (
		<section
			id="testimonios"
			className="bg-primary-50/60 px-4 py-12 sm:px-6 sm:py-20 lg:py-28"
		>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
					<div className="flex justify-center">
						<Eyebrow>{testimonialsEyebrow}</Eyebrow>
					</div>
					<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl lg:text-4xl">
						{testimonialsTitle}
					</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{testimonials?.map((t, i) => (
						<figure
							key={t.name}
							className="flex flex-col bg-white p-5 shadow-sm sm:p-7"
						>
							<Quote
								size={32}
								className="text-primary-200"
								fill="currentColor"
							/>
							<blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
								{t.text}
							</blockquote>
							<div className="mt-5">
								<Stars count={t.rating} />
							</div>
							<figcaption className="mt-5 flex items-center gap-3 border-t border-border-default pt-5">
								<span
									className="flex h-11 w-11 items-center justify-center font-heading text-sm font-bold text-white"
									style={{
										backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
									}}
								>
									{t.name
										.split(" ")
										.map((w: string) => w[0])
										.join("")}
								</span>
								<span>
									<span className="block text-sm font-bold text-text-primary">
										{t.name}
									</span>
									<span className="block text-xs text-text-muted">
										{t.detail}
									</span>
								</span>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
