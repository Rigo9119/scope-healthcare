import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "#/i18n.js";
import { PILLAR_ORDER, PILLAR_UI, pillarByKey } from "#/lib/pillars.js";

/** Home-page entry cards for the brand pillars (wireframe page 1): each card
 *  links to that pillar's index page. Built from the shared pillar registry. */
export function Pillars() {
	const { locale } = useLang();
	const ui = PILLAR_UI[locale];
	const pillars = PILLAR_ORDER.map(pillarByKey);

	return (
		<section className="px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-6 md:grid-cols-3">
					{pillars.map((pillar) => (
						<Link
							key={pillar.key}
							to="/$lang/$section"
							params={{ lang: locale, section: pillar.slug }}
							className="group flex flex-col border border-border-default bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card sm:p-9"
						>
							<h3 className="font-heading text-xl font-extrabold text-primary-600 sm:text-2xl">
								{pillar.navLabel}
							</h3>
							<p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
								{pillar.tagline[locale]}
							</p>
							<span className="mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 group-hover:text-primary-700">
								<span className="link-animated">{ui.readMore}</span>
								<ArrowRight
									size={15}
									className="transition-transform duration-200 group-hover:translate-x-1"
								/>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
