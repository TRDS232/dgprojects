"use client"

import { useEffect, useRef, useState } from "react"
import { X, Send, Check, ChevronDown, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/lib/i18n/context"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage()
  const modalRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = "hidden"
    } else {
      setVisible(false)
      document.body.style.overflow = ""
      setTimeout(() => {
        setSent(false)
        setForm({ name: "", email: "", service: "", message: "" })
        setErrors({})
        setSendError("")
      }, 500)
    }

    const handlePointerDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("pointerdown", handlePointerDown)
      document.addEventListener("keydown", handleKey)
    }
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = t.contact.errorRequired
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t.contact.errorEmail
    if (!form.service) e.service = t.contact.errorService
    if (form.message.trim().length < 10) e.message = t.contact.errorMessage
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    // Fallback: if EmailJS isn't configured, keep the previous mailto behavior.
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`[DG Projects] ${form.service} — ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`
      )
      window.open(`mailto:hidalgodanlevy@gmail.com?subject=${subject}&body=${body}`)
      setSent(true)
      return
    }

    setSending(true)
    setSendError("")
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service,
          message: form.message,
          to_email: "jeremyguardado8@gmail.com",
        },
        { publicKey }
      )
      setSent(true)
    } catch (err) {
      console.error("EmailJS send failed:", err)
      setSendError(t.contact.sendError)
    } finally {
      setSending(false)
    }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const fieldStyle = (field: string) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "var(--dg-accent)" : "var(--dg-border)"}`,
    color: "var(--dg-text-1)",
  })

  const onFocus = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "var(--dg-border-hover)"
  }
  const onBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = errors[field] ? "var(--dg-accent)" : "var(--dg-border)"
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-end"
      style={{
        background: visible ? "rgba(0,0,0,0.55)" : "transparent",
        backdropFilter: visible ? "blur(6px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div
        ref={modalRef}
        className="w-full sm:w-[480px] h-full overflow-y-auto flex flex-col"
        style={{
          background: "var(--dg-surface)",
          borderLeft: "1px solid var(--dg-border)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--dg-border)" }}
        >
          <div className="flex items-center gap-3">
            <Image src="/images/2.png" alt="DG Projects" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-sm font-semibold font-display" style={{ color: "var(--dg-text-1)" }}>
                DG Projects
              </p>
              <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
                {t.contact.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:rotate-90"
            style={{ color: "var(--dg-text-2)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--dg-border)" }}
            aria-label={t.contact.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-8">
          {sent ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "var(--dg-accent-dim)", border: "1px solid rgba(199,42,42,0.3)" }}
              >
                <Check className="w-8 h-8" style={{ color: "var(--dg-accent)" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display mb-3" style={{ color: "var(--dg-text-1)" }}>
                  {t.contact.successTitle}
                </h2>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--dg-text-2)" }}>
                  {t.contact.successBody}{" "}
                  <a
                    href="mailto:hidalgodanlevy@gmail.com"
                    className="underline"
                    style={{ color: "var(--dg-accent)" }}
                  >
                    hidalgodanlevy@gmail.com
                  </a>
                </p>
              </div>
              <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
                {t.contact.successNote}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)", color: "#fff" }}
              >
                {t.contact.closeBtn}
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
              }}
            >
              {/* Intro */}
              <div>
                <h2 className="text-2xl font-bold font-display mb-2" style={{ color: "var(--dg-text-1)" }}>
                  {t.contact.intro}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {t.contact.introBody}
                </p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide" style={{ color: "var(--dg-text-3)" }}>
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  onFocus={onFocus("name")}
                  onBlur={onBlur("name")}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                  style={fieldStyle("name")}
                />
                {errors.name && (
                  <span className="text-xs" style={{ color: "var(--dg-accent)" }}>{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide" style={{ color: "var(--dg-text-3)" }}>
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  onFocus={onFocus("email")}
                  onBlur={onBlur("email")}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                  style={fieldStyle("email")}
                />
                {errors.email && (
                  <span className="text-xs" style={{ color: "var(--dg-accent)" }}>{errors.email}</span>
                )}
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide" style={{ color: "var(--dg-text-3)" }}>
                  {t.contact.serviceLabel}
                </label>
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={set("service")}
                    onFocus={onFocus("service")}
                    onBlur={onBlur("service")}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    style={{
                      ...fieldStyle("service"),
                      color: form.service ? "var(--dg-text-1)" : "var(--dg-text-3)",
                    }}
                  >
                    <option value="" disabled>{t.contact.servicePlaceholder}</option>
                    {t.contact.services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "var(--dg-text-3)" }}
                  />
                </div>
                {errors.service && (
                  <span className="text-xs" style={{ color: "var(--dg-accent)" }}>{errors.service}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide" style={{ color: "var(--dg-text-3)" }}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  onFocus={onFocus("message")}
                  onBlur={onBlur("message")}
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 resize-none"
                  style={fieldStyle("message")}
                />
                {errors.message && (
                  <span className="text-xs" style={{ color: "var(--dg-accent)" }}>{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              {sendError && (
                <p className="text-xs -mt-2" style={{ color: "var(--dg-accent)" }}>{sendError}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--dg-accent)", color: "#fff" }}
              >
                {sending ? (
                  <>
                    {t.contact.sending}
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Secondary */}
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid var(--dg-border)" }}
              >
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
                  {t.contact.or}
                </p>
                <a
                  href="https://www.instagram.com/dgprojects_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 transition-colors duration-200"
                  style={{ color: "var(--dg-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-text-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
                >
                  @dgprojects_
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 flex-shrink-0" style={{ borderTop: "1px solid var(--dg-border)" }}>
          <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
            © {new Date().getFullYear()} {t.contact.brand} — {t.contact.rights}
          </p>
        </div>
      </div>
    </div>
  )
}
