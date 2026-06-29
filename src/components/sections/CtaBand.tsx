import { Phone, Sparkles } from "lucide-react";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { useBookingLink } from "#/lib/booking.js";
import type { HomePageData } from "#/lib/queries.js";

type CtaBandProps = Pick<
	HomePageData,
	"ctaEyebrow" | "ctaTitle" | "ctaSubtitle" | "ctaPrimaryLabel" | "ctaPhone"
>;

export function CtaBand({
	ctaEyebrow,
	ctaTitle,
	ctaSubtitle,
	ctaPrimaryLabel,
	ctaPhone,
}: CtaBandProps) {
	const booking = useBookingLink();
	return (
		<section id="contacto" className="px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-7xl overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 px-5 py-10 text-center shadow-xl sm:px-8 sm:py-16 lg:px-16">
				<div className="mx-auto max-w-2xl">
					<span className="flex justify-center">
						<span className="mb-5 inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
							<Sparkles size={14} /> {ctaEyebrow}
						</span>
					</span>
					<h2 className="font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-5xl">
						{ctaTitle}
					</h2>
					<p className="mx-auto mt-3 max-w-md text-sm text-primary-50 sm:mt-5 sm:text-base">
						{ctaSubtitle}
					</p>
					<div className="mt-7 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
						<a
							href={booking.general}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex w-full items-center justify-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-btn-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-btn-white-hover active:translate-y-0 active:shadow-md sm:w-auto"
						>
							<WhatsappIcon size={18} /> {ctaPrimaryLabel}
						</a>
						<a
							href={`tel:${ctaPhone?.replace(/\s/g, "")}`}
							className="inline-flex w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_6px_16px_rgba(0,0,0,0.22)] active:translate-y-0 active:shadow-none sm:w-auto"
						>
							<Phone size={16} /> {ctaPhone}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
