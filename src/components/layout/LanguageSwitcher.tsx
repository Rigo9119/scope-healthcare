import { useLang } from "#/i18n.js";

export default function LanguageSwitcher() {
  const { locale, switchLocale } = useLang();

  return (
    <div className="flex items-center gap-0.5">
      {(["es", "en"] as const).map((lang, i) => (
        <>
          {i > 0 && (
            <span
              key={`sep-${lang}-${i}`}
              className="text-xs text-border-default"
            >
              |
            </span>
          )}
          <button
            key={`sel-${lang}-${i}`}
            type="button"
            onClick={() => switchLocale(lang)}
            className={`px-2 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
              locale === lang
                ? "text-primary-600"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {lang}
          </button>
        </>
      ))}
    </div>
  );
}
