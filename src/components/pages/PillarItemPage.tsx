import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { IconComponent } from "#/components/Icon.js";
import { BookingCta } from "#/components/ui/BookingCta.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { PageHeader } from "#/components/ui/PageHeader.js";
import { useLang } from "#/i18n.js";
import { PILLAR_UI, type Pillar, type PillarItem } from "#/lib/pillars.js";

/** Pillar item detail page (wireframe 1.2 / 2.2 / 3.2): a single program with
 *  image + description, an "exclusive experience" block and a booking CTA. */
export function PillarItemPage({
	pillar,
	item,
}: {
	pillar: Pillar;
	item: PillarItem;
}) {
	const { locale } = useLang();
	const ui = PILLAR_UI[locale];

	return (
		<>
			<PageHeader
				eyebrow={pillar.title[locale]}
				title={item.title[locale]}
				subtitle={item.body[locale]}
			/>

			<section className="px-4 py-12 sm:px-6 lg:py-20">
				<div className="mx-auto max-w-6xl">
					<Link
						to="/$lang/$section"
						params={{ lang: locale, section: pillar.slug }}
						className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700"
					>
						<ArrowLeft size={16} />
						<span className="link-animated">
							{ui.backTo(pillar.title[locale])}
						</span>
					</Link>

					<div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
						<ImagePlaceholder className="aspect-[4/3] w-full" />
						<div>
							<Eyebrow>{ui.programTitle}</Eyebrow>
							<h2 className="font-heading text-2xl font-extrabold text-text-primary sm:text-3xl">
								{item.title[locale]}
							</h2>
							<p className="mt-4 leading-relaxed text-text-secondary">
								{item.body[locale]}
							</p>
							<p className="mt-4 leading-relaxed text-text-secondary">
								{ui.programBody}
							</p>
							<span className="mt-6 inline-flex h-12 w-12 items-center justify-center bg-primary-50">
								<IconComponent
									name={item.icon}
									size={24}
									className="text-primary-600"
								/>
							</span>
						</div>
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
