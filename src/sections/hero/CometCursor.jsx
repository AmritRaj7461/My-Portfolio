import { useEffect, useState } from "react"

const CometCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Update global CSS variables for the mask effect
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)

      // Check what we are hovering over
      const target = e.target.closest("[data-cursor]")
      if (target) {
        setCursorVariant(target.getAttribute("data-cursor"))
        // Update mask size based on target
        const size = target.getAttribute("data-cursor") === "text-lg" ? "150px" : "60px"
        document.documentElement.style.setProperty('--cursor-size', size)
      } else {
        setCursorVariant("default")
        document.documentElement.style.setProperty('--cursor-size', "0px")
      }
    }

    window.addEventListener("mousemove", mouseMove)
    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  return (
    // The Visual Comet Cursor (Optional: remove if HeroCanvas handles the drawing)
    <div 
      className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-100 ease-out"
      style={{
         transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${cursorVariant === 'text-lg' ? 3 : cursorVariant === 'text-sm' ? 1.5 : 1})`,
         boxShadow: "0 0 20px 2px #22d3ee"
      }}
    />
  )
}

export default CometCursor