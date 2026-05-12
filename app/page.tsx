"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import GalaxyCanvas from "@/components/galaxy-canvas"
import MouseSpotlight from "@/components/mouse-spotlight"
import ContactModal from "@/components/contact-modal"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import { useSmoothScroll } from "@/hooks/use-lenis"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()

  // Throttled scroll tracker
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const vh = window.innerHeight
        if      (y < vh * 0.5)  setActiveSection("home")
        else if (y < vh * 1.5)  setActiveSection("about")
        else if (y < vh * 2.5)  setActiveSection("projects")
        else if (y < vh * 3.5)  setActiveSection("skills")
        else                    setActiveSection("services")
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-reveal: observe all .reveal-block elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll(".reveal-block").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goto = useCallback((id: string) => {
    scrollTo(id)
    setMenuOpen(false)
  }, [scrollTo])

  const openContact = useCallback(() => {
    setIsContactModalOpen(true)
    setMenuOpen(false)
  }, [])

  const navItems = [
    { id: "home",     label: "Home"        },
    { id: "about",    label: "About"       },
    { id: "projects", label: "Work"    },
    { id: "skills",   label: "Skills"      },
    { id: "services", label: "Services"    },
  ]

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <MouseSpotlight />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* ─── Fixed canvas background ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <GalaxyCanvas withConstellations={false} />
      </div>

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 mt-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/5"
        >
          <Image src="/images/2.png" alt="DG Projects" width={52} height={52} className="rounded-2xl" priority />

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className={`px-4 py-2 rounded-xl text-sm tracking-wide transition-all duration-200 ${
                  activeSection === id
                    ? "bg-[#8B3A3A]/30 text-white border border-[#8B3A3A]/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={openContact}
            className="hidden md:block px-5 py-2 bg-[#8B3A3A] text-white rounded-xl text-sm tracking-wide hover:bg-[#A94D4D] transition-colors"
          >
            Contact
          </button>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/5 flex flex-col gap-1 p-3 animate-fadeIn">
            {navItems.map(({ id, label }) => (
              <button key={id} onClick={() => goto(id)} className="text-sm text-gray-300 hover:text-white py-2 px-4 rounded-xl hover:bg-white/5 text-left transition-colors">
                {label}
              </button>
            ))}
            <button onClick={openContact} className="mt-1 px-5 py-2 bg-[#8B3A3A] text-white rounded-xl text-sm tracking-wide">
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative z-10 text-center flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#8B3A3A]/10 blur-2xl animate-pulse" style={{ animationDuration: "4s" }} />
            <Image
              src="/images/4.png"
              alt="DG Projects"
              width={200}
              height={260}
              className="relative rounded-3xl w-28 sm:w-36 md:w-44 h-auto"
              priority
            />
          </div>

          <div className="space-y-3">
            <p className="text-[#A94D4D] text-sm tracking-[0.35em] uppercase font-open-sans hero-line" style={{ animationDelay: "0.3s" }}>
              Software Developer
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-poppins text-white hero-line" style={{ animationDelay: "0.5s" }}>
              DG Projects
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto font-open-sans hero-line" style={{ animationDelay: "0.7s" }}>
              Building modern, fast & visually striking web experiences for businesses that want to stand out.
            </p>
          </div>

          <div className="flex gap-4 hero-line" style={{ animationDelay: "0.9s" }}>
            <button
              onClick={() => goto("projects")}
              className="px-6 py-3 bg-[#8B3A3A] text-white rounded-xl text-sm tracking-wide hover:bg-[#A94D4D] transition-all duration-300 hover:scale-105"
            >
              View my work
            </button>
            <button
              onClick={openContact}
              className="px-6 py-3 border border-[#8B3A3A]/50 text-gray-300 rounded-xl text-sm tracking-wide hover:border-[#8B3A3A] hover:text-white transition-all duration-300"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => goto("about")}
          aria-label="Scroll down"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#8B3A3A] to-transparent scroll-line" />
        </button>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="relative min-h-screen flex items-center justify-center p-4 py-24">
        <div className="relative z-10 max-w-5xl w-full">

          <div className="text-center mb-16 reveal-block">
            <p className="text-[#A94D4D] text-sm tracking-[0.3em] uppercase mb-3 font-open-sans">Who I am</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-poppins">About Me</h2>
            <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-[#8B3A3A] to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left: profile + socials */}
            <div className="md:col-span-2 flex flex-col items-center gap-6 reveal-block">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#8B3A3A]/30 to-transparent blur-xl" />
                <Image
                  src="/images/2.png"
                  alt="DG Projects Logo"
                  width={220}
                  height={220}
                  className="relative rounded-3xl w-40 sm:w-52 h-auto border border-[#8B3A3A]/20"
                />
              </div>
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/PanConPoio",      icon: <GithubIcon />,   label: "GitHub"   },
                  { href: "https://www.linkedin.com/in/danlevy-guardado-hidalgo-94a82a342/", icon: <LinkedinIcon />, label: "LinkedIn" },
                  { href: "mailto:hidalgodanlevy@gmail.com",    icon: <MailIcon />,     label: "Email"    },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-[#8B3A3A]/30 flex items-center justify-center text-[#A94D4D] hover:bg-[#8B3A3A]/20 hover:border-[#8B3A3A]/60 transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: text blocks */}
            <div className="md:col-span-3 space-y-6">
              {[
                {
                  title: "Creative Vision",
                  text: "Passionate software developer focused on creating modern, efficient, and visually appealing web solutions. I turn ideas into functional digital experiences that help businesses grow and connect with their audiences through technology.",
                  delay: "0ms",
                },
                {
                  title: "Design Philosophy",
                  text: "Every project is more than just code—it's a solution to real-world needs. I believe in developing secure, scalable, and user-centered applications that combine clean design with powerful functionality, ensuring long-term value for every client.",
                  delay: "100ms",
                },
                {
                  title: "My Approach",
                  text: "I listen, plan, and build with precision. From custom websites to automated systems and API integrations, I work closely with each client to deliver reliable, seamless, and smart digital tools that make operations more efficient and impactful.",
                  delay: "200ms",
                },
              ].map(({ title, text, delay }) => (
                <div
                  key={title}
                  className="reveal-block group relative bg-black/40 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-[#8B3A3A]/40 transition-all duration-500"
                  style={{ transitionDelay: delay }}
                >
                  <span className="absolute top-0 left-6 w-8 h-px bg-[#8B3A3A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-base font-bold mb-2 text-white font-poppins">{title}</h3>
                  <p className="text-sm text-gray-400 font-open-sans leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects (premium component) ─── */}
      <ProjectsSection />

      {/* ─── Skills ─── */}
      <SkillsSection onContact={openContact} />

      {/* ─── Services ─── */}
      <section id="services" className="relative min-h-screen flex items-center justify-center p-4 py-24">
        <div className="relative z-10 w-full max-w-5xl">

          <div className="text-center mb-16 reveal-block">
            <p className="text-[#A94D4D] text-sm tracking-[0.3em] uppercase mb-3 font-open-sans">What I offer</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-poppins">My Services</h2>
            <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-[#8B3A3A] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Web Design",
                badge: "Specialty",
                description: "Modern, high-performance, visually striking websites built to elevate your brand and convert visitors into clients. Every pixel intentional.",
                items: ["Fully responsive", "UX-centered approach", "SEO-friendly structure", "Performance optimized"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4m0 0l1 8M4 12l4 4m0 0l-1 8" />,
              },
              {
                num: "02",
                title: "Automations",
                badge: null,
                description: "Smart workflows that reduce manual work, save time, and scale operations — from n8n pipelines to custom bots and schedulers.",
                items: ["Automated workflows", "Data sync pipelines", "WhatsApp bots", "Smart reporting"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              },
              {
                num: "03",
                title: "API Integrations",
                badge: null,
                description: "Seamless connections between your platforms: payment gateways, CRMs, messaging APIs, third-party services — done right.",
                items: ["Third-party APIs", "Data synchronization", "Auth & security", "Custom connectors"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
              },
            ].map(({ num, title, badge, description, items, icon }, i) => (
              <div
                key={num}
                className="reveal-block group relative bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-[#8B3A3A]/40 transition-all duration-500 p-7 overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Top glow on hover */}
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B3A3A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#8B3A3A]/15 flex items-center justify-center border border-[#8B3A3A]/20 group-hover:bg-[#8B3A3A]/25 transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#A94D4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                  </div>
                  <span className="text-4xl font-bold text-white/5 font-poppins tabular-nums select-none group-hover:text-white/8 transition-colors">{num}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white font-poppins">{title}</h3>
                  {badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B3A3A]/20 text-[#A94D4D] border border-[#8B3A3A]/30 tracking-wide">
                      {badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-400 font-open-sans leading-relaxed mb-6">{description}</p>

                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-[#8B3A3A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 reveal-block relative overflow-hidden rounded-2xl border border-[#8B3A3A]/25 bg-black/60 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B3A3A]/5 to-transparent pointer-events-none" />
            <span className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#8B3A3A]/40 rounded-tl-2xl" />
            <span className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#8B3A3A]/40 rounded-br-2xl" />
            <p className="text-[#A94D4D] text-xs tracking-[0.25em] uppercase mb-3">Let's collaborate</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-4">Ready to start your project?</h3>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              Custom-built solutions tailored to your brand. Request a quote and let's figure out the best approach together.
            </p>
            <button
              onClick={openContact}
              className="px-8 py-3 bg-[#8B3A3A] text-white rounded-xl font-semibold hover:bg-[#A94D4D] transition-all duration-300 hover:scale-105"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative bg-black/80 py-10 px-4 text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Image src="/images/4.png" alt="DG Projects" width={52} height={52} className="rounded-2xl mx-auto mb-4" />
          <p className="text-white/30 text-xs tracking-widest uppercase mb-6">
            © {new Date().getFullYear()} DG Projects — All rights reserved
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <a href="mailto:hidalgodanlevy@gmail.com" className="flex items-center gap-2 text-[#A94D4D]/70 hover:text-[#A94D4D] transition-colors text-sm">
              <Mail className="w-4 h-4" /> hidalgodanlevy@gmail.com
            </a>
            <a href="https://github.com/PanConPoio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A94D4D]/70 hover:text-[#A94D4D] transition-colors text-sm">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/danlevy-guardado-hidalgo-94a82a342/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A94D4D]/70 hover:text-[#A94D4D] transition-colors text-sm">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

// ─── Inline icon components (avoid extra imports) ─────────────────────────
function GithubIcon()   { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> }
function LinkedinIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> }
function MailIcon()     { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> }
