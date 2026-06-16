"use client"

import { useEffect, useRef } from "react"

// Lightweight Lenis-style smooth scroll implemented natively —
// no extra npm package needed, same feel, zero bundle cost.
// Uses a lerp (linear interpolation) approach on the scroll position.

const LERP = 0.085        // smoothing factor — lower = smoother/slower
const WHEEL_MULTIPLIER = 1 // wheel sensitivity

// Detect touch/coarse-pointer devices (phones, tablets) — on these the
// browser's native momentum scroll is what users expect, and fighting it
// with a manual rAF loop is exactly what caused the lag/jank/cuts on mobile.
function isTouchDevice() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
}

export function useSmoothScroll() {
  const currentRef = useRef(0)   // current lerped scroll
  const targetRef  = useRef(0)   // target scroll (raw)
  const rafRef     = useRef(0)
  const lockedRef  = useRef(false)
  const touchRef   = useRef(false)

  useEffect(() => {
    touchRef.current = isTouchDevice()

    // On touch devices, skip the custom scroll hijacking entirely and let
    // the OS handle native momentum scrolling — it's smoother and avoids
    // the scroll-fighting that caused lag/stutter on phones.
    if (touchRef.current) {
      document.documentElement.style.scrollBehavior = "auto"
      return
    }

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
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel", onWheel)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  // Expose a smooth scrollTo for nav buttons
  const scrollTo = (target: number | string) => {
    // On touch devices we don't run the rAF lerp loop, so just use the
    // browser's native smooth scroll instead.
    if (touchRef.current) {
      if (typeof target === "string") {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollTo({ top: target, behavior: "smooth" })
      }
      return
    }

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
