import { createContext, useContext, useState } from 'react'
import { getLocale, setLocale } from '#/paraglide/runtime.js'

type Locale = 'es' | 'en'

interface LangContextValue {
  locale: Locale
  switchLocale: (locale: Locale) => void
}

const LangContext = createContext<LangContextValue>({
  locale: 'es',
  switchLocale: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>((getLocale() as Locale) ?? 'es')

  function switchLocale(newLocale: Locale) {
    setLocale(newLocale, { reload: false })
    setLocaleState(newLocale)
  }

  return (
    <LangContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
