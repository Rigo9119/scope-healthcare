import { useBookingLink } from "#/lib/booking.js";

const TONE = {
	// White outline for the hero blue (bg-hero) and the transparent header over it.
	light: "btn-glass",
	// Blue outline for white surfaces.
	dark: "btn-glass-dark",
} as const;

const SIZE = {
	sm: { cls: "px-5 py-2.5 font-semibold", icon: 16 },
	md: { cls: "px-8 py-3.5 font-bold", icon: 18 },
} as const;

/** The booking CTA (WhatsApp or phone, see useBookingLink): an outlined button
 *  with a frosted-glass hover. Use it for every "Agendar" link. */
export function BookingButton({
	label,
	tone = "light",
	size = "md",
	className = "",
	onClick,
}: {
	label: string;
	tone?: keyof typeof TONE;
	size?: keyof typeof SIZE;
	className?: string;
	onClick?: () => void;
}) {
	const { link, Icon } = useBookingLink();
	const s = SIZE[size];
	return (
		<a
			href={link.href}
			target={link.target}
			rel={link.rel}
			onClick={onClick}
			className={`inline-flex items-center justify-center gap-2 text-sm ${TONE[tone]} ${s.cls} ${className}`}
		>
			<Icon size={s.icon} /> {label}
		</a>
	);
}
