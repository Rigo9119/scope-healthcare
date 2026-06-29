import { useLang } from "#/i18n.js";

export interface LanguageSwitcherMobileProps {
  setOpen: (open: boolean) => void;
}

export default function LanguageSwitcherMobile({
  setOpen,
}: LanguageSwitcherMobileProps) {
  const { locale, switchLocale } = useLang();
  return (
    <div className="mt-3 flex items-center gap-2 border-t border-border-default pt-4">
      <span className="text-xs text-text-muted">Idioma:</span>
      {(["es", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => {
            switchLocale(lang);
            setOpen;
          }}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
            locale === lang
              ? "bg-primary-500 text-white"
              : "text-text-muted hover:text-primary-600"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
