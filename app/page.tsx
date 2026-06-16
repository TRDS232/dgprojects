"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import ContactModal from "@/components/contact-modal"
import ProjectsSection from "@/components/projects-section"
import LanguageSwitcher from "@/components/language-switcher"
import { useSmoothScroll } from "@/hooks/use-lenis"
import { useLanguage } from "@/lib/i18n/context"
import { ArrowRight, Check, ChevronRight, Globe, Search, Shield, BarChart2, Lightbulb, FileSearch, Menu, X } from "lucide-react"

/* ── Icons are visual-only, keyed by service number so they stay paired
     with the translated service content regardless of locale. ── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "01": <Globe className="w-5 h-5" />,
  "02": <Search className="w-5 h-5" />,
  "03": <Shield className="w-5 h-5" />,
  "04": <BarChart2 className="w-5 h-5" />,
  "05": <Lightbulb className="w-5 h-5" />,
  "06": <FileSearch className="w-5 h-5" />,
}

/* ── Helpers ─────────────────────────────────────────────────────── */

function CountUp({ to, duration = 1000 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.round(eased * to))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  return <span ref={ref}>{count}</span>
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function Home() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [openService, setOpenService] = useState<string | null>(null)
  const { scrollTo } = useSmoothScroll()

  /* Scroll tracker */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 40)
        const sections = ["plans", "process", "why", "services", "home"]
        for (const id of sections) {
          const el = document.getElementById(id)
          if (el && y >= el.offsetTop - 120) {
            setActiveSection(id)
            break
          }
        }
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view")
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.10 }
    )
    document.querySelectorAll(".reveal-block").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goto = useCallback(
    (id: string) => {
      scrollTo(id)
      setMenuOpen(false)
    },
    [scrollTo]
  )

  const openContact = useCallback(() => {
    setIsContactOpen(true)
    setMenuOpen(false)
  }, [])

  const navItems = [
    { id: "services", label: t.nav.services },
    { id: "why",      label: t.nav.why      },
    { id: "process",  label: t.nav.process  },
    { id: "plans",    label: t.nav.plans    },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--dg-bg)", color: "var(--dg-text-1)" }}>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ── Fixed hero glow ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(199,42,42,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════
          NAV
      ════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          borderBottom: scrolled ? "1px solid var(--dg-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          background: scrolled ? "rgba(7,7,14,0.85)" : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <button onClick={() => goto("home")} className="flex items-center gap-2.5 group" aria-label={t.nav.home}>
            <Image
              src="/images/2.png"
              alt="DG Projects"
              width={36}
              height={36}
              className="rounded-xl"
              priority
            />
            <span
              className="text-sm font-semibold tracking-wide font-display hidden sm:block transition-colors duration-200"
              style={{ color: "var(--dg-text-1)" }}
            >
              DG Projects
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className="px-4 py-2 rounded-lg text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: activeSection === id ? "var(--dg-text-1)" : "var(--dg-text-2)",
                  background: activeSection === id ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Desktop CTA + language switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={openContact}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--dg-accent)", color: "#fff" }}
            >
              {t.nav.getStarted}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--dg-text-2)" }}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={t.nav.toggleMenu}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="md:hidden mx-4 mb-3 rounded-2xl p-4 animate-fadeIn flex flex-col gap-1"
            style={{ background: "var(--dg-surface)", border: "1px solid var(--dg-border)" }}
          >
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className="text-sm py-2.5 px-4 rounded-xl text-left transition-colors"
                style={{ color: "var(--dg-text-2)" }}
              >
                {label}
              </button>
            ))}
            <div className="flex items-center justify-between mt-1 px-1">
              <LanguageSwitcher />
            </div>
            <button
              onClick={openContact}
              className="mt-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white"
              style={{ background: "var(--dg-accent)" }}
            >
              {t.nav.getStarted}
            </button>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

          {/* Eyebrow */}
          <p
            className="hero-line text-xs tracking-[0.28em] uppercase"
            style={{ animationDelay: "0.1s", color: "var(--dg-accent)" }}
          >
            {t.hero.eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="hero-line font-display font-bold leading-[1.05] tracking-tight"
            style={{
              animationDelay: "0.25s",
              fontSize: "clamp(2.6rem, 7vw, 5.25rem)",
              color: "var(--dg-text-1)",
            }}
          >
            {t.hero.headlinePrefix}<br />
            <span style={{ color: "var(--dg-accent)" }}>{t.hero.headlineAccent}</span>
          </h1>

          {/* Sub */}
          <p
            className="hero-line text-lg sm:text-xl max-w-xl leading-relaxed"
            style={{ animationDelay: "0.4s", color: "var(--dg-text-2)" }}
          >
            {t.hero.subLine1}<br />
            {t.hero.subLine2}
          </p>

          {/* CTAs */}
          <div
            className="hero-line flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.55s" }}
          >
            <button
              onClick={openContact}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--dg-accent)" }}
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goto("projects")}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
              style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                e.currentTarget.style.color = "var(--dg-text-1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--dg-border)"
                e.currentTarget.style.color = "var(--dg-text-2)"
              }}
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Metrics */}
          <div
            className="hero-line flex items-center justify-center gap-10 sm:gap-16"
            style={{ animationDelay: "0.7s" }}
          >
            {t.hero.metrics.map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span
                  className="text-3xl sm:text-4xl font-bold font-display tabular-nums leading-none"
                  style={{ color: "var(--dg-text-1)" }}
                >
                  <CountUp to={value} />
                  <span style={{ color: "var(--dg-accent)" }}>{suffix}</span>
                </span>
                <span className="text-xs tracking-wide" style={{ color: "var(--dg-text-3)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => goto("services")}
          aria-label={t.hero.scroll}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--dg-text-3)" }}>
            {t.hero.scroll}
          </span>
          <span
            className="w-px h-9 scroll-line"
            style={{ background: "linear-gradient(to bottom, var(--dg-accent), transparent)" }}
          />
        </button>
      </section>

      {/* ════════════════════════════════════
          CLIENT MARQUEE
      ════════════════════════════════════ */}
      <div
        className="relative overflow-hidden py-6"
        style={{ borderTop: "1px solid var(--dg-border)", borderBottom: "1px solid var(--dg-border)" }}
      >
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {t.marquee
            .flatMap((label, li) =>
              [0, 1, 2, 3].map((ri) => (
                <span key={`${li}-${ri}`} className="flex items-center gap-3 text-sm" style={{ color: "var(--dg-text-3)" }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: "var(--dg-accent)", opacity: 0.6 }} />
                  {label}
                </span>
              ))
            )}
        </div>
      </div>

      {/* ════════════════════════════════════
          SERVICES
      ════════════════════════════════════ */}
      <section id="services" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-16 reveal-block">
            <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--dg-accent)" }}>
              {t.servicesSection.eyebrow}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                {t.servicesSection.titleLine1}<br className="hidden sm:block" /> {t.servicesSection.titleLine2}
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
                {t.servicesSection.sub}
              </p>
            </div>
          </div>

          {/* Service rows */}
          <div>
            {t.services.map((s, i) => (
              <div
                key={s.num}
                className="service-row reveal-block"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  className="w-full text-left py-7 sm:py-8"
                  onClick={() => setOpenService(openService === s.num ? null : s.num)}
                  aria-expanded={openService === s.num}
                >
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <span
                      className="font-mono text-xs pt-0.5 w-6 flex-shrink-0 tabular-nums select-none"
                      style={{ color: "var(--dg-text-3)" }}
                    >
                      {s.num}
                    </span>

                    {/* Icon */}
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 -mt-0.5"
                      style={{ background: "var(--dg-accent-dim)", color: "var(--dg-accent)" }}
                    >
                      {SERVICE_ICONS[s.num]}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3
                            className="text-base sm:text-lg font-semibold font-display leading-snug"
                            style={{ color: "var(--dg-text-1)" }}
                          >
                            {s.title}
                          </h3>
                          <p
                            className="text-sm mt-0.5"
                            style={{ color: "var(--dg-text-2)" }}
                          >
                            {s.outcome}
                          </p>
                        </div>
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                          style={{
                            color: "var(--dg-text-3)",
                            transform: openService === s.num ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        />
                      </div>

                      {/* Expanded body */}
                      {openService === s.num && (
                        <div className="mt-5 animate-fadeIn">
                          <p
                            className="text-sm leading-relaxed max-w-2xl mb-4"
                            style={{ color: "var(--dg-text-2)" }}
                          >
                            {s.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {s.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-3 py-1 rounded-full"
                                style={{
                                  border: "1px solid var(--dg-border)",
                                  color: "var(--dg-text-3)",
                                  background: "rgba(255,255,255,0.025)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Services CTA */}
          <div className="mt-12 reveal-block">
            <button
              onClick={openContact}
              className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group"
              style={{ color: "var(--dg-accent)" }}
            >
              {t.servicesSection.discuss}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY DG PROJECTS
      ════════════════════════════════════ */}
      <section id="why" className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: statement */}
            <div className="reveal-block">
              <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--dg-accent)" }}>
                {t.whySection.eyebrow}
              </p>
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                {t.whySection.titleLine1}<br className="hidden sm:block" /> {t.whySection.titleLine2}
              </h2>
              <p
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--dg-text-2)" }}
              >
                {t.whySection.body}
              </p>
              <button
                onClick={openContact}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)" }}
              >
                {t.whySection.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: differentiators grid */}
            <div className="rounded-2xl overflow-hidden reveal-block" style={{ transitionDelay: "100ms", background: "var(--dg-border)" }}>
              <div className="grid sm:grid-cols-2 gap-px">
                {t.whyItems.map((item) => (
                  <div
                    key={item.num}
                    className="p-6"
                    style={{ background: "var(--dg-surface)" }}
                  >
                    <span
                      className="font-mono text-xs mb-3 block tabular-nums"
                      style={{ color: "var(--dg-accent)" }}
                    >
                      {item.num}
                    </span>
                    <h3
                      className="text-sm font-semibold font-display mb-2"
                      style={{ color: "var(--dg-text-1)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROCESS
      ════════════════════════════════════ */}
      <section id="process" className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16 reveal-block">
            <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--dg-accent)" }}>
              {t.processSection.eyebrow}
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
            >
              {t.processSection.title}
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--dg-border)" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
              {t.processSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="reveal-block p-6 flex flex-col gap-3"
                  style={{
                    background: "var(--dg-surface)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: "var(--dg-accent)" }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-sm font-semibold font-display"
                    style={{ color: "var(--dg-text-1)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WORK / CASE STUDIES
      ════════════════════════════════════ */}
      <ProjectsSection onContact={openContact} />

      {/* ════════════════════════════════════
          PLANS
      ════════════════════════════════════ */}
      <section id="plans" className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-16 reveal-block">
            <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--dg-accent)" }}>
              {t.plansSection.eyebrow}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                {t.plansSection.titleLine1}<br className="hidden sm:block" /> {t.plansSection.titleLine2}
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
                {t.plansSection.sub}
              </p>
            </div>
          </div>

          {/* ── Audit ── */}
          <div
            className="reveal-block rounded-2xl p-8 sm:p-10 mb-14"
            style={{ background: "var(--dg-surface-2)", border: "1px solid rgba(199,42,42,0.25)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-8">
              <div className="flex items-start gap-5 flex-1">
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--dg-accent-dim)", color: "var(--dg-accent)" }}
                >
                  <FileSearch className="w-6 h-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold font-display" style={{ color: "var(--dg-text-1)" }}>
                      {t.audit.title}
                    </h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide"
                      style={{ background: "var(--dg-accent)", color: "#fff" }}
                    >
                      {t.audit.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-xl mb-4" style={{ color: "var(--dg-text-2)" }}>
                    {t.audit.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.audit.tags.map((tg) => (
                      <span
                        key={tg}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ border: "1px solid rgba(199,42,42,0.2)", color: "var(--dg-text-3)", background: "var(--dg-accent-dim)" }}
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={openContact}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)", color: "#fff" }}
              >
                {t.audit.button}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Group 1: Website Creation ── */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-8 reveal-block">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-0.5" style={{ color: "var(--dg-text-1)" }}>
                  {t.creationGroup.label}
                </p>
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>{t.creationGroup.sub}</p>
              </div>
              <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {t.plansCreation.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`reveal-block rounded-2xl p-7 flex flex-col transition-all duration-200 ${
                    plan.featured ? "plan-card-featured" : ""
                  }`}
                  style={{
                    border: plan.featured ? undefined : "1px solid var(--dg-border)",
                    background: "var(--dg-surface)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.featured) e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.featured) e.currentTarget.style.borderColor = "var(--dg-border)"
                  }}
                >
                  {plan.featured && (
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full self-start mb-4 font-semibold"
                      style={{ background: "var(--dg-accent-dim)", color: "var(--dg-accent)" }}
                    >
                      {t.mostRequested}
                    </span>
                  )}
                  <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--dg-text-3)" }}>
                    {plan.name}
                  </p>
                  <div className="mb-3">
                    <span className="text-3xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm mb-5 leading-relaxed flex-1" style={{ color: "var(--dg-text-2)" }}>
                    {plan.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {plan.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-3)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={openContact}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                    style={
                      plan.featured
                        ? { background: "var(--dg-accent)", color: "#fff" }
                        : { border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }
                    }
                    onMouseEnter={(e) => {
                      if (!plan.featured) {
                        e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                        e.currentTarget.style.color = "var(--dg-text-1)"
                      } else {
                        e.currentTarget.style.opacity = "0.9"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.featured) {
                        e.currentTarget.style.borderColor = "var(--dg-border)"
                        e.currentTarget.style.color = "var(--dg-text-2)"
                      } else {
                        e.currentTarget.style.opacity = "1"
                      }
                    }}
                  >
                    {t.requestQuote}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Group 2: Monthly Maintenance ── */}
          <div>
            <div className="flex items-center gap-4 mb-8 reveal-block">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-0.5" style={{ color: "var(--dg-text-1)" }}>
                  {t.maintenanceGroup.label}
                </p>
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>{t.maintenanceGroup.sub}</p>
              </div>
              <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 items-end">

              {/* Essential */}
              <div
                className="reveal-block plan-card rounded-2xl p-7 flex flex-col"
                style={{ transitionDelay: "0ms" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--dg-text-3)" }}>{t.plansMaintenance[0].name}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>{t.plansMaintenance[0].price}</span>
                  <span className="text-sm ml-1" style={{ color: "var(--dg-text-3)" }}>{t.perMonth}</span>
                </div>
                <p className="text-sm mb-6 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {t.plansMaintenance[0].description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {t.plansMaintenance[0].features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--dg-accent)" }} />
                      <span className="text-sm" style={{ color: "var(--dg-text-2)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openContact}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--dg-border-hover)"; e.currentTarget.style.color = "var(--dg-text-1)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dg-border)"; e.currentTarget.style.color = "var(--dg-text-2)" }}
                >
                  {t.getStartedBtn}
                </button>
              </div>

              {/* Growth — featured */}
              <div
                className="reveal-block plan-card plan-card-featured rounded-2xl p-8 flex flex-col relative"
                style={{ transitionDelay: "80ms" }}
              >
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold whitespace-nowrap"
                  style={{ background: "var(--dg-accent)", color: "#fff" }}
                >
                  {t.mostPopular}
                </span>
                <p className="text-xs tracking-[0.2em] uppercase mb-5 mt-2" style={{ color: "var(--dg-accent)" }}>{t.plansMaintenance[1].name}</p>
                <div className="mb-1">
                  <span className="text-5xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>{t.plansMaintenance[1].price.split(".")[0]}</span>
                  <span className="text-sm ml-1" style={{ color: "var(--dg-text-3)" }}>{t.perMonth}</span>
                </div>
                <p className="text-sm mb-5 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {t.plansMaintenance[1].description}
                </p>
                <div className="w-full h-px mb-5" style={{ background: "rgba(199,42,42,0.2)" }} />
                <ul className="space-y-2.5 flex-1 mb-8">
                  {t.plansMaintenance[1].features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--dg-accent)" }} />
                      <span className="text-sm" style={{ color: "var(--dg-text-2)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openContact}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: "var(--dg-accent)", color: "#fff" }}
                >
                  {t.getStartedBtn}
                </button>
              </div>

              {/* Premium */}
              <div
                className="reveal-block plan-card rounded-2xl p-7 flex flex-col"
                style={{ transitionDelay: "160ms" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--dg-text-3)" }}>{t.plansMaintenance[2].name}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>{t.plansMaintenance[2].price}</span>
                </div>
                <p className="text-sm mb-6 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {t.plansMaintenance[2].description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {t.plansMaintenance[2].features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--dg-accent)" }} />
                      <span className="text-sm" style={{ color: "var(--dg-text-2)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openContact}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--dg-border-hover)"; e.currentTarget.style.color = "var(--dg-text-1)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dg-border)"; e.currentTarget.style.color = "var(--dg-text-2)" }}
                >
                  {t.contactUsBtn}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════ */}
      <section className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="reveal-block relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center"
            style={{ background: "var(--dg-surface)" }}
          >
            {/* Corner accents */}
            <span
              className="absolute top-0 left-0 w-20 h-20 rounded-tl-3xl"
              style={{
                borderTop: "1px solid rgba(199,42,42,0.35)",
                borderLeft: "1px solid rgba(199,42,42,0.35)",
              }}
            />
            <span
              className="absolute bottom-0 right-0 w-20 h-20 rounded-br-3xl"
              style={{
                borderBottom: "1px solid rgba(199,42,42,0.35)",
                borderRight: "1px solid rgba(199,42,42,0.35)",
              }}
            />

            <p className="text-xs tracking-[0.28em] uppercase mb-5" style={{ color: "var(--dg-accent)" }}>
              {t.finalCta.eyebrow}
            </p>
            <h2
              className="font-display font-bold mb-5 max-w-xl mx-auto leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "var(--dg-text-1)" }}
            >
              {t.finalCta.title}
            </h2>
            <p className="text-base mb-10 max-w-sm mx-auto" style={{ color: "var(--dg-text-2)" }}>
              {t.finalCta.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openContact}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)" }}
              >
                {t.finalCta.primary}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:hidalgodanlevy@gmail.com"
                className="flex items-center justify-center px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                  e.currentTarget.style.color = "var(--dg-text-1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--dg-border)"
                  e.currentTarget.style.color = "var(--dg-text-2)"
                }}
              >
                hidalgodanlevy@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer
        className="relative py-12 px-6"
        style={{ borderTop: "1px solid var(--dg-border)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/2.png"
                alt="DG Projects"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <div>
                <p className="text-sm font-semibold font-display" style={{ color: "var(--dg-text-1)" }}>
                  DG Projects
                </p>
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
                  {t.footer.tagline}
                </p>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => goto(id)}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--dg-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-text-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
                >
                  {label}
                </button>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Contact */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:hidalgodanlevy@gmail.com"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--dg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
              >
                hidalgodanlevy@gmail.com
              </a>
            </div>
          </div>

          <div
            className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--dg-border)" }}
          >
            <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>
              © {new Date().getFullYear()} DG Projects. {t.footer.rights}
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/dgprojects_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--dg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-text-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/danlevy-guardado-hidalgo-94a82a342/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--dg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-text-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/PanConPoio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--dg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dg-text-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dg-text-3)")}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
