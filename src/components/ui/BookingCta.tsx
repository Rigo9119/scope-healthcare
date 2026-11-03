import { Eyebrow } from "#/components/ui/Eyebrow.js";
import { useBookingLink } from "#/lib/booking.js";

/** Reusable booking band for the inner pages (WhatsApp or phone, see useBookingLink). */
export function BookingCta({
	eyebrow,
	title,
	subtitle,
	cta,
}: {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	cta: string;
}) {
	const booking = useBookingLink();
	return (
		<section className="px-4 py-16 sm:px-6 lg:py-20">
			<div className="mx-auto max-w-4xl overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-12 text-center shadow-xl sm:px-12">
				{eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
				<h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
					{title}
				</h2>
				{subtitle && (
					<p className="mx-auto mt-3 max-w-md text-primary-50">{subtitle}</p>
				)}
				<a
					href={booking.link.href}
					target={booking.link.target}
					rel={booking.link.rel}
					className="mt-7 inline-flex items-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50"
				>
					<booking.Icon size={18} /> {cta}
				</a>
			</div>
		</section>
	);
}
