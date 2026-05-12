"use client"

import { useEffect, useRef, useState } from "react"

interface Skill {
  name: string
  level: number   // 0-100
  category: string
}

const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js",  level: 92, category: "Frontend" },
  { name: "TypeScript",       level: 85, category: "Frontend" },
  { name: "Tailwind CSS",     level: 95, category: "Frontend" },
  { name: "HTML / CSS",       level: 97, category: "Frontend" },
  // Backend & Integrations
  { name: "Node.js",          level: 80, category: "Backend" },
  { name: "REST APIs",        level: 88, category: "Backend" },
  { name: "WhatsApp API",     level: 90, category: "Backend" },
  { name: "PostgreSQL",       level: 72, category: "Backend" },
  // Tools
  { name: "Figma / Design",   level: 78, category: "Tools" },
  { name: "Git / GitHub",     level: 88, category: "Tools" },
  { name: "Vercel / Deploy",  level: 85, category: "Tools" },
  { name: "n8n / Make",       level: 82, category: "Tools" },
]

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"]

export default function SkillsSection({ onContact }: { onContact: () => void }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  // Trigger bar animations on first visible scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Re-trigger when category changes
  const handleCategory = (cat: string) => {
    setAnimated(false)
    setActiveCategory(cat)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
  }

  return (
    <section id="skills" className="relative min-h-screen flex items-center justify-center p-4 py-24" ref={sectionRef}>
      <div className="relative z-10 w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16 reveal-block">
          <p className="text-[#A94D4D] text-sm tracking-[0.3em] uppercase mb-3 font-open-sans">What I work with</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-poppins">
            Skills & Stack
          </h2>
          <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-[#8B3A3A] to-transparent mx-auto" />
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm tracking-wider border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#8B3A3A] border-[#8B3A3A] text-white"
                  : "border-[#8B3A3A]/30 text-gray-400 hover:border-[#8B3A3A]/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
          {filtered.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={i}
              animated={animated}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-20 relative overflow-hidden rounded-2xl border border-[#8B3A3A]/30 bg-black/50 backdrop-blur-sm p-8 sm:p-10 text-center reveal-block">
          {/* Decorative corner lines */}
          <span className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#8B3A3A]/60 rounded-tl-2xl" />
          <span className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#8B3A3A]/60 rounded-br-2xl" />

          <p className="text-[#A94D4D] text-xs tracking-[0.25em] uppercase mb-3">Ready to build?</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-4">
            Let's turn your idea into reality
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            From pixel-perfect interfaces to scalable APIs — I bring the full stack to the table.
          </p>
          <button
            onClick={onContact}
            className="group relative px-8 py-3 bg-[#8B3A3A] text-white rounded-full font-semibold hover:bg-[#A94D4D] transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Start a project</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill, index, animated }: { skill: Skill; index: number; animated: boolean }) {
  return (
    <div
      className="skill-row"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm sm:text-base text-gray-200 font-medium font-open-sans">
          {skill.name}
        </span>
        <span className="text-xs text-[#A94D4D] font-mono tabular-nums">
          {skill.level}%
        </span>
      </div>
      {/* Track */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className="h-full rounded-full relative skill-fill"
          style={{
            width: animated ? `${skill.level}%` : "0%",
            transitionDelay: animated ? `${index * 60}ms` : "0ms",
            background: "linear-gradient(90deg, #6b2a2a, #A94D4D)",
          }}
        >
          {/* Shimmer */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skill-shimmer" />
        </div>
      </div>
    </div>
  )
}
