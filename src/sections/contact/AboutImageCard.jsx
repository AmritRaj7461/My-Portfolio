import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

// Removed InertiaPlugin import and registration
gsap.registerPlugin(Draggable)

const AboutImageCard = forwardRef(
  ({ src, index, boundsRef, onRemove }, externalRef) => {
    const ref = useRef(null)
    const draggableRef = useRef(null)

    useImperativeHandle(externalRef, () => ({
      get card() {
        return ref.current
      },
      get draggable() {
        return draggableRef.current
      }
    }))

    useEffect(() => {
      if (!boundsRef?.current || !ref.current) return

      const card = ref.current
      const bounds = boundsRef.current

      // Initial Position
      gsap.set(card, {
        x: index * 16,
        y: index * 16,
        rotateZ: gsap.utils.random(-7, 7),
        zIndex: 100 - index,
        transformPerspective: 1200,
      })

      const draggable = Draggable.create(card, {
        type: "x,y",
        bounds,
        // inertia: true changed to false for free version
        inertia: false,
        edgeResistance: 0.6,
        dragResistance: 0.015,
        onDragEnd: function () {
          // Logic to detect a "throw" without InertiaPlugin
          // If the card is dragged more than 150px from center, we consider it a throw
          const xPos = this.x;
          const yPos = this.y;

          if (Math.abs(xPos) > 150 || Math.abs(yPos) > 150) {
            // Play sound
            const audio = new Audio("/sounds/card-throw.mp3")
            audio.volume = 0.6
            audio.currentTime = 0
            audio.play().catch((e) => console.warn(e))

            this.disable()

            // Calculate exit trajectory
            const angle = Math.atan2(yPos, xPos)
            const distance = 1000
            const destX = xPos + Math.cos(angle) * distance
            const destY = yPos + Math.sin(angle) * distance

            gsap.to(card, {
              x: destX,
              y: destY,
              opacity: 0,
              rotateZ: xPos > 0 ? 90 : -90,
              scale: 0.5,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => onRemove(src),
            })
          }
        }
      })[0]

      draggableRef.current = draggable

      return () => {
        if (draggable) draggable.kill()
      }
    }, [boundsRef, index, onRemove, src])

    const handleMove = (e) => {
      // Removed isThrowing check as it's an Inertia property
      if (draggableRef.current && (draggableRef.current.isDragging || draggableRef.current.isPressed)) return
      const r = ref.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)

      gsap.to(ref.current, {
        rotateX: -dy * 0.1,
        rotateY: dx * 0.1,
        scale: 1.05,
        z: 80,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto"
      })
    }

    const handleLeave = () => {
      if (draggableRef.current && (draggableRef.current.isDragging || draggableRef.current.isPressed)) return
      gsap.to(ref.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      })
    }

    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="
          absolute w-56 h-[22rem] p-2 rounded-[2rem] overflow-hidden 
          cursor-grab active:cursor-grabbing
          will-change-transform bg-slate-950/40 backdrop-blur-xl border border-white/10
          transition-[border-color,box-shadow,opacity] duration-500
          hover:border-cyan-400/80 
          hover:shadow-[0_0_50px_rgba(34,211,238,0.4),_inset_0_0_20px_rgba(34,211,238,0.2)]
          group
        "
      >
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
          <img
            src={src}
            draggable={false}
            className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
            alt="project-card"
          />
          <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] pointer-events-none group-hover:border-cyan-400/30 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-50 group-hover:opacity-10" />
        </div>
      </div>
    )
  }
)

export default AboutImageCard