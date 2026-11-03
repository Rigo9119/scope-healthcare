import { Phone } from "lucide-react";
import type { ComponentType } from "react";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { m } from "#/paraglide/messages.js";
import { useSiteSettings } from "#/siteSettings.js";

/**
 * The booking CTA. With a WhatsApp number in Sanity (siteSettings.whatsappNumber)
 * it opens a chat with a locale-aware prefilled message; without one it calls
 * the clinic phone. Spread `link` on the <a> and render `Icon` next to the label,
 * so labels stay channel-neutral ("Agendar consulta").
 */
export function useBookingLink(): {
	channel: "whatsapp" | "phone";
	link: { href: string; target?: string; rel?: string };
	Icon: ComponentType<{ size?: number }>;
} {
	const { whatsappNumber, footerPhone } = useSiteSettings();
	const digits = whatsappNumber.replace(/\D/g, "");
	if (digits) {
		return {
			channel: "whatsapp",
			link: {
				href: `https://wa.me/${digits}?text=${encodeURIComponent(m.whatsapp_cta_message())}`,
				target: "_blank",
				rel: "noopener noreferrer",
			},
			Icon: WhatsappIcon,
		};
	}
	return {
		channel: "phone",
		link: { href: `tel:${footerPhone.replace(/[^\d+]/g, "")}` },
		Icon: Phone,
	};
}
