import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "#/components/ui/BookingButton.js";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { useLang } from "#/i18n.js";
import type { HomePageData } from "#/lib/queries.js";

export function Hero({ hero }: { hero: HomePageData["hero"] }) {
	const { locale } = useLang();
	return (
		<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero pt-28 sm:min-h-[90vh] lg:pt-36">
			{/* Centered copy */}
			<div className="relative mx-auto w-full max-w-2xl px-5 pb-12 text-center sm:pb-20 lg:px-12 lg:pb-40">
				<Eyebrow light>{hero.eyebrow}</Eyebrow>
				<h1 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
					{hero.titleStart}
					<br className="hidden sm:block" />{" "}
					<span className="text-primary-200">{hero.titleAccent}</span>
				</h1>
				{hero.subtitle && (
					<p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
						{hero.subtitle}
					</p>
				)}
				<div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
					<BookingButton
						label={hero.ctaPrimaryLabel}
						className="w-full sm:w-auto"
					/>
					<Link
						to="/$lang/$section/"
						params={{ lang: locale, section: "scope-clinic" }}
						className="inline-flex w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 active:translate-y-0 sm:w-auto"
					>
						{hero.ctaSecondaryLabel} <ArrowRight size={16} />
					</Link>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
				{/* Faint track with a light pulse travelling down it on a loop. */}
				<div className="relative h-10 w-px overflow-hidden bg-white/15">
					<span className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent to-white motion-safe:animate-scroll-cue motion-reduce:translate-y-1/2" />
				</div>
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
					Scroll
				</span>
			</div>
		</section>
	);
}
