import { useRef, useEffect } from "react"
import gsap from "gsap"
import { usePortfolio } from "../../context/PortfolioContext"

const SkillOrb = ({ skill, index, total, radius, onHover, isActive }) => {
  const ref = useRef(null)
  const glowRef = useRef(null)
  const Icon = skill.icon
  
  // 1. Consume Context for Filtering
  const { selectedTech, toggleTech } = usePortfolio()
  
  // Check if this specific skill is currently selected
  const isSelected = selectedTech === skill.name

  // 2. Sound Effect
  const playSound = () => {
    // Ensure 'hover.mp3' exists in public/sounds/, or you can remove this function
    const audio = new Audio("/sounds/hover.mp3") 
    audio.volume = 0.2
    audio.play().catch(() => {}) 
  }

  useEffect(() => {
    // Position the orb on the circle
    const angle = (index / total) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    gsap.set(ref.current, { x, y })
  }, [index, total, radius])

  useEffect(() => {
    // Animate if Active (hovered) OR Selected (clicked)
    if (isActive || isSelected) {
      gsap.to(ref.current, { scale: 1.3, zIndex: 100, duration: 0.4, ease: "back.out(2)" })
      gsap.to(glowRef.current, { opacity: 0.8, scale: 2, duration: 0.4 })
    } else {
      gsap.to(ref.current, { scale: 1, zIndex: 10, duration: 0.4, ease: "power2.out" })
      gsap.to(glowRef.current, { opacity: 0, scale: 0.5, duration: 0.4 })
    }
  }, [isActive, isSelected])

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        onHover()
        playSound()
      }}
      onClick={(e) => {
        e.stopPropagation()
        toggleTech(skill.name) // <--- Triggers the "Neural Link" Filter
      }}
      className="absolute flex items-center justify-center cursor-pointer will-change-transform"
      style={{ width: "4rem", height: "4rem" }} 
    >
      <div className="orb-content relative flex items-center justify-center w-full h-full">
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full blur-lg transition-opacity"
          style={{ backgroundColor: skill.color, opacity: 0 }}
        />
        
        <div
          className="
            relative w-full h-full rounded-full 
            flex items-center justify-center
            bg-slate-900 border 
            shadow-sm hover:border-white/50 transition-all duration-300
          "
          style={{ 
            // Highlight border white if selected
            borderColor: isSelected ? '#fff' : 'rgba(255,255,255,0.1)',
            boxShadow: isActive || isSelected ? `0 0 25px ${skill.color}70` : ''
          }}
        >
          <Icon 
            className="text-3xl transition-all duration-300" 
            style={{ color: isActive || isSelected ? '#fff' : skill.color }} 
          />
        </div>
      </div>
    </div>
  )
}

export default SkillOrb