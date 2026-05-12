"use client"

import { useRef, useEffect, useCallback } from "react"
import { ExternalLink, ArrowUpRight } from "lucide-react"

interface Project {
  href: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  year: string
  featured?: boolean
  accentColor?: string
}

const PROJECTS: Project[] = [
  {
    href: "https://www.trslogistica.com/",
    title: "TRS Logística",
    subtitle: "Logistics & Global Trade Solutions",
    description:
      "International logistics platform handling full import management from China & Panamá, customs clearance, consolidated cargo, multimodal transport, and export services for entrepreneurs scaling into El Salvador.",
    tags: ["Web Design", "WABA API", "Responsive"],
    year: "2024",
    featured: true,
    accentColor: "#A94D4D",
  },
  {
    href: "https://www.vidental.sv/",
    title: "VIDENTAL SV",
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
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.href} project={project} index={i} />
          ))}
        </div>

        {/* "More coming" strip */}
        <div className="mt-16 flex items-center gap-4 reveal-block">
          <div className="flex-1 h-px bg-white/5" />
          <p className="text-gray-600 text-xs tracking-widest uppercase">More projects in progress</p>
          <div className="flex-1 h-px bg-white/5" />
        </div>
      </div>
    </section>
  )
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glareRef = useRef<HTMLSpanElement>(null)

  // 3D tilt on mouse move (desktop only)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return

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
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
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
  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in-view"); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      className="reveal-block"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
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
          </div>
        </div>
      </a>
    </div>
  )
}
