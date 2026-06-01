"use client"

import { useEffect, useRef } from "react"

export default function MouseSpotlight() {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = divRef.current
    if (!el) return
<<<<<<< HEAD
    const handleMouseMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(640px circle at ${e.clientX}px ${e.clientY}px, rgba(199,42,42,0.07), rgba(199,42,42,0.02) 35%, transparent 65%)`
    }
=======

    // Use direct DOM style mutation — zero React re-renders, zero GC pressure
    const handleMouseMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(139,58,58,0.10), rgba(139,58,58,0.04) 30%, transparent 60%)`
    }

>>>>>>> 2e75fbc5163599263dac2ce52ccb2b18979f3265
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={divRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  )
}
