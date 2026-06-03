"use client"

import { useEffect, useRef, useState } from "react"
import { X, ArrowRight } from "lucide-react"
import Image from "next/image"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = "hidden"
    } else {
      setVisible(false)
      document.body.style.overflow = ""
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-end transition-all duration-400"
      style={{
        background: visible ? "rgba(0,0,0,0.55)" : "transparent",
        backdropFilter: visible ? "blur(6px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div
        ref={modalRef}
        className="w-full sm:w-[480px] h-full overflow-y-auto flex flex-col transition-all duration-500"
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
          className="flex items-center justify-between px-8 py-6"
          style={{ borderBottom: "1px solid var(--dg-border)" }}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/images/2.png"
              alt="DG Projects"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <p className="text-sm font-semibold font-display" style={{ color: "var(--dg-text-1)" }}>
                DG Projects
              </p>
              <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
                Digital Growth Agency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:rotate-90"
            style={{
              color: "var(--dg-text-2)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--dg-border)",
            }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-8 flex flex-col gap-8">

          {/* Intro */}
          <div
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s" }}
          >
            <h2
              className="text-2xl font-bold font-display mb-2"
              style={{ color: "var(--dg-text-1)" }}
            >
              Let's talk about your project.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
              Tell us about your business and what you're looking to achieve. We'll get back to you within 24 hours with a plan.
            </p>
          </div>

          {/* Contact options */}
          <div
            className="flex flex-col gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s" }}
          >
            <a
              href="mailto:hidalgodanlevy@gmail.com"
              className="flex items-center justify-between p-5 rounded-xl transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--dg-border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--dg-border-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--dg-border)")}
            >
              <div>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--dg-text-3)" }}>
                  Email us
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--dg-text-1)" }}>
                  hidalgodanlevy@gmail.com
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "var(--dg-text-3)" }}
              />
            </a>

            <a
              href="tel:+50364247347"
              className="flex items-center justify-between p-5 rounded-xl transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--dg-border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--dg-border-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--dg-border)")}
            >
              <div>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--dg-text-3)" }}>
                  Call us
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--dg-text-1)" }}>
                  +503 6424-7347
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "var(--dg-text-3)" }}
              />
            </a>

            <a
              href="https://www.instagram.com/dgprojects_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--dg-border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--dg-border-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--dg-border)")}
            >
              <div>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--dg-text-3)" }}>
                  Instagram
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--dg-text-1)" }}>
                  @dgprojects_
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "var(--dg-text-3)" }}
              />
            </a>
          </div>

          {/* What to expect */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--dg-accent-dim)",
              border: "1px solid rgba(199,42,42,0.20)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--dg-accent)" }}>
              What happens next
            </p>
            <ul className="space-y-2">
              {[
                "We review your business and goals",
                "We prepare a tailored proposal within 24 hours",
                "We schedule a free consultation call",
                "We get to work",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--dg-text-2)" }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold font-display"
                    style={{ background: "var(--dg-accent-dim-2)", color: "var(--dg-accent)" }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-6"
          style={{ borderTop: "1px solid var(--dg-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
            © {new Date().getFullYear()} DG Projects — Digital Growth Agency
          </p>
        </div>
      </div>
    </div>
  )
}
