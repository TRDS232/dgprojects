"use client"

import { useRef, useEffect, useCallback } from "react"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import type { ProjectItem as Project } from "@/lib/i18n/translations"

interface Props {
  onContact?: () => void
}

export default function ProjectsSection({ onContact }: Props) {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative py-28 px-6" style={{ borderTop: "1px solid var(--dg-border)" }}>
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 reveal-block">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--dg-accent)" }}>
              {t.projectsSection.eyebrow}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--dg-text-1)" }}
            >
              {t.projectsSection.title}
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "var(--dg-text-2)", lineHeight: 1.7 }}>
            {t.projectsSection.sub}
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-6">
          {t.projects.map((project, i) => (
            <TiltCard key={project.href} project={project} index={i} />
          ))}
        </div>

        {/* More coming */}
        <div className="mt-14 flex items-center gap-4 reveal-block">
          <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--dg-text-3)" }}>
            {t.projectsSection.moreProjects}
          </p>
          <div className="flex-1 h-px" style={{ background: "var(--dg-border)" }} />
        </div>

        {/* CTA */}
        {onContact && (
          <div className="mt-10 text-center reveal-block">
            <p className="text-sm mb-4" style={{ color: "var(--dg-text-2)" }}>
              {t.projectsSection.ctaText}
            </p>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--dg-accent)" }}
            >
              {t.projectsSection.ctaButton}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function BrowserMock({ project }: { project: Project }) {
  const domain = project.href.replace("https://", "").replace("www.", "").replace(/\/$/, "")
  const accentColor = project.accent ?? "rgba(199,42,42,0.12)"

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden mb-6 group-hover:opacity-95 transition-opacity"
      style={{
        height: "164px",
        background: `linear-gradient(140deg, ${accentColor} 0%, rgba(7,7,14,0.95) 100%)`,
        border: "1px solid var(--dg-border)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="absolute top-0 left-0 right-0 h-7 flex items-center gap-1.5 px-3"
        style={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#ff5f57" }} />
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#febc2e" }} />
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#28c840" }} />
        <div
          className="flex-1 mx-2 h-4 rounded-md flex items-center px-2"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-[9px] truncate font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
            {domain}
          </span>
        </div>
      </div>

      {/* Skeleton content */}
      <div className="absolute inset-0 flex flex-col gap-2.5 px-5 py-4" style={{ paddingTop: "40px" }}>
        {/* Hero skeleton */}
        <div className="flex flex-col gap-1.5">
          <div className="h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.06)", width: "55%" }} />
          <div className="h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", width: "75%" }} />
          <div className="h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.03)", width: "65%" }} />
        </div>
        {/* CTA skeleton */}
        <div className="flex gap-2 mt-1">
          <div
            className="h-5 w-18 rounded-md"
            style={{ background: accentColor, width: "72px", border: "1px solid rgba(255,255,255,0.06)" }}
          />
          <div
            className="h-5 w-14 rounded-md"
            style={{ background: "rgba(255,255,255,0.04)", width: "56px" }}
          />
        </div>
        {/* Card row skeleton */}
        <div className="flex gap-2 mt-auto">
          {[62, 48, 54].map((w, i) => (
            <div
              key={i}
              className="h-12 rounded-lg flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.03)", width: `${w}px`, border: "1px solid rgba(255,255,255,0.04)" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage()
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glareRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -4
    const rotateY = ((x - cx) / cx) * 4
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`
    glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.04), transparent 55%)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    glare.style.background = "transparent"
  }, [])

  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view")
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

  return (
    <div
      ref={rowRef}
      className="reveal-block"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
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
          {/* Browser mock screenshot */}
          <BrowserMock project={project} />

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
              style={{ border: "1px solid var(--dg-border)", color: "var(--dg-text-3)" }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--dg-text-2)" }}>
            {project.description}
          </p>

          {/* Challenge + Result */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--dg-border)" }}
            >
              <p className="text-xs tracking-wide uppercase mb-2" style={{ color: "var(--dg-text-3)" }}>
                {t.projectsSection.challengeLabel}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--dg-text-2)" }}>
                {project.challenge}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "var(--dg-accent-dim)", border: "1px solid rgba(199,42,42,0.20)" }}
            >
              <p className="text-xs tracking-wide uppercase mb-2" style={{ color: "var(--dg-accent)" }}>
                {t.projectsSection.resultLabel}
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
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  border: "1px solid var(--dg-border)",
                  color: "var(--dg-text-3)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}
