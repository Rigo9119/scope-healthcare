import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import { PILLAR_UI, type Pillar } from "#/lib/pillars.js";

// Placeholder image gradient (matches ui/ImagePlaceholder) so the specialty
// cards read as "photo goes here" until real photography is supplied.
const IMG_GRADIENT =
	"linear-gradient(150deg, #b3e8e8 0%, #4dcaca 55%, #009999 100%)";

/** Pillar index page: hero + grid of specialty cards, each a tall image with the
 *  title overlaid and the description below (wireframe pages 1.1 / 2.1 / 3.1;
 *  reference: Nescory/Nescens "Longevity · Wellbeing · Aesthetics" layout). */
export function PillarPage({ pillar }: { pillar: Pillar }) {
	const { locale } = useLang();
	const ui = PILLAR_UI[locale];

	return (
		<>
			<PageHeader
				eyebrow={pillar.eyebrow[locale]}
				title={pillar.title[locale]}
				subtitle={pillar.tagline[locale]}
			/>

			<section className="px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
						{pillar.items.map((item) => (
							<Link
								key={item.slug}
								to="/$lang/$section/$item"
								params={{
									lang: locale,
									section: pillar.slug,
									item: item.slug,
								}}
								className="group flex flex-col"
							>
								<div className="relative aspect-[3/4] overflow-hidden">
									<div
										className="absolute inset-0"
										style={{ background: IMG_GRADIENT }}
									/>
									<div className="absolute inset-0 bg-primary-900/45 transition-colors duration-300 group-hover:bg-primary-900/30" />
									<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
										<IconComponent
											name={item.icon}
											size={34}
											strokeWidth={1.5}
											className="text-white/85"
										/>
										<h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
											{item.title[locale]}
										</h3>
									</div>
									<span className="absolute right-3 bottom-3 bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
										Imagen
									</span>
								</div>

								<div className="mt-4">
									<p className="text-sm leading-relaxed text-text-secondary">
										{item.body[locale]}
									</p>
									<span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 group-hover:text-primary-700">
										<span className="link-animated">{ui.readMore}</span>
										<ArrowRight
											size={15}
											className="transition-transform duration-200 group-hover:translate-x-1"
										/>
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<BookingCta
				title={ui.bookTitle}
				subtitle={ui.bookSubtitle}
				cta={ui.bookCta}
			/>
		</>
	);
}
