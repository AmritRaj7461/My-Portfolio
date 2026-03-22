import { useEffect, useRef } from "react"

const CometCanvas = () => {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const trail = useRef([])
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("pointermove", move)

    const draw = () => {
      // 1. Check if we should hide
      if (document.body.classList.contains("cursor-hover-active")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        trail.current = [] 
        particles.current = []
        // We CONTINUE to update 'pos' even while hidden, 
        // so when it reappears, it's at the mouse, not trailing behind.
        pos.current.x += (mouse.current.x - pos.current.x) * 0.15
        pos.current.y += (mouse.current.y - pos.current.y) * 0.15
        return requestAnimationFrame(draw)
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 2. Physics (Matched to Cursor.jsx)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15

      trail.current.push({ ...pos.current })
      if (trail.current.length > 25) trail.current.shift()

      // Particles Logic
      if (Math.random() > 0.25) {
        particles.current.push({
          x: pos.current.x,
          y: pos.current.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.4 ? "#22d3ee" : "#ffffff",
        })
      }

      // Draw Tail
      if (trail.current.length > 2) {
        ctx.beginPath()
        ctx.moveTo(trail.current[0].x, trail.current[0].y)
        for (let i = 1; i < trail.current.length; i++) {
            ctx.lineTo(trail.current[i].x, trail.current[i].y)
        }
        
        const g = ctx.createLinearGradient(
          trail.current[0].x, trail.current[0].y,
          pos.current.x, pos.current.y
        )
        g.addColorStop(0, "transparent")
        g.addColorStop(1, "#22d3ee")

        ctx.strokeStyle = g
        ctx.lineWidth = 6
        ctx.lineCap = "round"
        ctx.shadowBlur = 20
        ctx.shadowColor = "#22d3ee"
        ctx.stroke()
      }

      // Draw Head
      const glow = ctx.createRadialGradient(
        pos.current.x, pos.current.y, 0,
        pos.current.x, pos.current.y, 18
      )
      glow.addColorStop(0, "#ffffff")
      glow.addColorStop(0.3, "#22d3ee")
      glow.addColorStop(1, "transparent")

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(pos.current.x, pos.current.y, 18, 0, Math.PI * 2)
      ctx.fill()

      // Draw Particles
      particles.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        if (p.life <= 0) particles.current.splice(i, 1)
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", move)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9996 }}
    />
  )
}

export default CometCanvas