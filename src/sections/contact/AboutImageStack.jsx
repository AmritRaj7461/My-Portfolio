import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import AboutImageCard from "./AboutImageCard"

const initialImages = [
  "/projects/mypic.jpeg",
  "/projects/Hack.avif",
  "/projects/code_lap1.jpg",
  "/projects/code_console.png",
]

const AboutImageStack = () => {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const [images, setImages] = useState(initialImages)
  const hasAnimatedRef = useRef(false)
  const sequenceTimer = useRef(null)

  const removeImage = (src) => {
    setImages((prev) => prev.filter((img) => img !== src))
  }

  const playSound = () => {
    const audio = new Audio("/sounds/card-throw.mp3")
    audio.volume = 0.5
    audio.currentTime = 0
    audio.play().catch((e) => console.warn("Sound play failed", e))
  }

  useEffect(() => {
    if (images.length === 0) {
      const timer = setTimeout(() => {
        hasAnimatedRef.current = false
        setImages(initialImages)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [images])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            if (sequenceTimer.current?.kill) sequenceTimer.current.kill()
            playSound()
            animateSpread()
          }
        } else {
          hasAnimatedRef.current = false
          if (sequenceTimer.current?.kill) sequenceTimer.current.kill()
          animateStack(true)
        }
      },
      { threshold: 0.4 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [images])

  const animateSpread = () => {
    const angles = [20, 6, -6, -20]
    const tl = gsap.timeline({
      onComplete: () => {
        cardRefs.current.forEach((ref) => {
          if (ref?.draggable) ref.draggable.enable()
        })
      }
    })

    sequenceTimer.current = tl

    cardRefs.current.forEach((ref) => {
      if (ref?.draggable) ref.draggable.disable()
    })

    // PHASE 1: Fan out
    cardRefs.current.forEach((ref, i) => {
      if (!ref || !ref.card) return
      gsap.set(ref.card, { transformOrigin: "50% 150%" })

      tl.to(ref.card, {
        x: 0,
        y: -30,
        rotateZ: angles[i % 4],
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      }, "<0.1")
    })

    // PHASE 2: 360 Rotation + Dynamic Scaling
    // We shrink then grow back to 1 within the same rotation duration
    tl.add("orbit", "+=1")
    cardRefs.current.forEach((ref) => {
      if (!ref || !ref.card) return

      // Rotate full 360
      tl.to(ref.card, {
        rotateZ: "+=360",
        duration: 2,
        ease: "power2.inOut"
      }, "orbit")

      // Shrink and then grow back to 1.0 specifically before rotation ends
      tl.to(ref.card, {
        scale: 0.5,
        duration: 1,
        ease: "power2.in",
      }, "orbit")

      tl.to(ref.card, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, "orbit+=1")
    })

    // PHASE 3: Return to stack at full size
    tl.add("stack", "-=0.2")
    cardRefs.current.forEach((ref, i) => {
      if (!ref || !ref.card) return
      tl.to(ref.card, {
        x: i * 10,
        y: i * 10,
        scale: 1,
        rotateZ: gsap.utils.random(-5, 5),
        duration: 0.8,
        ease: "back.out(1.1)",
        onComplete: () => {
          gsap.set(ref.card, { transformOrigin: "50% 50%" })
        }
      }, "stack+=" + (i * 0.1))
    })
  }

  const animateStack = (instant = false) => {
    cardRefs.current.forEach((ref, i) => {
      if (!ref || !ref.card) return
      gsap.to(ref.card, {
        x: i * 10,
        y: i * 10,
        scale: 1,
        rotateZ: gsap.utils.random(-5, 5),
        duration: instant ? 0.5 : 1.2,
        ease: instant ? "power2.out" : "elastic.out(1, 0.5)",
        delay: instant ? 0 : i * 0.1,
        overwrite: "auto",
        onComplete: () => {
          if (ref.draggable) ref.draggable.enable()
        }
      })
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center perspective-1000"
    >
      {images.map((img, i) => (
        <AboutImageCard
          key={img}
          ref={(el) => (cardRefs.current[i] = el)}
          src={img}
          index={i}
          boundsRef={containerRef}
          onRemove={removeImage}
        />
      ))}
    </div>
  )
}

export default AboutImageStack