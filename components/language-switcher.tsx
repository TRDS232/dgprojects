"use client"

import { useLanguage } from "@/lib/i18n/context"

interface Props {
  className?: string
}

// Compact EN / ES toggle. Reused in the desktop nav, mobile drawer, and footer.
export default function LanguageSwitcher({ className = "" }: Props) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={`flex items-center rounded-lg p-0.5 text-xs font-semibold tracking-wide ${className}`}
      style={{ border: "1px solid var(--dg-border)", background: "rgba(255,255,255,0.03)" }}
      role="group"
      aria-label="Language switcher"
    >
      {(["es", "en"] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => setLocale(lng)}
          className="px-2.5 py-1 rounded-md transition-colors duration-200"
          style={{
            color: locale === lng ? "#fff" : "var(--dg-text-3)",
            background: locale === lng ? "var(--dg-accent)" : "transparent",
          }}
          aria-pressed={locale === lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
