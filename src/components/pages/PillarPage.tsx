import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import { PILLAR_UI, type Pillar } from "#/lib/pillars.js";

/** Pillar index page: hero + grid of item cards (image + description) that link
 *  to each item's detail page. Shared by Scope Clinic, Scope Ageless and
 *  Live by Scope (wireframe pages 1.1 / 2.1 / 3.1). */
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
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{pillar.items.map((item) => (
							<Link
								key={item.slug}
								to="/$lang/$section/$item"
								params={{
									lang: locale,
									section: pillar.slug,
									item: item.slug,
								}}
								className="group flex flex-col border border-border-default bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
							>
								<ImagePlaceholder className="aspect-[16/10] w-full" />
								<div className="flex flex-1 flex-col p-5 sm:p-7">
									<span className="flex h-12 w-12 items-center justify-center bg-primary-50 transition group-hover:bg-primary-500">
										<IconComponent
											name={item.icon}
											size={22}
											className="text-primary-600 transition group-hover:text-white"
										/>
									</span>
									<h3 className="mt-4 font-heading text-lg font-bold text-text-primary sm:mt-5">
										{item.title[locale]}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-text-secondary">
										{item.body[locale]}
									</p>
									<span className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 group-hover:text-primary-700">
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
