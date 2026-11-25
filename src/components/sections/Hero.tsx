import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { useLang } from "#/i18n.js";
import { useBookingLink } from "#/lib/booking.js";
import type { HomePageData } from "#/lib/queries.js";

export function Hero({ hero }: { hero: HomePageData["hero"] }) {
	const { locale } = useLang();
	const booking = useBookingLink();
	return (
		<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-linear-to-b from-primary-50 to-bg-page pt-28 sm:min-h-[90vh] lg:pt-36">
			{/* Centered copy */}
			<div className="relative mx-auto w-full max-w-2xl px-5 pb-12 text-center sm:pb-20 lg:px-12 lg:pb-40">
				<Eyebrow>{hero.eyebrow}</Eyebrow>
				<h1 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-7xl">
					{hero.titleStart}
					<br className="hidden sm:block" />{" "}
					<span className="text-primary-500">{hero.titleAccent}</span>
				</h1>
				{hero.subtitle && (
					<p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
						{hero.subtitle}
					</p>
				)}
				<div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
					<a
						href={booking.link.href}
						target={booking.link.target}
						rel={booking.link.rel}
						className="inline-flex w-full items-center justify-center gap-2 bg-primary-500 px-8 py-3.5 text-sm font-bold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-btn-primary-active sm:w-auto"
					>
						<booking.Icon size={18} /> {hero.ctaPrimaryLabel}
					</a>
					<Link
						to="/$lang/$section/"
						params={{ lang: locale, section: "scope-clinic" }}
						className="inline-flex w-full items-center justify-center gap-2 border border-primary-500 px-7 py-3.5 text-sm font-semibold text-primary-600 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50 active:translate-y-0 sm:w-auto"
					>
						{hero.ctaSecondaryLabel} <ArrowRight size={16} />
					</Link>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
				{/* Faint track with a light pulse travelling down it on a loop. */}
				<div className="relative h-10 w-px overflow-hidden bg-primary-900/10">
					<span className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent to-primary-500 motion-safe:animate-scroll-cue motion-reduce:translate-y-1/2" />
				</div>
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
					Scroll
				</span>
			</div>
		</section>
	);
}
