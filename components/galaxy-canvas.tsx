"use client"

import { useEffect, useRef, useState } from "react"

interface GalaxyCanvasProps {
  id: string
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
  type: "circle" | "square" | "triangle" | "hexagon"
  connections: Particle[]
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  reset: () => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D, animationProgress: number) => void
}

export default function GalaxyCanvas({ id, withConstellations = false }: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationStartTimeRef = useRef<number>(0)
  const requestIdRef = useRef<number>(0)

  // Constants
  const numberOfParticles = 280
  const minParticleSize = 1
  const maxParticleSize = 3
  const driftSpeed = 0.06
  const maxShootingStars = 3
  const shootingStarInterval = 2500
  const connectionDistance = 120
  const maxConnectionsPerParticle = 4
  const glowRadius = 150
  const maxGlowIntensity = 0.6
  const fadeInDuration = 3000

  const drawGeometricShape = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    type: "circle" | "square" | "triangle" | "hexagon",
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)

    switch (type) {
      case "circle":
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.fill()
        break
      case "square":
        ctx.fillRect(-size, -size, size * 2, size * 2)
        break
      case "triangle":
        ctx.beginPath()
        ctx.moveTo(0, -size * 1.2)
        ctx.lineTo(size * 1.2, size * 0.8)
        ctx.lineTo(-size * 1.2, size * 0.8)
        ctx.closePath()
        ctx.fill()
        break
      case "hexagon":
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const px = Math.cos(angle) * size
          const py = Math.sin(angle) * size
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()
        break
    }

    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        initParticles()
        initShootingStars()
        animationStartTimeRef.current = performance.now()
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        })
      }
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 })
    }

    const initParticles = () => {
      if (!canvas) return

      const types: ("circle" | "square" | "triangle" | "hexagon")[] = ["circle", "square", "triangle", "hexagon"]
      const particles: Particle[] = []

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxParticleSize - minParticleSize) + minParticleSize,
          opacity: Math.random() * 0.5 + 0.3,
          dx: (Math.random() - 0.5) * driftSpeed,
          dy: (Math.random() - 0.5) * driftSpeed,
          rotation: Math.random() * Math.PI * 2,
          dRotation: (Math.random() - 0.5) * 0.02,
          type: types[Math.floor(Math.random() * types.length)],
          connections: [],
        })
      }

      if (withConstellations) {
        particles.forEach((particle1) => {
          particle1.connections = []
          for (let i = 0; i < particles.length; i++) {
            const particle2 = particles[i]
            if (particle1 !== particle2 && !particle1.connections.includes(particle2)) {
              const dist = Math.sqrt(Math.pow(particle1.x - particle2.x, 2) + Math.pow(particle1.y - particle2.y, 2))
              if (dist < connectionDistance) {
                if (particle1.connections.length < maxConnectionsPerParticle) {
                  particle1.connections.push(particle2)
                }
              }
            }
          }
        })
      }

      particlesRef.current = particles
    }

    // Initialize shooting stars
    const initShootingStars = () => {
      if (!canvas) return

      const shootingStars: ShootingStar[] = []
      for (let i = 0; i < maxShootingStars / 2; i++) {
        shootingStars.push(createShootingStar())
      }
      shootingStarsRef.current = shootingStars
    }

    const createShootingStar = (): ShootingStar => {
      if (!canvas) {
        throw new Error("Canvas not available")
      }

      let x: number, y: number

      if (Math.random() < 0.5) {
        x = -Math.random() * canvas.width * 0.5
        y = Math.random() * canvas.height
      } else {
        x = Math.random() * canvas.width
        y = -Math.random() * canvas.height * 0.5
      }

      const length = Math.random() * 80 + 40
      const speed = Math.random() * 4 + 4
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1)
      const opacity = 1

      const shootingStar: ShootingStar = {
        x,
        y,
        length,
        speed,
        angle,
        opacity,
        reset() {
          if (!canvas) return

          if (Math.random() < 0.5) {
            this.x = -Math.random() * canvas.width * 0.5
            this.y = Math.random() * canvas.height
          } else {
            this.x = Math.random() * canvas.width
            this.y = -Math.random() * canvas.height * 0.5
          }
          this.length = Math.random() * 80 + 40
          this.speed = Math.random() * 4 + 4
          this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1)
          this.opacity = 1
        },
        update() {
          if (!canvas) return

          this.x += Math.cos(this.angle) * this.speed
          this.y += Math.sin(this.angle) * this.speed
          this.opacity -= 0.015

          if (this.x > canvas.width + this.length || this.y > canvas.height + this.length || this.opacity <= 0) {
            this.reset()
          }
        },
        draw(ctx, animationProgress) {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
          ctx.strokeStyle = `rgba(139, 58, 58, ${this.opacity * animationProgress})`
          ctx.lineWidth = 2
          ctx.stroke()
        },
      }

      return shootingStar
    }

    const drawConstellations = (ctx: CanvasRenderingContext2D, animationProgress: number) => {
      if (!canvas) return

      const canvasRect = canvas.getBoundingClientRect()

      particlesRef.current.forEach((particle1) => {
        particle1.connections.forEach((particle2) => {
          const dist = Math.sqrt(Math.pow(particle1.x - particle2.x, 2) + Math.pow(particle1.y - particle2.y, 2))
          let opacity = Math.max(0, 1 - dist / connectionDistance)

          const midX = (particle1.x + particle2.x) / 2
          const midY = (particle1.y + particle2.y) / 2

          const mouseXRelativeToCanvas = mousePosition.x - canvasRect.left
          const mouseYRelativeToCanvas = mousePosition.y - canvasRect.top

          const distToMouse = Math.sqrt(
            Math.pow(midX - mouseXRelativeToCanvas, 2) + Math.pow(midY - mouseYRelativeToCanvas, 2),
          )

          let glowFactor = 0
          if (distToMouse < glowRadius) {
            glowFactor = (1 - distToMouse / glowRadius) * maxGlowIntensity
          }

          opacity = Math.min(1, opacity + glowFactor) * animationProgress

          ctx.strokeStyle = `rgba(169, 77, 77, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particle1.x, particle1.y)
          ctx.lineTo(particle2.x, particle2.y)
          ctx.stroke()
        })
      })
    }

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = performance.now()
      let animationProgress = 1

      if (animationStartTimeRef.current > 0) {
        animationProgress = (currentTime - animationStartTimeRef.current) / fadeInDuration
        animationProgress = Math.min(Math.max(animationProgress, 0), 1)
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update particle position
        particle.x += particle.dx
        particle.y += particle.dy
        particle.rotation += particle.dRotation

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1

        // Add slight randomness to movement
        particle.dx += (Math.random() - 0.5) * 0.001
        particle.dy += (Math.random() - 0.5) * 0.001

        // Limit speed
        const currentDriftSpeed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy)
        if (currentDriftSpeed > driftSpeed) {
          particle.dx = (particle.dx / currentDriftSpeed) * driftSpeed
          particle.dy = (particle.dy / currentDriftSpeed) * driftSpeed
        }

        // Draw particle
        const canvasRect = canvas.getBoundingClientRect()
        const mouseXRelativeToCanvas = mousePosition.x - canvasRect.left
        const mouseYRelativeToCanvas = mousePosition.y - canvasRect.top

        const distToMouse = Math.sqrt(
          Math.pow(particle.x - mouseXRelativeToCanvas, 2) + Math.pow(particle.y - mouseYRelativeToCanvas, 2),
        )

        let glowFactor = 0
        if (distToMouse < glowRadius) {
          glowFactor = (1 - distToMouse / glowRadius) * maxGlowIntensity
        }

        const finalOpacity = Math.min(1, particle.opacity + glowFactor) * animationProgress

        ctx.shadowBlur = particle.size * 4 + glowFactor * 8
        ctx.shadowColor = `rgba(139, 58, 58, ${finalOpacity})`

        ctx.fillStyle = `rgba(139, 58, 58, ${finalOpacity})`

        drawGeometricShape(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type)

        ctx.shadowBlur = 0
      })

      // Draw constellations if enabled
      if (withConstellations) {
        drawConstellations(ctx, animationProgress)
      }

      // Handle shooting stars
      const shootingStars = shootingStarsRef.current

      // Add new shooting star if needed
      if (!shootingStars.lastStarTime) {
        shootingStars.lastStarTime = 0
      }

      if (shootingStars.length < maxShootingStars && currentTime - shootingStars.lastStarTime > shootingStarInterval) {
        shootingStarsRef.current.push(createShootingStar())
        shootingStars.lastStarTime = currentTime
      }

      // Update and draw shooting stars
      shootingStars.forEach((star) => {
        star.update()
        star.draw(ctx, animationProgress)
      })

      requestIdRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Initialize
    handleResize()
    animationStartTimeRef.current = performance.now()
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(requestIdRef.current)
    }
  }, [withConstellations])

  return <canvas ref={canvasRef} id={id} className="absolute top-0 left-0 w-full h-full z-0" />
}
