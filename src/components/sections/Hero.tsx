import { ChevronRight, Stethoscope } from "lucide-react";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { ImagePlaceholder } from "#/components/ui/ImagePlaceholder.js";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useBookingLink } from "#/lib/booking.js";
import type { HomePageData } from "#/lib/queries.js";

export function Hero({ hero }: { hero: HomePageData["hero"] }) {
	const booking = useBookingLink();
	return (
		<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden sm:min-h-[90vh]">
			{/* Full-bleed background image */}
			<div className="absolute inset-0">
				<ImagePlaceholder icon={Stethoscope} className="h-full w-full" />
			</div>

			{/* Overlay */}
			<div className="pointer-events-none absolute inset-0 bg-primary-900/60" />
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

			{/* Centered copy */}
			<div className="relative mx-auto w-full max-w-2xl px-5 py-12 text-center sm:py-20 lg:px-12">
				<Eyebrow light>{hero.eyebrow}</Eyebrow>
				<h1 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
					{hero.titleStart}
					<br className="hidden sm:block" />{" "}
					<span className="text-primary-200">{hero.titleAccent}</span>
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
					{hero.subtitle}
				</p>

				<div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:justify-center">
					<a
						href={booking.general}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex w-full items-center justify-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-btn-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-btn-white-hover active:translate-y-0 active:shadow-md sm:w-auto"
					>
						<WhatsappIcon size={18} /> {hero.ctaPrimaryLabel}
					</a>
					<a
						href="#especialidades"
						className="inline-flex w-full items-center justify-center gap-2 border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/10 active:translate-y-0 sm:w-auto"
					>
						{hero.ctaSecondaryLabel} <ChevronRight size={16} />
					</a>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
				<div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
					Scroll
				</span>
			</div>
		</section>
	);
}
