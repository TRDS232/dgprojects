"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import MouseSpotlight from "@/components/mouse-spotlight"
import ContactModal from "@/components/contact-modal"
import ProjectsSection from "@/components/projects-section"
import { useSmoothScroll } from "@/hooks/use-lenis"
import { ArrowRight, Check, ChevronRight, Globe, Search, Shield, BarChart2, Lightbulb, FileSearch, Menu, X } from "lucide-react"

/* ── Data ──────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    num: "01",
    icon: <Globe className="w-5 h-5" />,
    title: "Web Design & Development",
    outcome: "A website that works as hard as you do.",
    description:
      "We build modern, fast, conversion-focused websites that turn visitors into customers. Every project starts with your business goals, not a template.",
    tags: ["Corporate websites", "Landing pages", "E-commerce", "Custom web apps"],
  },
  {
    num: "02",
    icon: <Search className="w-5 h-5" />,
    title: "SEO & Search Visibility",
    outcome: "Get found by customers actively searching for your services.",
    description:
      "We implement technical and on-page SEO so your business ranks on Google. More visibility means more qualified traffic — and more sales.",
    tags: ["Technical SEO", "Keyword research", "Google Search Console", "Core Web Vitals"],
  },
  {
    num: "03",
    icon: <Shield className="w-5 h-5" />,
    title: "Website Maintenance & Growth",
    outcome: "Your website, always up-to-date and performing.",
    description:
      "We handle monthly updates, security monitoring, performance optimization, and content changes so you can focus on running your business.",
    tags: ["Monthly updates", "Security monitoring", "Performance reports", "Content changes"],
  },
  {
    num: "04",
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Digital Presence Management",
    outcome: "Dominate your local market online.",
    description:
      "We optimize your Google Business Profile, ensure brand consistency across all platforms, and continuously improve your online presence to generate more leads.",
    tags: ["Google Business", "Local SEO", "UX audits", "Lead generation"],
  },
  {
    num: "05",
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Branding & Digital Strategy",
    outcome: "A clear roadmap for your digital future.",
    description:
      "Not sure where to start? We help you define your positioning, build a digital strategy, and create a growth roadmap that makes every investment count.",
    tags: ["Digital consulting", "Brand positioning", "Website strategy", "Growth roadmap"],
  },
  {
    num: "06",
    icon: <FileSearch className="w-5 h-5" />,
    title: "Website Audit",
    outcome: "Find out exactly what's holding your website back.",
    description:
      "We perform a full technical and strategic review of your existing website: SEO health, page speed, Google rankings, user experience, and conversion barriers. You get a clear, prioritized action plan.",
    tags: ["Technical SEO audit", "Core Web Vitals", "Google ranking review", "UX analysis", "Competitor benchmarking"],
  },
]

const WHY_ITEMS = [
  {
    num: "01",
    title: "Fast delivery",
    body: "Most websites go live in 2–4 weeks. We don't keep you waiting while your competitors gain ground.",
  },
  {
    num: "02",
    title: "SEO-first approach",
    body: "Every website we build is optimized for search engines from day one — not as an afterthought.",
  },
  {
    num: "03",
    title: "Modern technology",
    body: "We build with Next.js and performance-first practices. Your site will load fast and rank better.",
  },
  {
    num: "04",
    title: "Business-oriented results",
    body: "We speak your language: more customers, more sales, more growth. No technical jargon.",
  },
  {
    num: "05",
    title: "Ongoing support",
    body: "We don't disappear after launch. Every client gets continued support and regular optimization.",
  },
  {
    num: "06",
    title: "Transparent process",
    body: "You always know what we're working on, what's next, and why. No surprises, no hidden costs.",
  },
]

const PROCESS_STEPS = [
  { num: "01", title: "Discovery", body: "We learn your business, your customers, and your goals." },
  { num: "02", title: "Strategy", body: "We plan the site architecture and SEO foundation." },
  { num: "03", title: "Design", body: "We craft the visual identity and user experience." },
  { num: "04", title: "Development", body: "We build with modern, fast, accessible technology." },
  { num: "05", title: "Launch", body: "We deploy with thorough testing and performance checks." },
  { num: "06", title: "Growth", body: "We monitor, optimize, and help your site keep growing." },
]

const PLANS_CREATION = [
  {
    name: "Landing Page",
    price: "$150",
    description: "One professional page to establish your online presence and capture leads.",
    tags: ["1-page responsive design", "Basic SEO setup", "WhatsApp / contact button", "Delivery in ~1 week"],
  },
  {
    name: "Business Website",
    price: "From $350",
    description: "Full multi-page corporate site, built to rank on Google and turn visitors into customers.",
    tags: ["Up to 6 pages", "Full on-page SEO", "Google Analytics & Search Console", "Delivery in 2–3 weeks"],
    featured: true,
  },
  {
    name: "Custom Project",
    price: "Contact us",
    description: "E-commerce, web applications, or complex projects with advanced features.",
    tags: ["E-commerce / web app", "API integrations", "Advanced SEO strategy", "Post-launch support"],
  },
]

const PLANS_MAINTENANCE = [
  {
    name: "Essential",
    price: "$49.99",
    description: "Keep your website healthy, secure, and always up to date.",
    features: [
      "Monthly content updates",
      "Security monitoring",
      "Uptime monitoring",
      "Monthly performance report",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$99.99",
    description: "Everything in Essential, plus active SEO work to keep climbing Google every month.",
    features: [
      "Everything in Essential",
      "Monthly SEO improvements",
      "Google Search Console management",
      "Monthly analytics report",
      "Minor design updates",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: "Custom",
    description: "Full ongoing partnership — strategy, design, SEO, and continuous optimization.",
    features: [
      "Everything in Growth",
      "Monthly strategy session",
      "Continuous UX optimization",
      "Content creation support",
      "Conversion rate improvements",
      "Dedicated account manager",
    ],
  },
]

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
    { id: "services", label: "Services" },
    { id: "why",      label: "Why us"  },
    { id: "process",  label: "Process" },
    { id: "plans",    label: "Plans"   },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--dg-bg)", color: "var(--dg-text-1)" }}>
      <MouseSpotlight />
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
          <button onClick={() => goto("home")} className="flex items-center gap-2.5 group" aria-label="DG Projects home">
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

          {/* Desktop CTA */}
          <button
            onClick={openContact}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "var(--dg-accent)", color: "#fff" }}
          >
            Get started
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--dg-text-2)" }}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
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
            <button
              onClick={openContact}
              className="mt-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white"
              style={{ background: "var(--dg-accent)" }}
            >
              Get started
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
            Digital Growth Agency
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
            We build websites that<br />
            <span style={{ color: "var(--dg-accent)" }}>generate real results.</span>
          </h1>

          {/* Sub */}
          <p
            className="hero-line text-lg sm:text-xl max-w-xl leading-relaxed"
            style={{ animationDelay: "0.4s", color: "var(--dg-text-2)" }}
          >
            More visibility. More leads. More sales.<br />
            Full-service digital agency for businesses serious about growing online.
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
              Start your project
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
              View our work
            </button>
          </div>

          {/* Metrics */}
          <div
            className="hero-line flex items-center justify-center gap-10 sm:gap-16"
            style={{ animationDelay: "0.7s" }}
          >
            {[
              { value: 4, suffix: "+", label: "Web Projects"  },
              { value: 3, suffix: "+", label: "Landing Pages" },
              { value: 2, suffix: "",  label: "Countries"     },
            ].map(({ value, suffix, label }) => (
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
          aria-label="Scroll to services"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--dg-text-3)" }}>
            Scroll
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
          {(["Web Design & Development","SEO & Search Visibility","Website Maintenance","Digital Presence Management","Branding & Strategy"] as const)
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
              What we do
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                Services built<br className="hidden sm:block" /> for business growth.
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
                Every service is designed to directly impact your visibility, leads, and revenue.
              </p>
            </div>
          </div>

          {/* Service rows */}
          <div>
            {SERVICES.map((s, i) => (
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
                      {s.icon}
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
              Discuss your project
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
                Why DG Projects
              </p>
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                We treat your business<br className="hidden sm:block" /> like our own.
              </h2>
              <p
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--dg-text-2)" }}
              >
                Most agencies build your website and disappear. We build a long-term partnership, continuously improving your online presence and helping your business grow month after month.
              </p>
              <button
                onClick={openContact}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)" }}
              >
                Book a free consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: differentiators grid */}
            <div className="rounded-2xl overflow-hidden reveal-block" style={{ transitionDelay: "100ms", background: "var(--dg-border)" }}>
              <div className="grid sm:grid-cols-2 gap-px">
                {WHY_ITEMS.map((item) => (
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
              How we work
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
            >
              From first call to lasting growth.
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--dg-border)" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
              {PROCESS_STEPS.map((step, i) => (
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
              Plans & packages
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
              >
                Transparent pricing,<br className="hidden sm:block" /> real results.
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
                Whether you need a new website or ongoing support for an existing one, there's a plan for you.
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
                      Website Audit
                    </h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide"
                      style={{ background: "var(--dg-accent)", color: "#fff" }}
                    >
                      $125 · One-time
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-xl mb-4" style={{ color: "var(--dg-text-2)" }}>
                    Already have a website but not seeing results? We do a full technical and strategic review — SEO health, page speed, Google rankings, user experience, and competitor benchmarking — and deliver a clear, prioritized action plan.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Technical SEO", "Core Web Vitals", "Google ranking review", "UX analysis", "Detailed report"].map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ border: "1px solid rgba(199,42,42,0.2)", color: "var(--dg-text-3)", background: "var(--dg-accent-dim)" }}
                      >
                        {t}
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
                Request audit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Group 1: Website Creation ── */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-8 reveal-block">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-0.5" style={{ color: "var(--dg-text-1)" }}>
                  Website Creation
                </p>
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>One-time project — get your website built and launched</p>
              </div>
              <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {PLANS_CREATION.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`reveal-block rounded-2xl p-7 flex flex-col transition-all duration-200 ${
                    (plan as typeof plan & { featured?: boolean }).featured ? "plan-card-featured" : ""
                  }`}
                  style={{
                    border: (plan as typeof plan & { featured?: boolean }).featured
                      ? undefined
                      : "1px solid var(--dg-border)",
                    background: "var(--dg-surface)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                  onMouseEnter={(e) => {
                    if (!(plan as typeof plan & { featured?: boolean }).featured)
                      e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                  }}
                  onMouseLeave={(e) => {
                    if (!(plan as typeof plan & { featured?: boolean }).featured)
                      e.currentTarget.style.borderColor = "var(--dg-border)"
                  }}
                >
                  {(plan as typeof plan & { featured?: boolean }).featured && (
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full self-start mb-4 font-semibold"
                      style={{ background: "var(--dg-accent-dim)", color: "var(--dg-accent)" }}
                    >
                      Most requested
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
                      (plan as typeof plan & { featured?: boolean }).featured
                        ? { background: "var(--dg-accent)", color: "#fff" }
                        : { border: "1px solid var(--dg-border)", color: "var(--dg-text-2)" }
                    }
                    onMouseEnter={(e) => {
                      if (!(plan as typeof plan & { featured?: boolean }).featured) {
                        e.currentTarget.style.borderColor = "var(--dg-border-hover)"
                        e.currentTarget.style.color = "var(--dg-text-1)"
                      } else {
                        e.currentTarget.style.opacity = "0.9"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(plan as typeof plan & { featured?: boolean }).featured) {
                        e.currentTarget.style.borderColor = "var(--dg-border)"
                        e.currentTarget.style.color = "var(--dg-text-2)"
                      } else {
                        e.currentTarget.style.opacity = "1"
                      }
                    }}
                  >
                    Request quote
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
                  Monthly Maintenance
                </p>
                <p className="text-xs" style={{ color: "var(--dg-text-3)" }}>Ongoing support to keep your site growing after launch</p>
              </div>
              <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 items-end">

              {/* Essential */}
              <div
                className="reveal-block plan-card rounded-2xl p-7 flex flex-col"
                style={{ transitionDelay: "0ms" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--dg-text-3)" }}>Essential</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>$49</span>
                  <span className="text-sm ml-1" style={{ color: "var(--dg-text-3)" }}>/month</span>
                </div>
                <p className="text-sm mb-6 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {PLANS_MAINTENANCE[0].description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {PLANS_MAINTENANCE[0].features.map((f) => (
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
                  Get started
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
                  Most popular
                </span>
                <p className="text-xs tracking-[0.2em] uppercase mb-5 mt-2" style={{ color: "var(--dg-accent)" }}>Growth</p>
                <div className="mb-1">
                  <span className="text-5xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>$99</span>
                  <span className="text-sm ml-1" style={{ color: "var(--dg-text-3)" }}>/month</span>
                </div>
                <p className="text-sm mb-5 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {PLANS_MAINTENANCE[1].description}
                </p>
                <div className="w-full h-px mb-5" style={{ background: "rgba(199,42,42,0.2)" }} />
                <ul className="space-y-2.5 flex-1 mb-8">
                  {PLANS_MAINTENANCE[1].features.map((f) => (
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
                  Get started
                </button>
              </div>

              {/* Premium */}
              <div
                className="reveal-block plan-card rounded-2xl p-7 flex flex-col"
                style={{ transitionDelay: "160ms" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--dg-text-3)" }}>Premium</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold font-display" style={{ color: "var(--dg-text-1)" }}>Custom</span>
                </div>
                <p className="text-sm mb-6 mt-2 leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                  {PLANS_MAINTENANCE[2].description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {PLANS_MAINTENANCE[2].features.map((f) => (
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
                  Contact us
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
              Ready to grow?
            </p>
            <h2
              className="font-display font-bold mb-5 max-w-xl mx-auto leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "var(--dg-text-1)" }}
            >
              Let's build your digital presence together.
            </h2>
            <p className="text-base mb-10 max-w-sm mx-auto" style={{ color: "var(--dg-text-2)" }}>
              Tell us about your business and we'll put together a plan to help you grow online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openContact}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--dg-accent)" }}
              >
                Book a free consultation
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
                  Digital Growth Agency
                </p>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
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
              © {new Date().getFullYear()} DG Projects. All rights reserved.
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
