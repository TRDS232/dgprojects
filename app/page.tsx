"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import GalaxyCanvas from "@/components/galaxy-canvas"
import MouseSpotlight from "@/components/mouse-spotlight"
import ContactModal from "@/components/contact-modal"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("home")
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection("about")
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection("projects")
      } else if (scrollPosition < windowHeight * 3.5) {
        setActiveSection("services")
      } else {
        setActiveSection("portfolio")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  const handleProjectHover = (projectType: string | null) => {
    setActiveProject(projectType)
  }

const handleContactClick = () => {
  setIsContactModalOpen(true)
  setMenuOpen(false) // ← Cierra el menú móvil cuando abres el modal
}


  return (
    <main className="min-h-screen bg-black text-white">
      <MouseSpotlight />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => {
          setIsContactModalOpen(false)
          setMenuOpen(false) // ← Por si estaba abierto
        }} 
      />
        <nav className="fixed top-0 left-0 w-full bg-black/60 z-50 backdrop-blur-md border-b border-[#8B3A3A]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Image
            src="/images/2.png"
            alt="NAJ Design Logo"
            width={60}
            height={60}
            className="rounded-3xl"
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`px-4 py-2 rounded-full text-sm tracking-wider ${
                activeSection === "home"
                  ? "bg-[#8B3A3A]/20 border border-[#8B3A3A]/50"
                  : "hover:bg-[#8B3A3A]/10"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className={`px-4 py-2 rounded-full text-sm tracking-wider ${
                activeSection === "about"
                  ? "bg-[#8B3A3A]/20 border border-[#8B3A3A]/50"
                  : "hover:bg-[#8B3A3A]/10"
              }`}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className={`px-4 py-2 rounded-full text-sm tracking-wider ${
                activeSection === "projects"
                  ? "bg-[#8B3A3A]/20 border border-[#8B3A3A]/50"
                  : "hover:bg-[#8B3A3A]/10"
              }`}
            >
              My Projects
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className={`px-4 py-2 rounded-full text-sm tracking-wider ${
                activeSection === "services"
                  ? "bg-[#8B3A3A]/20 border border-[#8B3A3A]/50"
                  : "hover:bg-[#8B3A3A]/10"
              }`}
            >
              My Services
            </button>

            <button
              onClick={handleContactClick}
              className="px-5 py-2 bg-[#8B3A3A] text-white rounded-full text-sm tracking-wider hover:bg-[#A94D4D] transition transform hover:-translate-y-0.5"
            >
              Contact
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-black/80 border-t border-[#8B3A3A]/30 animate-fadeIn">
            <button onClick={() => scrollToSection("home")} className="text-sm text-white tracking-wider">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm text-white tracking-wider">
              About
            </button>
            <button onClick={() => scrollToSection("projects")} className="text-sm text-white tracking-wider">
              My Projects
            </button>
            <button onClick={() => scrollToSection("services")} className="text-sm text-white tracking-wider">
              My Services
            </button>

            <button
              onClick={handleContactClick}
              className="px-5 py-2 bg-[#8B3A3A] text-white rounded-full text-sm tracking-wider"
            >
              Contact
            </button>
          </div>
        )}
      </nav>


      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <GalaxyCanvas id="homeCanvas" withConstellations={true} />
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-8A sm:mb-6">
            <Image
              src="/images/4.png"
              alt="JSGH LOGO"
              width={200}
              height={260}
              className="animate-pulse rounded-3xl w-24 sm:w-32 md:w-40 h-auto"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-poppins animate-title">
          </h1>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-10 h-10 border-r-2 border-b-2 border-[#A94D4D] rotate-45 animate-bounce opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        />
      </section>

      {/* About Me Section */}
      <section id="about" ref={aboutRef} className="relative min-h-screen flex items-center justify-center p-4 py-20">
        <GalaxyCanvas id="aboutCanvas" withConstellations={true} />
        <div className="relative z-10 max-w-4xl text-center w-full">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 text-white font-poppins animate-title">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#8B3A3A]/30 shadow-glow">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-200 font-poppins">Creative Vision</h3>
                <p className="text-sm sm:text-base text-gray-100 font-open-sans">
                  Passionate software developer focused on creating modern, efficient, and visually appealing web solutions. I turn ideas into functional digital experiences that help businesses grow and connect with their audiences through technology.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#8B3A3A]/30 shadow-glow">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-200 font-poppins">Design Philosophy</h3>
                <p className="text-sm sm:text-base text-gray-100 font-open-sans">
                  Every project is more than just code—it's a solution to real-world needs. I believe in developing secure, scalable, and user-centered applications that combine clean design with powerful functionality, ensuring long-term value for every client.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B3A3A]/30 to-[#A94D4D]/20 rounded-full blur-xl"></div>
                <Image
                  src="/images/2.png"
                  alt="NAJ Design Logo"
                  width={200}
                  height={120}
                  className="relative z-10 animate-pulse rounded-3xl w-32 sm:w-40 md:w-48 h-auto"
                  style={{ animationDuration: "4s" }}
                />
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#8B3A3A]/30 shadow-glow">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-200 font-poppins">My Approach</h3>
                <p className="text-sm sm:text-base text-gray-100 font-open-sans text-center">
            I listen, plan, and build with precision. From custom websites to automated systems and API integrations, I work closely with each client to deliver reliable, seamless, and smart digital tools that make their operations more efficient and impactful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen flex items-center justify-center p-4 py-20">
        <GalaxyCanvas id="projectsCanvas" />
        <div className="relative z-10 w-full max-w-5xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 text-white font-poppins animate-title text-center">
              My work          
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Client Project 1 */}
            <a
              href="https://www.trslogistica.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#8B3A3A]/30 shadow-glow hover:shadow-xl hover:border-[#8B3A3A]/60 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-200 font-poppins mb-2">
                    TRS Logística
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A94D4D] font-semibold">Logistics & Global Trade Solutions</p>
                </div>
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-[#A94D4D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-sm sm:text-base text-gray-300 font-open-sans mb-4">
                This company specializes in international logistics and global trade operations. They provide services such as full import management (especially from China and Panamá) including customs clearance, consolidated cargo (from 1 CBM), multimodal transport (air, sea, land), and export services.
                They position themselves as a “trusted partner in global trade” for entrepreneurs looking to scale via imports into El Salvador.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">Web Desing</span>
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">WABA API FUNCTION</span>
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">RESPONSIVE</span>
              </div>
            </a>

            {/* Client Project 2 */}
            <a
              href="https://www.vidental.sv/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#8B3A3A]/30 shadow-glow hover:shadow-xl hover:border-[#8B3A3A]/60 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-200 font-poppins mb-2">
                    VIDENTAL SV
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A94D4D] font-semibold">Advanced Dental Clinic & Med-Tourism Hub</p>
                </div>
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-[#A94D4D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-sm sm:text-base text-gray-300 font-open-sans mb-4">
               VIDENTAL is a modern dental clinic in El Salvador that combines specialist services (endodontics, maxillofacial surgery, cosmetic dentistry) with high-tech equipment—3D imaging, digital labs, laser treatments, sedación consciente. 

              It also serves as a medical-tourism destination: a significant portion of their patients come from abroad, and they emphasize bilingual service and a premium care experience.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">Web Desing</span>
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">WABA API FUNCTION</span>
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">Interactive</span>
                <span className="px-3 py-1 text-xs bg-[#8B3A3A]/20 text-[#A94D4D] rounded-full">RESPONSIVE</span>
              </div>
            </a>
          </div>
        </div>
      </section>

     <section id="services" className="relative min-h-screen flex items-center justify-center p-4 py-20">
  <GalaxyCanvas id="servicesCanvas" />
  <div className="relative z-10 w-full max-w-5xl">
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 text-white font-poppins animate-title text-center">
      My Services
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {/* Web Design Service — MAIN SERVICE */}
      <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#8B3A3A]/30 shadow-glow hover:shadow-xl hover:border-[#8B3A3A]/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#8B3A3A]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#8B3A3A]/30 transition-colors">
          <svg className="w-6 h-6 text-[#A94D4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4m0 0l1 8M4 12l4 4m0 0l-1 8"
            />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-200 font-poppins">Web Design (My Specialty)</h3>
        <p className="text-sm sm:text-base text-gray-300 font-open-sans mb-6">
          Web design is the heart of my work. I build modern, high-performance, visually striking websites designed
          to elevate your brand and turn visitors into clients. Each website is fully tailored to your goals,
          audience, and business identity.
        </p>
        <ul className="text-xs sm:text-sm text-gray-400 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Fully responsive design
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            UX-centered approach
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            SEO-friendly structure
          </li>
        </ul>
      </div>

      {/* Automation Service */}
      <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#8B3A3A]/30 shadow-glow hover:shadow-xl hover:border-[#8B3A3A]/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#8B3A3A]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#8B3A3A]/30 transition-colors">
          <svg className="w-6 h-6 text-[#A94D4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-200 font-poppins">Business Automations</h3>
        <p className="text-sm sm:text-base text-gray-300 font-open-sans mb-6">
          Optimize your operations with smart automations that reduce manual work, save time, and improve efficiency.
        </p>
        <ul className="text-xs sm:text-sm text-gray-400 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Automated workflows
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Data integration
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Smart reporting
          </li>
        </ul>
      </div>

      {/* API Integration Service */}
      <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#8B3A3A]/30 shadow-glow hover:shadow-xl hover:border-[#8B3A3A]/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#8B3A3A]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#8B3A3A]/30 transition-colors">
          <svg className="w-6 h-6 text-[#A94D4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-200 font-poppins">API Integrations</h3>
        <p className="text-sm sm:text-base text-gray-300 font-open-sans mb-6">
          Connect your systems with reliable and secure API integrations to extend functionality and improve workflow automation.
        </p>
        <ul className="text-xs sm:text-sm text-gray-400 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Third-party API integration
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Data synchronization
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A94D4D] rounded-full"></span>
            Custom connections
          </li>
        </ul>
      </div>
    </div>

    {/* Website Packages Section (replaces logos) */}
    <div className="mt-12 sm:mt-16 bg-black/70 p-6 sm:p-10 rounded-xl shadow-glow text-center border border-[#8B3A3A]/30">
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-200 font-poppins">Website Packages</h3>
      <div className="w-16 h-1 bg-[#8B3A3A] mx-auto my-4"></div>
      <p className="text-sm sm:text-base text-gray-300 mb-6">
        Custom websites designed to match your brand and goals. Request a quote and I’ll help you choose the ideal solution for your business.
      </p>
      <button
        onClick={handleContactClick}
        className="px-6 sm:px-8 py-2 sm:py-3 bg-[#8B3A3A] text-white rounded-lg font-bold hover:bg-[#A94D4D] transition-all duration-300 hover:scale-105 transform text-sm sm:text-base"
      >
        Request a Quote
      </button>
    </div>
  </div>
</section>


      <footer className="relative bg-black/80 py-8 sm:py-12 px-4 text-center border-t border-[#8B3A3A]/30">
        <div className="container mx-auto">
          <div className="mb-6 sm:mb-8">
            <Image
              src="/images/4.png"
              alt="NAJ Design Logo"
              width={60}
              height={36}
              className="mb-4 rounded-3xl mx-auto"
            />
            <p className="text-white/70 text-sm sm:text-base">
              © {new Date().getFullYear()} DG PROJECTS. All rights reserved.
            </p>
          </div>

          {/* Contact Links */}
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-400 text-xs sm:text-sm mb-4">Get in touch</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 flex-wrap">
              <a
                href="mailto:hidalgodanlevy@gmail.com"
                className="flex items-center gap-2 text-[#A94D4D] hover:text-[#8B3A3A] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                hidalgodanlevy@gmail.com
              </a>
              <a
                href="https://github.com/PanConPoio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A94D4D] hover:text-[#8B3A3A] transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/danlevy-guardado-hidalgo-94a82a342/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A94D4D] hover:text-[#8B3A3A] transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

interface ProjectHalfProps {
  title: string
  description: string
  imagePath: string
  imageAlt: string
  projectType: "enso" | "creative" | "boostup"
  activeProject: string | null
  onHover: (projectType: string | null) => void
}

function ProjectHalf({
  title,
  description,
  imagePath,
  imageAlt,
  projectType,
  activeProject,
  onHover,
}: ProjectHalfProps) {
  const isExpanded = activeProject === projectType
  const isAnyProjectActive = activeProject !== null
  const isThisProjectActive = isAnyProjectActive && isExpanded

  return (
    <div
      className={`w-full md:w-1/3 min-h-screen bg-black/60 flex items-center justify-center transition-all duration-700 relative overflow-hidden ${
        isExpanded ? "fixed inset-0 z-50 md:w-full" : ""
      }`}
      onMouseEnter={() => onHover(projectType)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Special handling for Enso project with enlarging animation */}
      {projectType === "enso" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isExpanded ? "scale-150" : "scale-90 opacity-90"}`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/40 rounded-2xl" />}
        </div>
      )}

      {/* Special handling for BoostUp project with enlarging animation */}
      {projectType === "boostup" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isExpanded ? "scale-150" : "scale-90 opacity-90"}`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/30 rounded-2xl" />}
        </div>
      )}

      <div
        className={`p-4 sm:p-6 md:p-8 max-w-md text-center relative z-10 transition-all duration-700 ${
          isThisProjectActive ? "opacity-100 transform translate-y-8" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-black/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[#8B3A3A]/50 shadow-2xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 font-poppins text-white text-shadow-lg">
            {title}
          </h3>
          <p className="mb-6 font-open-sans text-gray-100 text-shadow-md text-sm sm:text-base">{description}</p>
        </div>
      </div>

      {/* Special handling for STREETEUX project with larger default size */}
      {projectType === "creative" && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
            isExpanded ? "scale-150" : "scale-100 opacity-90"
          }`}
        >
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-contain rounded-3xl"
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          {isExpanded && <div className="absolute inset-0 bg-black/50 rounded-2xl" />}
        </div>
      )}
    </div>
  )
}
