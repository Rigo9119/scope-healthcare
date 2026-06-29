import { m } from "#/paraglide/messages.js";
import { useSiteSettings } from "#/siteSettings.js";

/** Builds a WhatsApp click-to-chat URL (wa.me) with a prefilled message. */
function waLink(number: string | undefined, message: string): string {
	const digits = (number ?? "").replace(/\D/g, "");
	return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * The booking flow = a WhatsApp chat with whoever handles appointments. The
 * number is editable in Sanity (siteSettings.whatsappNumber); the prefilled
 * message is locale-aware (Paraglide). `forSpecialty` prefills the procedure
 * the patient tapped, so the agent gets context.
 */
export function useBookingLink() {
	const { whatsappNumber } = useSiteSettings();
	return {
		general: waLink(whatsappNumber, m.whatsapp_cta_message()),
		forSpecialty: (name: string) =>
			waLink(whatsappNumber, m.whatsapp_specialty_message({ specialty: name })),
	};
}
