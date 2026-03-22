import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const Cursor = () => {
  const cursorRef = useRef(null)
  
  // Physics State
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  
  const [state, setState] = useState("default")
  const prevState = useRef("default")

  useEffect(() => {
    let exitTimer = null

    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      const el = e.target.closest("[data-cursor]")
      const next = el ? el.getAttribute("data-cursor") : "default"

      if (next !== state) {
        if (exitTimer) clearTimeout(exitTimer)
        prevState.current = state 
        setState(next)
      }

      if (next !== "default") {
        document.body.classList.add("cursor-hover-active")
      } else {
        if (!exitTimer) {
          exitTimer = setTimeout(() => {
            document.body.classList.remove("cursor-hover-active")
            exitTimer = null
          }, 100)
        }
      }
    }

    window.addEventListener("pointermove", move)
    return () => {
      window.removeEventListener("pointermove", move)
      document.body.classList.remove("cursor-hover-active")
      clearTimeout(exitTimer)
    }
  }, [state])

  // Physics Loop
  useEffect(() => {
    const tick = () => {
      // 0.20 Ease must match CometCanvas exactly
      pos.current.x += (mouse.current.x - pos.current.x) * 0.20
      pos.current.y += (mouse.current.y - pos.current.y) * 0.20

      gsap.set(cursorRef.current, {
        x: pos.current.x,
        y: pos.current.y,
        // 🔥 CRITICAL FIX: Force GSAP to handle centering
        xPercent: -50,
        yPercent: -50
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  // Animation Loop
  useEffect(() => {
    const map = {
      "text-lg": 170,
      "text-sm": 90,
      hover: 50,
      default: 0,
    }

    // Determine easing
    const isShrinking = map[state] < map[prevState.current] && state !== "default"
    const ease = isShrinking ? "power3.out" : "back.out(1.4)"
    const duration = isShrinking ? 0.25 : 0.4

    gsap.to(cursorRef.current, {
      width: map[state],
      height: map[state],
      backgroundColor: state === "default" ? "transparent" : "#ffffff",
      opacity: state === "default" ? 0 : 1,
      duration: duration,
      ease: ease,
      overwrite: true,
    })
  }, [state])

  return (
    <div
      ref={cursorRef}
      // REMOVED -translate-x-1/2 and -translate-y-1/2 from className
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-difference shadow-[0_0_30px_rgba(255,255,255,0.3)]"
    />
  )
}

export default Cursor