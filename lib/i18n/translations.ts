// Full content dictionary for every translatable string on the site.
// Keep the shape identical between "en" and "es" — components index into
// these objects/arrays positionally (e.g. services[i], plansMaintenance[i]).

export type Locale = "en" | "es"

export interface ServiceItem {
  num: string
  title: string
  outcome: string
  description: string
  tags: string[]
}

export interface SimpleItem {
  num: string
  title: string
  body: string
}

export interface CreationPlan {
  name: string
  price: string
  description: string
  tags: string[]
  featured?: boolean
}

export interface MaintenancePlan {
  name: string
  price: string
  description: string
  features: string[]
}

export interface ProjectItem {
  href: string
  title: string
  subtitle: string
  sector: string
  description: string
  challenge: string
  result: string
  tags: string[]
  year: string
  accent?: string
}

export interface Dictionary {
  nav: {
    services: string
    why: string
    process: string
    plans: string
    getStarted: string
    home: string
    toggleMenu: string
  }
  hero: {
    eyebrow: string
    headlinePrefix: string
    headlineAccent: string
    subLine1: string
    subLine2: string
    ctaPrimary: string
    ctaSecondary: string
    scroll: string
    metrics: { value: number; suffix: string; label: string }[]
  }
  marquee: string[]
  servicesSection: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    sub: string
    discuss: string
  }
  services: ServiceItem[]
  whySection: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    body: string
    cta: string
  }
  whyItems: SimpleItem[]
  processSection: {
    eyebrow: string
    title: string
  }
  processSteps: SimpleItem[]
  projectsSection: {
    eyebrow: string
    title: string
    sub: string
    moreProjects: string
    ctaText: string
    ctaButton: string
    challengeLabel: string
    resultLabel: string
  }
  projects: ProjectItem[]
  plansSection: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    sub: string
  }
  audit: {
    title: string
    badge: string
    description: string
    tags: string[]
    button: string
  }
  creationGroup: { label: string; sub: string }
  plansCreation: CreationPlan[]
  requestQuote: string
  maintenanceGroup: { label: string; sub: string }
  plansMaintenance: MaintenancePlan[]
  mostRequested: string
  mostPopular: string
  perMonth: string
  getStartedBtn: string
  contactUsBtn: string
  finalCta: {
    eyebrow: string
    title: string
    body: string
    primary: string
  }
  footer: {
    tagline: string
    rights: string
  }
  contact: {
    brand: string
    tagline: string
    close: string
    successTitle: string
    successBody: string
    successNote: string
    closeBtn: string
    intro: string
    introBody: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    serviceLabel: string
    servicePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    send: string
    sending: string
    or: string
    errorRequired: string
    errorEmail: string
    errorService: string
    errorMessage: string
    sendError: string
    services: string[]
    rights: string
  }
}

export const translations: Record<Locale, Dictionary> = {
  en: {
    nav: {
      services: "Services",
      why: "Why us",
      process: "Process",
      plans: "Plans",
      getStarted: "Get started",
      home: "DG Projects home",
      toggleMenu: "Toggle menu",
    },
    hero: {
      eyebrow: "Digital Growth Agency",
      headlinePrefix: "We build websites that",
      headlineAccent: "generate real results.",
      subLine1: "More visibility. More leads. More sales.",
      subLine2: "Full-service digital agency for businesses serious about growing online.",
      ctaPrimary: "Start your project",
      ctaSecondary: "View our work",
      scroll: "Scroll",
      metrics: [
        { value: 4, suffix: "+", label: "Web Projects" },
        { value: 3, suffix: "+", label: "Landing Pages" },
        { value: 2, suffix: "", label: "Countries" },
      ],
    },
    marquee: [
      "Web Design & Development",
      "SEO & Search Visibility",
      "Website Maintenance",
      "Digital Presence Management",
      "Branding & Strategy",
    ],
    servicesSection: {
      eyebrow: "What we do",
      titleLine1: "Services built",
      titleLine2: "for business growth.",
      sub: "Every service is designed to directly impact your visibility, leads, and revenue.",
      discuss: "Discuss your project",
    },
    services: [
      {
        num: "01",
        title: "Web Design & Development",
        outcome: "A website that works as hard as you do.",
        description:
          "We build modern, fast, conversion-focused websites that turn visitors into customers. Every project starts with your business goals, not a template.",
        tags: ["Corporate websites", "Landing pages", "E-commerce", "Custom web apps"],
      },
      {
        num: "02",
        title: "SEO & Search Visibility",
        outcome: "Get found by customers actively searching for your services.",
        description:
          "We implement technical and on-page SEO so your business ranks on Google. More visibility means more qualified traffic — and more sales.",
        tags: ["Technical SEO", "Keyword research", "Google Search Console", "Core Web Vitals"],
      },
      {
        num: "03",
        title: "Website Maintenance & Growth",
        outcome: "Your website, always up-to-date and performing.",
        description:
          "We handle monthly updates, security monitoring, performance optimization, and content changes so you can focus on running your business.",
        tags: ["Monthly updates", "Security monitoring", "Performance reports", "Content changes"],
      },
      {
        num: "04",
        title: "Digital Presence Management",
        outcome: "Dominate your local market online.",
        description:
          "We optimize your Google Business Profile, ensure brand consistency across all platforms, and continuously improve your online presence to generate more leads.",
        tags: ["Google Business", "Local SEO", "UX audits", "Lead generation"],
      },
      {
        num: "05",
        title: "Branding & Digital Strategy",
        outcome: "A clear roadmap for your digital future.",
        description:
          "Not sure where to start? We help you define your positioning, build a digital strategy, and create a growth roadmap that makes every investment count.",
        tags: ["Digital consulting", "Brand positioning", "Website strategy", "Growth roadmap"],
      },
      {
        num: "06",
        title: "Website Audit",
        outcome: "Find out exactly what's holding your website back.",
        description:
          "We perform a full technical and strategic review of your existing website: SEO health, page speed, Google rankings, user experience, and conversion barriers. You get a clear, prioritized action plan.",
        tags: ["Technical SEO audit", "Core Web Vitals", "Google ranking review", "UX analysis", "Competitor benchmarking"],
      },
    ],
    whySection: {
      eyebrow: "Why DG Projects",
      titleLine1: "We treat your business",
      titleLine2: "like our own.",
      body:
        "Most agencies build your website and disappear. We build a long-term partnership, continuously improving your online presence and helping your business grow month after month.",
      cta: "Book a free consultation",
    },
    whyItems: [
      { num: "01", title: "Fast delivery", body: "Most websites go live in 2–4 weeks. We don't keep you waiting while your competitors gain ground." },
      { num: "02", title: "SEO-first approach", body: "Every website we build is optimized for search engines from day one — not as an afterthought." },
      { num: "03", title: "Modern technology", body: "We build with Next.js and performance-first practices. Your site will load fast and rank better." },
      { num: "04", title: "Business-oriented results", body: "We speak your language: more customers, more sales, more growth. No technical jargon." },
      { num: "05", title: "Ongoing support", body: "We don't disappear after launch. Every client gets continued support and regular optimization." },
      { num: "06", title: "Transparent process", body: "You always know what we're working on, what's next, and why. No surprises, no hidden costs." },
    ],
    processSection: {
      eyebrow: "How we work",
      title: "From first call to lasting growth.",
    },
    processSteps: [
      { num: "01", title: "Discovery", body: "We learn your business, your customers, and your goals." },
      { num: "02", title: "Strategy", body: "We plan the site architecture and SEO foundation." },
      { num: "03", title: "Design", body: "We craft the visual identity and user experience." },
      { num: "04", title: "Development", body: "We build with modern, fast, accessible technology." },
      { num: "05", title: "Launch", body: "We deploy with thorough testing and performance checks." },
      { num: "06", title: "Growth", body: "We monitor, optimize, and help your site keep growing." },
    ],
    projectsSection: {
      eyebrow: "Client work",
      title: "Results we've delivered.",
      sub: "Every project starts with a business goal. Here's what we've built and why it worked.",
      moreProjects: "More projects in progress",
      ctaText: "Want results like these for your business?",
      ctaButton: "Start your project",
      challengeLabel: "Challenge",
      resultLabel: "Result",
    },
    projects: [
      {
        href: "https://www.trslogistica.com/",
        title: "TRS Logística",
        subtitle: "Logistics & Global Trade",
        sector: "Logistics",
        description:
          "International logistics platform for import management from China and Panamá, customs clearance, consolidated cargo, and multimodal transport services targeting entrepreneurs scaling into El Salvador.",
        challenge: "Needed a professional digital presence to compete with established logistics firms and attract new import clients.",
        result: "Modern bilingual website with WhatsApp integration, enabling direct client contact and improving lead generation.",
        tags: ["Web Design", "WhatsApp API", "Responsive", "SEO"],
        year: "2025",
        accent: "rgba(59,130,246,0.18)",
      },
      {
        href: "https://www.vidental.sv/",
        title: "VIDENTAL SV",
        subtitle: "Advanced Dental Clinic",
        sector: "Healthcare",
        description:
          "Premium dental clinic combining specialist services — endodontics, cosmetic dentistry, 3D imaging — with a medical-tourism experience for international patients seeking bilingual, high-end care in El Salvador.",
        challenge: "Attract both local and international patients while communicating premium service quality and building trust online.",
        result: "Premium website with specialist service pages, appointment flow, and medical-tourism section — significantly improving online patient acquisition.",
        tags: ["Web Design", "WhatsApp API", "Responsive", "SEO"],
        year: "2025",
        accent: "rgba(20,184,166,0.18)",
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
        accent: "rgba(139,92,246,0.18)",
      },
      {
        href: "https://www.somosmezal.com/",
        title: "Somos Mezal",
        subtitle: "Brand & Digital Presence",
        sector: "Brand",
        description:
          "Brand website for Somos Mezal, designed to communicate the brand identity, showcase products, and connect with their audience online — combining visual storytelling with a clean, conversion-focused structure.",
        challenge: "Build a digital home that authentically represents the brand and creates a memorable first impression for new customers.",
        result: "Visually compelling brand website that reflects the brand's identity and gives the business a credible platform to grow from.",
        tags: ["Web Design", "Branding", "Responsive", "SEO"],
        year: "2026",
        accent: "rgba(234,179,8,0.18)",
      },
      {
        href: "https://international.vidental.sv/",
        title: "VIDENTAL International",
        subtitle: "Medical Tourism Landing Page",
        sector: "Landing Page",
        description:
          "Dedicated English-language landing page targeting international patients seeking premium dental care in El Salvador. Focused on communicating quality, safety, and the value of dental tourism to a global audience.",
        challenge: "Convert international visitors into booked appointments by clearly positioning Vidental as a world-class clinic at a fraction of US/European prices.",
        result: "High-converting bilingual landing page with a direct appointment flow, built specifically to capture international medical tourism traffic.",
        tags: ["Landing Page", "Bilingual", "SEO", "Conversion"],
        year: "2025",
        accent: "rgba(20,184,166,0.14)",
      },
      {
        href: "https://catalogo.somosmezal.com/",
        title: "Catálogo Somos Mezal",
        subtitle: "Product Catalog",
        sector: "Landing Page",
        description:
          "Product catalog landing page for Somos Mezal, presenting the full product line in a clean, visual format optimized for browsing and direct orders — designed for a mobile-first audience.",
        challenge: "Make it easy for customers to discover, explore, and order products with as little friction as possible.",
        result: "Clean catalog page with clear product presentation and a direct ordering flow, ready to drive sales from day one.",
        tags: ["Landing Page", "Catalog", "Responsive", "Conversion"],
        year: "2026",
        accent: "rgba(234,179,8,0.14)",
      },
    ],
    plansSection: {
      eyebrow: "Plans & packages",
      titleLine1: "Transparent pricing,",
      titleLine2: "real results.",
      sub: "Whether you need a new website or ongoing support for an existing one, there's a plan for you.",
    },
    audit: {
      title: "Website Audit",
      badge: "$125 · One-time",
      description:
        "Already have a website but not seeing results? We do a full technical and strategic review — SEO health, page speed, Google rankings, user experience, and competitor benchmarking — and deliver a clear, prioritized action plan.",
      tags: ["Technical SEO", "Core Web Vitals", "Google ranking review", "UX analysis", "Detailed report"],
      button: "Request audit",
    },
    creationGroup: {
      label: "Website Creation",
      sub: "One-time project — get your website built and launched",
    },
    plansCreation: [
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
    ],
    requestQuote: "Request quote",
    maintenanceGroup: {
      label: "Monthly Maintenance",
      sub: "Ongoing support to keep your site growing after launch",
    },
    plansMaintenance: [
      {
        name: "Essential",
        price: "$49.99",
        description: "Keep your website healthy, secure, and always up to date.",
        features: ["Monthly content updates", "Security monitoring", "Uptime monitoring", "Monthly performance report", "Email support"],
      },
      {
        name: "Growth",
        price: "$99.99",
        description: "Everything in Essential, plus active SEO work to keep climbing Google every month.",
        features: ["Everything in Essential", "Monthly SEO improvements", "Google Search Console management", "Monthly analytics report", "Minor design updates", "Priority support"],
      },
      {
        name: "Premium",
        price: "Custom",
        description: "Full ongoing partnership — strategy, design, SEO, and continuous optimization.",
        features: ["Everything in Growth", "Monthly strategy session", "Continuous UX optimization", "Content creation support", "Conversion rate improvements", "Dedicated account manager"],
      },
    ],
    mostRequested: "Most requested",
    mostPopular: "Most popular",
    perMonth: "/month",
    getStartedBtn: "Get started",
    contactUsBtn: "Contact us",
    finalCta: {
      eyebrow: "Ready to grow?",
      title: "Let's build your digital presence together.",
      body: "Tell us about your business and we'll put together a plan to help you grow online.",
      primary: "Book a free consultation",
    },
    footer: {
      tagline: "Digital Growth Agency",
      rights: "All rights reserved.",
    },
    contact: {
      brand: "DG Projects",
      tagline: "Digital Growth Agency",
      close: "Close",
      successTitle: "Message sent!",
      successBody: "Your email client should have opened with your message. If it didn't, reach us directly at",
      successNote: "We'll reply within 24 hours.",
      closeBtn: "Close",
      intro: "Let's talk about your project.",
      introBody: "Fill out the form and we'll get back to you within 24 hours with a plan.",
      nameLabel: "Your name",
      namePlaceholder: "John Smith",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      serviceLabel: "Service interested in",
      servicePlaceholder: "Select a service...",
      messageLabel: "Tell us about your project",
      messagePlaceholder: "Describe your business, what you need, and your goals...",
      send: "Send message",
      sending: "Sending...",
      or: "Or reach us on Instagram",
      errorRequired: "Required",
      errorEmail: "Enter a valid email",
      errorService: "Please select a service",
      errorMessage: "Tell us a bit more (min. 10 characters)",
      sendError: "Couldn't send the message. Please try again or email us directly.",
      services: [
        "Web Design & Development",
        "SEO & Search Visibility",
        "Website Maintenance",
        "Digital Presence Management",
        "Branding & Strategy",
        "Website Audit",
        "Other",
      ],
      rights: "Digital Growth Agency",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      why: "Por qué nosotros",
      process: "Proceso",
      plans: "Planes",
      getStarted: "Empezar",
      home: "Inicio de DG Projects",
      toggleMenu: "Abrir menú",
    },
    hero: {
      eyebrow: "Agencia de Crecimiento Digital",
      headlinePrefix: "Creamos sitios web que",
      headlineAccent: "generan resultados reales.",
      subLine1: "Más visibilidad. Más clientes. Más ventas.",
      subLine2: "Agencia digital integral para negocios que toman en serio crecer en línea.",
      ctaPrimary: "Inicia tu proyecto",
      ctaSecondary: "Ver nuestro trabajo",
      scroll: "Desliza",
      metrics: [
        { value: 4, suffix: "+", label: "Proyectos web" },
        { value: 3, suffix: "+", label: "Landing pages" },
        { value: 2, suffix: "", label: "Países" },
      ],
    },
    marquee: [
      "Diseño y Desarrollo Web",
      "SEO y Visibilidad en Buscadores",
      "Mantenimiento de Sitios Web",
      "Gestión de Presencia Digital",
      "Branding y Estrategia",
    ],
    servicesSection: {
      eyebrow: "Lo que hacemos",
      titleLine1: "Servicios diseñados",
      titleLine2: "para el crecimiento de tu negocio.",
      sub: "Cada servicio está diseñado para impactar directamente tu visibilidad, tus clientes potenciales y tus ventas.",
      discuss: "Hablemos de tu proyecto",
    },
    services: [
      {
        num: "01",
        title: "Diseño y Desarrollo Web",
        outcome: "Un sitio web que trabaja tan duro como tú.",
        description:
          "Creamos sitios web modernos, rápidos y enfocados en conversión que convierten visitantes en clientes. Cada proyecto parte de tus objetivos de negocio, no de una plantilla.",
        tags: ["Sitios corporativos", "Landing pages", "E-commerce", "Aplicaciones web a la medida"],
      },
      {
        num: "02",
        title: "SEO y Visibilidad en Buscadores",
        outcome: "Que tus clientes te encuentren cuando te buscan.",
        description:
          "Implementamos SEO técnico y on-page para que tu negocio aparezca en Google. Más visibilidad significa más tráfico calificado, y más ventas.",
        tags: ["SEO técnico", "Investigación de palabras clave", "Google Search Console", "Core Web Vitals"],
      },
      {
        num: "03",
        title: "Mantenimiento y Crecimiento Web",
        outcome: "Tu sitio web, siempre actualizado y funcionando.",
        description:
          "Nos encargamos de actualizaciones mensuales, monitoreo de seguridad, optimización de rendimiento y cambios de contenido para que tú te enfoques en tu negocio.",
        tags: ["Actualizaciones mensuales", "Monitoreo de seguridad", "Reportes de rendimiento", "Cambios de contenido"],
      },
      {
        num: "04",
        title: "Gestión de Presencia Digital",
        outcome: "Domina tu mercado local en línea.",
        description:
          "Optimizamos tu perfil de Google Business, garantizamos consistencia de marca en todas las plataformas y mejoramos continuamente tu presencia en línea para generar más clientes potenciales.",
        tags: ["Google Business", "SEO local", "Auditorías UX", "Generación de leads"],
      },
      {
        num: "05",
        title: "Branding y Estrategia Digital",
        outcome: "Una hoja de ruta clara para tu futuro digital.",
        description:
          "¿No sabes por dónde empezar? Te ayudamos a definir tu posicionamiento, construir una estrategia digital y crear un plan de crecimiento que haga que cada inversión cuente.",
        tags: ["Consultoría digital", "Posicionamiento de marca", "Estrategia web", "Plan de crecimiento"],
      },
      {
        num: "06",
        title: "Auditoría de Sitio Web",
        outcome: "Descubre exactamente qué está frenando tu sitio web.",
        description:
          "Realizamos una revisión técnica y estratégica completa de tu sitio web actual: salud SEO, velocidad de carga, posicionamiento en Google, experiencia de usuario y barreras de conversión. Recibes un plan de acción claro y priorizado.",
        tags: ["Auditoría SEO técnica", "Core Web Vitals", "Revisión de posicionamiento", "Análisis UX", "Comparativa con competidores"],
      },
    ],
    whySection: {
      eyebrow: "Por qué DG Projects",
      titleLine1: "Tratamos tu negocio",
      titleLine2: "como si fuera nuestro.",
      body:
        "La mayoría de las agencias construyen tu sitio web y desaparecen. Nosotros construimos una relación a largo plazo, mejorando continuamente tu presencia en línea y ayudando a tu negocio a crecer mes a mes.",
      cta: "Reserva una consultoría gratuita",
    },
    whyItems: [
      { num: "01", title: "Entrega rápida", body: "La mayoría de los sitios web se publican en 2–4 semanas. No te dejamos esperando mientras tu competencia avanza." },
      { num: "02", title: "Enfoque SEO desde el inicio", body: "Cada sitio web que construimos está optimizado para buscadores desde el primer día, no como algo adicional." },
      { num: "03", title: "Tecnología moderna", body: "Construimos con Next.js y prácticas enfocadas en rendimiento. Tu sitio cargará rápido y posicionará mejor." },
      { num: "04", title: "Resultados orientados al negocio", body: "Hablamos tu idioma: más clientes, más ventas, más crecimiento. Sin jerga técnica." },
      { num: "05", title: "Soporte continuo", body: "No desaparecemos después del lanzamiento. Cada cliente recibe soporte continuo y optimización regular." },
      { num: "06", title: "Proceso transparente", body: "Siempre sabes en qué estamos trabajando, qué sigue y por qué. Sin sorpresas, sin costos ocultos." },
    ],
    processSection: {
      eyebrow: "Cómo trabajamos",
      title: "De la primera llamada al crecimiento duradero.",
    },
    processSteps: [
      { num: "01", title: "Descubrimiento", body: "Aprendemos sobre tu negocio, tus clientes y tus objetivos." },
      { num: "02", title: "Estrategia", body: "Planeamos la arquitectura del sitio y las bases del SEO." },
      { num: "03", title: "Diseño", body: "Creamos la identidad visual y la experiencia de usuario." },
      { num: "04", title: "Desarrollo", body: "Construimos con tecnología moderna, rápida y accesible." },
      { num: "05", title: "Lanzamiento", body: "Desplegamos con pruebas exhaustivas y revisiones de rendimiento." },
      { num: "06", title: "Crecimiento", body: "Monitoreamos, optimizamos y ayudamos a tu sitio a seguir creciendo." },
    ],
    projectsSection: {
      eyebrow: "Trabajo con clientes",
      title: "Resultados que hemos entregado.",
      sub: "Cada proyecto parte de un objetivo de negocio. Esto es lo que hemos construido y por qué funcionó.",
      moreProjects: "Más proyectos en progreso",
      ctaText: "¿Quieres resultados como estos para tu negocio?",
      ctaButton: "Inicia tu proyecto",
      challengeLabel: "Desafío",
      resultLabel: "Resultado",
    },
    projects: [
      {
        href: "https://www.trslogistica.com/",
        title: "TRS Logística",
        subtitle: "Logística y Comercio Global",
        sector: "Logística",
        description:
          "Plataforma de logística internacional para gestión de importaciones desde China y Panamá, despacho aduanal, carga consolidada y servicios de transporte multimodal dirigida a emprendedores que buscan expandirse en El Salvador.",
        challenge: "Necesitaban una presencia digital profesional para competir con empresas de logística establecidas y atraer nuevos clientes de importación.",
        result: "Sitio web moderno y bilingüe con integración de WhatsApp, permitiendo contacto directo con clientes y mejorando la generación de leads.",
        tags: ["Diseño Web", "API de WhatsApp", "Responsive", "SEO"],
        year: "2025",
        accent: "rgba(59,130,246,0.18)",
      },
      {
        href: "https://www.vidental.sv/",
        title: "VIDENTAL SV",
        subtitle: "Clínica Dental Avanzada",
        sector: "Salud",
        description:
          "Clínica dental premium que combina servicios especializados — endodoncia, odontología cosmética, imágenes 3D — con una experiencia de turismo médico para pacientes internacionales que buscan atención bilingüe de alto nivel en El Salvador.",
        challenge: "Atraer tanto a pacientes locales como internacionales mientras se comunica la calidad premium del servicio y se genera confianza en línea.",
        result: "Sitio web premium con páginas de servicios especializados, flujo de citas y sección de turismo médico, mejorando significativamente la captación de pacientes en línea.",
        tags: ["Diseño Web", "API de WhatsApp", "Responsive", "SEO"],
        year: "2025",
        accent: "rgba(20,184,166,0.18)",
      },
      {
        href: "https://www.tudentistasv.com/",
        title: "Tu Dentista SV",
        subtitle: "Clínica Dental",
        sector: "Salud",
        description:
          "Sitio web moderno para clínica dental diseñado para atraer pacientes locales y generar confianza en línea, con una presentación clara de servicios, flujo de contacto y una estética profesional limpia adaptada al mercado de El Salvador.",
        challenge: "Establecer una presencia en línea creíble desde cero y facilitar que los pacientes potenciales encuentren servicios y se pongan en contacto.",
        result: "Sitio web limpio y enfocado en conversión, listo para generar nuevas consultas de pacientes desde el primer día.",
        tags: ["Diseño Web", "Responsive", "SEO", "Bilingüe"],
        year: "2026",
        accent: "rgba(139,92,246,0.18)",
      },
      {
        href: "https://www.somosmezal.com/",
        title: "Somos Mezal",
        subtitle: "Marca y Presencia Digital",
        sector: "Marca",
        description:
          "Sitio web de marca para Somos Mezal, diseñado para comunicar la identidad de marca, mostrar productos y conectar con su audiencia en línea, combinando storytelling visual con una estructura limpia y enfocada en conversión.",
        challenge: "Construir un hogar digital que represente auténticamente la marca y cree una primera impresión memorable para nuevos clientes.",
        result: "Sitio web de marca visualmente atractivo que refleja la identidad de la marca y le da al negocio una plataforma creíble desde la cual crecer.",
        tags: ["Diseño Web", "Branding", "Responsive", "SEO"],
        year: "2026",
        accent: "rgba(234,179,8,0.18)",
      },
      {
        href: "https://international.vidental.sv/",
        title: "VIDENTAL International",
        subtitle: "Landing Page de Turismo Médico",
        sector: "Landing Page",
        description:
          "Landing page en inglés dedicada a pacientes internacionales que buscan atención dental premium en El Salvador. Enfocada en comunicar calidad, seguridad y el valor del turismo dental a una audiencia global.",
        challenge: "Convertir visitantes internacionales en citas reservadas posicionando claramente a Vidental como una clínica de clase mundial a una fracción de los precios de EE. UU./Europa.",
        result: "Landing page bilingüe de alta conversión con un flujo de citas directo, construida específicamente para captar tráfico internacional de turismo médico.",
        tags: ["Landing Page", "Bilingüe", "SEO", "Conversión"],
        year: "2025",
        accent: "rgba(20,184,166,0.14)",
      },
      {
        href: "https://catalogo.somosmezal.com/",
        title: "Catálogo Somos Mezal",
        subtitle: "Catálogo de Productos",
        sector: "Landing Page",
        description:
          "Landing page de catálogo de productos para Somos Mezal, presentando toda la línea de productos en un formato limpio y visual optimizado para explorar y hacer pedidos directos, diseñado para una audiencia mobile-first.",
        challenge: "Facilitar que los clientes descubran, exploren y pidan productos con la menor friction posible.",
        result: "Página de catálogo limpia con presentación clara de productos y un flujo de pedido directo, lista para generar ventas desde el primer día.",
        tags: ["Landing Page", "Catálogo", "Responsive", "Conversión"],
        year: "2026",
        accent: "rgba(234,179,8,0.14)",
      },
    ],
    plansSection: {
      eyebrow: "Planes y paquetes",
      titleLine1: "Precios transparentes,",
      titleLine2: "resultados reales.",
      sub: "Ya sea que necesites un sitio web nuevo o soporte continuo para uno existente, hay un plan para ti.",
    },
    audit: {
      title: "Auditoría de Sitio Web",
      badge: "$125 · Pago único",
      description:
        "¿Ya tienes un sitio web pero no ves resultados? Hacemos una revisión técnica y estratégica completa: salud SEO, velocidad de carga, posicionamiento en Google, experiencia de usuario y comparativa con competidores, y entregamos un plan de acción claro y priorizado.",
      tags: ["SEO técnico", "Core Web Vitals", "Revisión de posicionamiento", "Análisis UX", "Reporte detallado"],
      button: "Solicitar auditoría",
    },
    creationGroup: {
      label: "Creación de Sitio Web",
      sub: "Proyecto único — haz que tu sitio web se construya y lance",
    },
    plansCreation: [
      {
        name: "Landing Page",
        price: "$150",
        description: "Una página profesional para establecer tu presencia en línea y captar clientes potenciales.",
        tags: ["Diseño responsive de 1 página", "Configuración básica de SEO", "Botón de WhatsApp / contacto", "Entrega en ~1 semana"],
      },
      {
        name: "Sitio Web Empresarial",
        price: "Desde $350",
        description: "Sitio corporativo multipágina completo, construido para posicionar en Google y convertir visitantes en clientes.",
        tags: ["Hasta 6 páginas", "SEO on-page completo", "Google Analytics y Search Console", "Entrega en 2–3 semanas"],
        featured: true,
      },
      {
        name: "Proyecto Personalizado",
        price: "Contáctanos",
        description: "E-commerce, aplicaciones web o proyectos complejos con funcionalidades avanzadas.",
        tags: ["E-commerce / app web", "Integraciones de API", "Estrategia SEO avanzada", "Soporte post-lanzamiento"],
      },
    ],
    requestQuote: "Solicitar cotización",
    maintenanceGroup: {
      label: "Mantenimiento Mensual",
      sub: "Soporte continuo para mantener tu sitio creciendo después del lanzamiento",
    },
    plansMaintenance: [
      {
        name: "Esencial",
        price: "$49.99",
        description: "Mantén tu sitio web saludable, seguro y siempre actualizado.",
        features: ["Actualizaciones mensuales de contenido", "Monitoreo de seguridad", "Monitoreo de uptime", "Reporte mensual de rendimiento", "Soporte por correo"],
      },
      {
        name: "Crecimiento",
        price: "$99.99",
        description: "Todo lo de Esencial, más trabajo activo de SEO para seguir subiendo en Google cada mes.",
        features: ["Todo lo de Esencial", "Mejoras SEO mensuales", "Gestión de Google Search Console", "Reporte mensual de analítica", "Actualizaciones menores de diseño", "Soporte prioritario"],
      },
      {
        name: "Premium",
        price: "Personalizado",
        description: "Asociación continua completa: estrategia, diseño, SEO y optimización constante.",
        features: ["Todo lo de Crecimiento", "Sesión de estrategia mensual", "Optimización UX continua", "Apoyo en creación de contenido", "Mejoras en tasa de conversión", "Gerente de cuenta dedicado"],
      },
    ],
    mostRequested: "Más solicitado",
    mostPopular: "Más popular",
    perMonth: "/mes",
    getStartedBtn: "Empezar",
    contactUsBtn: "Contáctanos",
    finalCta: {
      eyebrow: "¿Listo para crecer?",
      title: "Construyamos juntos tu presencia digital.",
      body: "Cuéntanos sobre tu negocio y armaremos un plan para ayudarte a crecer en línea.",
      primary: "Reserva una consultoría gratuita",
    },
    footer: {
      tagline: "Agencia de Crecimiento Digital",
      rights: "Todos los derechos reservados.",
    },
    contact: {
      brand: "DG Projects",
      tagline: "Agencia de Crecimiento Digital",
      close: "Cerrar",
      successTitle: "¡Mensaje enviado!",
      successBody: "Tu cliente de correo debería haberse abierto con tu mensaje. Si no fue así, contáctanos directamente en",
      successNote: "Te responderemos dentro de 24 horas.",
      closeBtn: "Cerrar",
      intro: "Hablemos de tu proyecto.",
      introBody: "Completa el formulario y te responderemos dentro de 24 horas con un plan.",
      nameLabel: "Tu nombre",
      namePlaceholder: "Juan Pérez",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      serviceLabel: "Servicio de tu interés",
      servicePlaceholder: "Selecciona un servicio...",
      messageLabel: "Cuéntanos sobre tu proyecto",
      messagePlaceholder: "Describe tu negocio, qué necesitas y tus objetivos...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      or: "O contáctanos por Instagram",
      errorRequired: "Requerido",
      errorEmail: "Ingresa un correo válido",
      errorService: "Por favor selecciona un servicio",
      errorMessage: "Cuéntanos un poco más (mín. 10 caracteres)",
      sendError: "No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos directamente.",
      services: [
        "Diseño y Desarrollo Web",
        "SEO y Visibilidad en Buscadores",
        "Mantenimiento de Sitios Web",
        "Gestión de Presencia Digital",
        "Branding y Estrategia",
        "Auditoría de Sitio Web",
        "Otro",
      ],
      rights: "Agencia de Crecimiento Digital",
    },
  },
}
