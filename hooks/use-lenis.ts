"use client"

import { useEffect, useRef } from "react"

// Lightweight Lenis-style smooth scroll implemented natively —
// no extra npm package needed, same feel, zero bundle cost.
// Uses a lerp (linear interpolation) approach on the scroll position.

const LERP = 0.085        // smoothing factor — lower = smoother/slower
const WHEEL_MULTIPLIER = 1 // wheel sensitivity

export function useSmoothScroll() {
  const currentRef = useRef(0)   // current lerped scroll
  const targetRef  = useRef(0)   // target scroll (raw)
  const rafRef     = useRef(0)
  const lockedRef  = useRef(false)

  useEffect(() => {
    // Disable native smooth scroll — we handle it
    document.documentElement.style.scrollBehavior = "auto"

    const onWheel = (e: WheelEvent) => {
      if (lockedRef.current) return
      e.preventDefault()
      targetRef.current += e.deltaY * WHEEL_MULTIPLIER
      targetRef.current = Math.max(
        0,
        Math.min(targetRef.current, document.body.scrollHeight - window.innerHeight)
      )
    }

    // Touch support
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => {
      if (lockedRef.current) return
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      targetRef.current += dy
      targetRef.current = Math.max(
        0,
        Math.min(targetRef.current, document.body.scrollHeight - window.innerHeight)
      )
    }

    const tick = () => {
      const diff = targetRef.current - currentRef.current
      // Snap if close enough to avoid perpetual micro-movement
      if (Math.abs(diff) < 0.5) {
        currentRef.current = targetRef.current
      } else {
        currentRef.current += diff * LERP
      }
      window.scrollTo(0, currentRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    // Sync initial position
    currentRef.current = window.scrollY
    targetRef.current  = window.scrollY

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove",  onTouchMove,  { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove",  onTouchMove)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  // Expose a smooth scrollTo for nav buttons
  const scrollTo = (target: number | string) => {
    if (typeof target === "string") {
      const el = document.getElementById(target)
      if (!el) return
      targetRef.current = el.offsetTop
    } else {
      targetRef.current = target
    }
    targetRef.current = Math.max(
      0,
      Math.min(targetRef.current, document.body.scrollHeight - window.innerHeight)
    )
  }

  return { scrollTo }
}

// IntersectionObserver-based reveal hook
// Returns a ref to attach to any element; adds "in-view" class when visible
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view")
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
