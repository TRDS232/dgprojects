"use client"

import { useEffect, useRef, useCallback } from "react"

interface GalaxyCanvasProps {
  withConstellations?: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  dx: number
  dy: number
  rotation: number
  dRotation: number
}

// Detect device performance tier
function getDeviceTier(): "low" | "mid" | "high" {
  if (typeof window === "undefined") return "mid"
  const cores = navigator.hardwareConcurrency ?? 2
  const memory = (navigator as any).deviceMemory ?? 2
  if (cores <= 2 || memory <= 1) return "low"
  if (cores <= 4 || memory <= 4) return "mid"
  return "high"
}

const TIER_CONFIG = {
  low:  { particles: 60,  constellations: false, shootingStars: false, shadowBlur: false },
  mid:  { particles: 120, constellations: false, shootingStars: true,  shadowBlur: false },
  high: { particles: 200, constellations: true,  shootingStars: true,  shadowBlur: true  },
}

export default function GalaxyCanvas({ withConstellations = false }: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const shootingStarRef = useRef({ x: -200, y: -200, vx: 6, vy: 4, opacity: 0, active: false, timer: 0 })
  const tierRef = useRef<"low" | "mid" | "high">("mid")

  const initParticles = useCallback((width: number, height: number, count: number) => {
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
      dx: (Math.random() - 0.5) * 0.04,
      dy: (Math.random() - 0.5) * 0.04,
      rotation: Math.random() * Math.PI * 2,
      dRotation: (Math.random() - 0.5) * 0.01,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    tierRef.current = getDeviceTier()
    const config = TIER_CONFIG[tierRef.current]
    const useConstellations = withConstellations && config.constellations
    const connectionDistance = 100

    // Pre-compute constellation connections once (not per frame)
    const connectionsRef: [number, number][] = []

    const setup = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas.width, canvas.height, config.particles)

      if (useConstellations) {
        connectionsRef.length = 0
        const pts = particlesRef.current
        for (let i = 0; i < pts.length; i++) {
          let connections = 0
          for (let j = i + 1; j < pts.length && connections < 3; j++) {
            const dx = pts[i].x - pts[j].x
            const dy = pts[i].y - pts[j].y
            if (Math.sqrt(dx * dx + dy * dy) < connectionDistance) {
              connectionsRef.push([i, j])
              connections++
            }
          }
        }
      }
    }

    const ss = shootingStarRef.current

    const resetStar = () => {
      ss.x = Math.random() * canvas.width * 0.5
      ss.y = -20
      ss.vx = Math.random() * 4 + 4
      ss.vy = Math.random() * 3 + 3
      ss.opacity = 1
      ss.active = true
    }

    let lastTime = 0
    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate)

      // Throttle to ~45fps on low-end, 60fps otherwise
      const minInterval = tierRef.current === "low" ? 22 : 16
      if (now - lastTime < minInterval) return
      const delta = Math.min(now - lastTime, 50)
      lastTime = now

      const progress = Math.min((now - startTimeRef.current) / 2000, 1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      const pts = particlesRef.current
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.dx * (delta / 16)
        p.y += p.dy * (delta / 16)
        p.rotation += p.dRotation

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        const alpha = p.opacity * progress
        ctx.fillStyle = `rgba(169,77,77,${alpha})`
        if (config.shadowBlur) {
          ctx.shadowBlur = 4
          ctx.shadowColor = `rgba(139,58,58,${alpha})`
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      if (config.shadowBlur) ctx.shadowBlur = 0

      // Draw constellations (pre-computed, just check current distances)
      if (useConstellations && progress > 0.3) {
        ctx.lineWidth = 0.5
        for (const [a, b] of connectionsRef) {
          const pa = pts[a], pb = pts[b]
          const dx = pa.x - pb.x
          const dy = pa.y - pb.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance * 1.5) {
            const alpha = (1 - dist / (connectionDistance * 1.5)) * 0.3 * progress
            ctx.strokeStyle = `rgba(169,77,77,${alpha})`
            ctx.beginPath()
            ctx.moveTo(pa.x, pa.y)
            ctx.lineTo(pb.x, pb.y)
            ctx.stroke()
          }
        }
      }

      // Shooting star
      if (config.shootingStars) {
        ss.timer += delta
        if (!ss.active && ss.timer > 3000) {
          resetStar()
          ss.timer = 0
        }
        if (ss.active) {
          ss.x += ss.vx * (delta / 16)
          ss.y += ss.vy * (delta / 16)
          ss.opacity -= 0.012 * (delta / 16)
          if (ss.opacity <= 0 || ss.x > canvas.width + 100) {
            ss.active = false
            ss.timer = 0
          } else {
            const len = 60
            const angle = Math.atan2(ss.vy, ss.vx)
            ctx.beginPath()
            ctx.moveTo(ss.x, ss.y)
            ctx.lineTo(ss.x - Math.cos(angle) * len, ss.y - Math.sin(angle) * len)
            ctx.strokeStyle = `rgba(169,77,77,${ss.opacity * progress})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }
      }
    }

    const onResize = () => {
      setup()
    }

    window.addEventListener("resize", onResize, { passive: true })
    setup()
    startTimeRef.current = performance.now()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [withConstellations, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  )
}
