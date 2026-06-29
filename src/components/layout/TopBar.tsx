import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "#/siteSettings.js";

export default function TopBar() {
  const { footerPhone, footerEmail, footerHours, footerAddress } =
    useSiteSettings();
  return (
    <div className="hidden bg-primary-700 text-white lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-6">
          {footerPhone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone size={13} /> {footerPhone}
            </span>
          )}
          {footerEmail && (
            <span className="inline-flex items-center gap-1.5">
              <Mail size={13} /> {footerEmail}
            </span>
          )}
          {footerHours && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {footerHours}
            </span>
          )}
        </div>
        {footerAddress && (
          <span className="inline-flex items-center gap-1.5 text-primary-100">
            <MapPin size={13} /> {footerAddress}
          </span>
        )}
      </div>
    </div>
  );
}
