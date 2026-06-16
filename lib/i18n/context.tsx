"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { translations, type Dictionary, type Locale } from "./translations"

const STORAGE_KEY = "dg-locale"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "es"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "es") return stored
  } catch {
    // localStorage may be unavailable (privacy mode) — fall through to browser detection
  }
  const browserLang = window.navigator.language?.toLowerCase() ?? ""
  return browserLang.startsWith("es") ? "es" : "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to "es" on the server / first paint to match the <html lang="es"> set in layout.tsx,
  // then sync to the user's stored/browser preference once mounted (avoids hydration mismatch).
  const [locale, setLocaleState] = useState<Locale>("es")

  useEffect(() => {
    setLocaleState(detectInitialLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // ignore — non-critical persistence
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(() => setLocaleState((p) => (p === "en" ? "es" : "en")), [])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: translations[locale] }),
    [locale, setLocale, toggleLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
