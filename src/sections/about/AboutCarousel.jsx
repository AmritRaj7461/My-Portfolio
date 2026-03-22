import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import AboutCard from "./AboutCard"
import { FaUserAstronaut, FaCode, FaLightbulb, FaRocket } from "react-icons/fa"

const cardData = [
  { 
    id: 1, 
    title: "Who I Am", 
    icon: <FaUserAstronaut />, 
    accent: "#22d3ee", 
    description: "I'm Amrit, a Full Stack Developer obsessed with crafting pixel-perfect interfaces and scalable backends." 
  },
  { 
    id: 2, 
    title: "My Tech", 
    icon: <FaCode />, 
    accent: "#a855f7", 
    description: "I specialize in the MERN stack, integrating modern tools like Tailwind, GSAP, and Three.js for immersive web experiences." 
  },
  { 
    id: 3, 
    title: "Philosophy", 
    icon: <FaLightbulb />, 
    accent: "#facc15", 
    description: "I believe code is art. It shouldn't just function; it should feel alive, responsive, and intuitive for every user." 
  },
  { 
    id: 4, 
    title: "Goals", 
    icon: <FaRocket />, 
    accent: "#4ade80", 
    description: "Currently diving deep into WebGL and AI integration to build the next generation of intelligent web applications." 
  },
]

const AboutCarousel = () => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const timelineRef = useRef(null)
  const [lockedCardId, setLockedCardId] = useState(null)

  // Triple clone for smoother infinite loop
  const items = [...cardData, ...cardData, ...cardData].map((item, idx) => ({ ...item, uniqueId: `${item.id}-${idx}` }))

  useEffect(() => {
    const wrapper = wrapperRef.current
    const ctx = gsap.context(() => {
      // Infinite Scroll Animation
      timelineRef.current = gsap.to(wrapper, {
        xPercent: -50, // Move half the total width (since we tripled the data, -33% or -50% depends on items, -50 works if we clone enough)
        ease: "none",
        duration: 50, // Slower for better readability
        repeat: -1,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleCardLock = (uniqueId) => {
    setLockedCardId(uniqueId)
    timelineRef.current?.pause()
  }

  const handleCardUnlock = () => {
    setLockedCardId(null)
    timelineRef.current?.play()
  }

  const getContainerRect = useCallback(() => {
    return containerRef.current?.getBoundingClientRect()
  }, [])

  return (
    <div 
        ref={containerRef} 
        // FIX: Increased height and padding to allow cards to POP without getting cut off
        className="w-full h-[600px] overflow-hidden py-20 relative z-20 flex items-center select-none"
        style={{ 
            // Mask fades the left and right edges so cards disappear smoothly
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
    >
        <div 
            ref={wrapperRef} 
            className="flex items-center w-fit px-4"
        >
            {items.map((item) => (
                <AboutCard 
                    key={item.uniqueId} 
                    {...item}
                    uniqueId={item.uniqueId}
                    isGlobalLocked={lockedCardId !== null && lockedCardId !== item.uniqueId}
                    getContainerRect={getContainerRect}
                    onLock={() => handleCardLock(item.uniqueId)}
                    onUnlock={handleCardUnlock}
                />
            ))}
        </div>
    </div>
  )
}

export default AboutCarousel