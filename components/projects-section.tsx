"use client"

import { useRef, useEffect, useCallback } from "react"
<<<<<<< HEAD
import { ArrowUpRight } from "lucide-react"
=======
import { ExternalLink, ArrowUpRight } from "lucide-react"
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265

interface Project {
  href: string
  title: string
  subtitle: string
<<<<<<< HEAD
  sector: string
  description: string
  challenge: string
  result: string
  tags: string[]
  year: string
=======
  description: string
  tags: string[]
  year: string
  featured?: boolean
  accentColor?: string
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
}

const PROJECTS: Project[] = [
  {
    href: "https://www.trslogistica.com/",
    title: "TRS Logística",
<<<<<<< HEAD
    subtitle: "Logistics & Global Trade",
    sector: "Logistics",
    description:
      "International logistics platform for import management from China and Panamá, customs clearance, consolidated cargo, and multimodal transport services targeting entrepreneurs scaling into El Salvador.",
    challenge: "Needed a professional digital presence to compete with established logistics firms and attract new import clients.",
    result: "Modern bilingual website with WhatsApp integration, enabling direct client contact and improving lead generation.",
    tags: ["Web Design", "WhatsApp API", "Responsive", "SEO"],
    year: "2025",
=======
    subtitle: "Logistics & Global Trade Solutions",
    description:
      "International logistics platform handling full import management from China & Panamá, customs clearance, consolidated cargo, multimodal transport, and export services for entrepreneurs scaling into El Salvador.",
    tags: ["Web Design", "WABA API", "Responsive"],
    year: "2024",
    featured: true,
    accentColor: "#A94D4D",
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  },
  {
    href: "https://www.vidental.sv/",
    title: "VIDENTAL SV",
<<<<<<< HEAD
    subtitle: "Advanced Dental Clinic",
    sector: "Healthcare",
    description:
      "Premium dental clinic combining specialist services — endodontics, cosmetic dentistry, 3D imaging — with a medical-tourism experience for international patients seeking bilingual, high-end care in El Salvador.",
    challenge: "Attract both local and international patients while communicating premium service quality and building trust online.",
    result: "Premium website with specialist service pages, appointment flow, and medical-tourism section — significantly improving online patient acquisition.",
    tags: ["Web Design", "WhatsApp API", "Responsive", "SEO"],
    year: "2025",
  },
  {
    href: "https://www.tudentistasv.com/",
    title: "Tu Dentista SV",
    subtitle: "Dental Clinic",
    sector: "Healthcare",
    description:
      "Modern dental clinic website designed to attract local patients and build trust online, with a clear service presentation, contact flow, and a clean professional aesthetic tailored for El Salvador's market.",
    challenge: "Establish a credible online presence from scratch and make it easy for potential patients to find services and get in touch.",
    result: "Clean, conversion-focused website live and ready to generate new patient inquiries from day one.",
    tags: ["Web Design", "Responsive", "SEO", "Bilingual"],
    year: "2026",
  },
]

interface Props {
  onContact?: () => void
}

export default function ProjectsSection({ onContact }: Props) {
  return (
    <section id="projects" className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 reveal-block">
          <div>
            <p
              className="text-xs tracking-[0.28em] uppercase mb-4"
              style={{ color: "var(--dg-accent)" }}
            >
              Client work
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
            >
              Results we've delivered.
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
            Every project starts with a business goal. Here's what we've built and why it worked.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-6">
=======
    subtitle: "Advanced Dental Clinic & Med-Tourism Hub",
    description:
      "Premium dental clinic site combining specialist services—endodontics, cosmetic dentistry, 3D imaging—with a medical-tourism experience for international patients seeking bilingual, high-end care in El Salvador.",
    tags: ["Web Design", "WABA API", "Interactive", "Responsive"],
    year: "2024",
    featured: true,
    accentColor: "#8B3A3A",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen flex items-center justify-center p-4 py-24">
      <div className="relative z-10 w-full max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 reveal-block">
          <div>
            <p className="text-[#A94D4D] text-sm tracking-[0.3em] uppercase mb-3 font-open-sans">SELECTED CLIENT WORK</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-poppins leading-none">
              Client Projects
            </h2>
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-[#8B3A3A] to-transparent sm:mb-3" />
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-8">
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.href} project={project} index={i} />
          ))}
        </div>

<<<<<<< HEAD
        {/* More coming */}
        <div className="mt-14 flex items-center gap-4 reveal-block">
          <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--dg-text-3)" }}>
            More projects in progress
          </p>
          <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
        </div>

        {/* CTA */}
        {onContact && (
          <div className="mt-10 text-center reveal-block">
            <p className="text-sm mb-4" style={{ color: "var(--dg-text-2)" }}>
              Want results like these for your business?
            </p>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--dg-accent)" }}
            >
              Start your project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
=======
        {/* "More coming" strip */}
        <div className="mt-16 flex items-center gap-4 reveal-block">
          <div className="flex-1 h-px bg-white/5" />
          <p className="text-gray-600 text-xs tracking-widest uppercase">More projects in progress</p>
          <div className="flex-1 h-px bg-white/5" />
        </div>
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
      </div>
    </section>
  )
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glareRef = useRef<HTMLSpanElement>(null)

<<<<<<< HEAD
=======
  // 3D tilt on mouse move (desktop only)
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
<<<<<<< HEAD
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -4
    const rotateY = ((x - cx) / cx) * 4
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`
    glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.04), transparent 55%)`
=======

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2

    const rotateX = ((y - cy) / cy) * -6   // max ±6°
    const rotateY = ((x - cx) / cx) *  6

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`

    // Move glare radial to mouse position
    const glareX = (x / rect.width)  * 100
    const glareY = (y / rect.height) * 100
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.07), transparent 60%)`
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
<<<<<<< HEAD
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    glare.style.background = "transparent"
  }, [])

=======
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    glare.style.background = "transparent"
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    // Only attach on non-touch
    if (window.matchMedia("(hover: hover)").matches) {
      card.addEventListener("mousemove",  handleMouseMove  as EventListener)
      card.addEventListener("mouseleave", handleMouseLeave as EventListener)
    }
    return () => {
      card.removeEventListener("mousemove",  handleMouseMove  as EventListener)
      card.removeEventListener("mouseleave", handleMouseLeave as EventListener)
    }
  }, [handleMouseMove, handleMouseLeave])

  // Reveal on scroll
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const observer = new IntersectionObserver(
<<<<<<< HEAD
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view")
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
=======
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in-view"); observer.disconnect() } },
      { threshold: 0.15 }
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

<<<<<<< HEAD
  useEffect(() => {
    const card = cardRef.current
    if (!card || !window.matchMedia("(hover: hover)").matches) return
    card.addEventListener("mousemove", handleMouseMove as EventListener)
    card.addEventListener("mouseleave", handleMouseLeave as EventListener)
    return () => {
      card.removeEventListener("mousemove", handleMouseMove as EventListener)
      card.removeEventListener("mouseleave", handleMouseLeave as EventListener)
    }
  }, [handleMouseMove, handleMouseLeave])

=======
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
  return (
    <div
      ref={rowRef}
      className="reveal-block"
<<<<<<< HEAD
      style={{ transitionDelay: `${index * 100}ms` }}
=======
      style={{ transitionDelay: `${index * 120}ms` }}
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
    >
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
<<<<<<< HEAD
        className="group relative block rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          border: "1px solid var(--dg-border)",
          background: "var(--dg-surface)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--dg-border-hover)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(199,42,42,0.08)"
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--dg-border)"
          ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
        }}
      >
        <span ref={glareRef} className="absolute inset-0 z-10 pointer-events-none rounded-2xl" />

        {/* Hover top line */}
        <span
          className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
          style={{ background: "linear-gradient(90deg, transparent, var(--dg-accent), transparent)" }}
        />

        <div className="p-7 sm:p-10">
          {/* Sector tag + year */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                border: "1px solid var(--dg-border)",
                color: "var(--dg-text-3)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              {project.sector}
            </span>
            <span className="text-xs font-mono tabular-nums" style={{ color: "var(--dg-text-3)" }}>
              {project.year}
            </span>
          </div>

          {/* Title + arrow */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="text-xs tracking-wide uppercase mb-1" style={{ color: "var(--dg-text-3)" }}>
                {project.subtitle}
              </p>
              <h3
                className="text-2xl sm:text-3xl font-bold font-display leading-tight"
                style={{ color: "var(--dg-text-1)" }}
              >
                {project.title}
              </h3>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:scale-110"
              style={{
                border: "1px solid var(--dg-border)",
                color: "var(--dg-text-3)",
              }}
              onMouseEnter={undefined}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-6 max-w-2xl"
            style={{ color: "var(--dg-text-2)" }}
          >
            {project.description}
          </p>

          {/* Challenge + Result */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--dg-border)" }}
            >
              <p className="text-xs tracking-wide uppercase mb-2" style={{ color: "var(--dg-text-3)" }}>
                Challenge
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                {project.challenge}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--dg-accent-dim)",
                border: "1px solid rgba(199,42,42,0.20)",
              }}
            >
              <p className="text-xs tracking-wide uppercase mb-2" style={{ color: "var(--dg-accent)" }}>
                Result
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                {project.result}
              </p>
            </div>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full transition-colors duration-300"
                style={{
                  border: "1px solid var(--dg-border)",
                  color: "var(--dg-text-3)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {tag}
              </span>
            ))}
=======
        className="group relative block rounded-2xl border border-[#8B3A3A]/25 bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#8B3A3A]/60 hover:shadow-[0_0_40px_rgba(139,58,58,0.2)]"
        style={{ transformStyle: "preserve-3d", willChange: "transform", transition: "transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
      >
        {/* Glare overlay */}
        <span ref={glareRef} className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-none" />

        {/* Top accent line */}
        <span
          className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
        />

        <div className="p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-8">
          {/* Number */}
          <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0">
            <span
              className="text-5xl font-bold font-poppins opacity-10 group-hover:opacity-20 transition-opacity duration-500 tabular-nums select-none"
              style={{ color: project.accentColor }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-px h-10 bg-white/10" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[#A94D4D] text-xs tracking-[0.2em] uppercase font-open-sans">{project.subtitle}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-poppins mt-1 leading-tight">
                  {project.title}
                </h3>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#8B3A3A]/40 flex items-center justify-center group-hover:bg-[#8B3A3A] group-hover:border-[#8B3A3A] transition-all duration-300 mt-1">
                <ArrowUpRight className="w-4 h-4 text-[#A94D4D] group-hover:text-white transition-colors duration-300" />
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-base font-open-sans leading-relaxed mb-5 max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-[#8B3A3A]/30 text-[#A94D4D] bg-[#8B3A3A]/5 group-hover:bg-[#8B3A3A]/15 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto text-[10px] text-white/20 font-mono tracking-widest">{project.year}</span>
            </div>
>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
          </div>
        </div>
      </a>
    </div>
  )
}
