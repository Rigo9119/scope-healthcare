import LanguageSwitcherMobile from "./LanguageSwitcherMobile";
import { WhatsappIcon } from "#/components/ui/WhatsappIcon.js";
import { m } from "#/paraglide/messages.js";

export interface MobileMenuProps {
  setOpen: (open: boolean) => void;
  navLinks: { href: string; label: string }[];
  booking: { general: string };
}

export default function MobileMenu({
  setOpen,
  navLinks,
  booking,
}: MobileMenuProps) {
  return (
    <div className="border-t border-border-default bg-white px-6 pb-5 lg:hidden">
      <nav className="flex flex-col gap-1 pt-3">
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
          >
            {label}
          </a>
        ))}
        <a
          href={booking.general}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-3 inline-flex items-center justify-center gap-2 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:bg-primary-600 active:shadow-btn-primary-active"
        >
          <WhatsappIcon size={16} /> {m.nav_book()}
        </a>

        {/* Language switcher mobile */}
        <LanguageSwitcherMobile setOpen={setOpen} />
      </nav>
    </div>
  );
}
