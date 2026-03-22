import { useRef, useState, useEffect } from "react"
import gsap from "gsap"

const AboutCard = ({ 
  title, icon, description, accent, uniqueId, 
  isGlobalLocked, getContainerRect, onLock, onUnlock 
}) => {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingProgress, setTypingProgress] = useState(0) 
  const [isActive, setIsActive] = useState(false)

  // --- INTERACTION LOGIC ---
  const handleInteraction = () => {
    if (isGlobalLocked || isActive) return 
    
    // Bounds Check
    if (cardRef.current && getContainerRect) {
        const cardRect = cardRef.current.getBoundingClientRect()
        const containerRect = getContainerRect()
        if (containerRect) {
            const buffer = 20; 
            if (cardRect.left < (containerRect.left + buffer) || cardRect.right > (containerRect.right - buffer)) {
                gsap.to(cardRef.current, { x: [-5, 5, -5, 5, 0], duration: 0.3, ease: "power1.inOut", overwrite: true })
                return 
            }
        }
    }

    setIsActive(true)
    onLock() 

    // ANIMATION: Glass Pop with TILT
    gsap.to(cardRef.current, {
      scale: 1.1, 
      y: -20, // Lift slightly higher
      // NEW: Stronger Random Tilt + 3D Tilt
      rotateZ: Math.random() * 10 - 5, // Random angle between -5 and 5 degrees
      rotateX: -5, // Slight backward tilt for 3D effect
      zIndex: 100, 
      boxShadow: `0 0 60px ${accent}40`, 
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    })

    setIsFlipped(true)
  }

  useEffect(() => {
    if (isFlipped) {
      let currentText = ""
      let charIndex = 0
      
      setDisplayedText("")
      setTypingProgress(0)
      
      const typeInterval = setInterval(() => {
        if (charIndex < description.length) {
          currentText += description.charAt(charIndex)
          setDisplayedText(currentText)
          
          // SYNC MATH
          const progress = ((charIndex + 1) / description.length) * 100
          setTypingProgress(progress)

          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => finishSequence(), 4000) 
        }
      }, 20) 
      return () => clearInterval(typeInterval)
    } else {
       setDisplayedText("")
       setTypingProgress(0)
    }
  }, [isFlipped])

  const finishSequence = () => {
    setIsFlipped(false)
    setTimeout(() => {
      // RESET ANIMATION: Clear all rotations
      gsap.to(cardRef.current, {
        scale: 1, 
        y: 0, 
        rotateZ: 0, 
        rotateX: 0, // Reset the 3D tilt
        zIndex: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.5, ease: "power2.out",
        onComplete: () => { setIsActive(false); onUnlock() }
      })
    }, 600)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleInteraction}
      className={`
        relative flex-shrink-0 mx-6 
        w-64 h-80 md:w-72 md:h-96
        group perspective-1000 cursor-pointer transition-all duration-500
        ${isGlobalLocked && !isActive ? 'grayscale opacity-30 blur-[2px] scale-95 pointer-events-none' : ''}
      `}
    >
      <div 
        className="relative w-full h-full transition-all duration-700 will-change-transform"
        style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        
        {/* --- FRONT SIDE --- */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden" 
             style={{ backfaceVisibility: "hidden", clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <div className="absolute -top-10 -right-10 w-32 h-32 blur-[50px] rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-80" style={{ backgroundColor: accent }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
             <div className="text-6xl mb-8 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transform transition-transform duration-500 group-hover:scale-125" style={{ color: accent }}>
                {icon}
             </div>
             <h3 className="text-2xl font-orbitron font-bold text-white tracking-wider mb-2">{title}</h3>
             <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
             <div className="mt-2 text-[9px] font-mono text-gray-500 tracking-[0.3em]">SECURE_DATA_NODE</div>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center p-6"
             style={{ 
               transform: "rotateY(180deg)", 
               backfaceVisibility: "hidden",
               backgroundColor: "rgba(0, 0, 0, 0.6)", 
               backdropFilter: "blur(20px)",
               boxShadow: `inset 0 0 30px ${accent}10` 
             }}>
          
          {/* SVG BORDER */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
             <rect 
                x="1.5" y="1.5" 
                width="calc(100% - 3px)" height="calc(100% - 3px)" 
                rx="12" ry="12" 
                fill="none" 
                stroke={accent} 
                strokeWidth="3"
                pathLength="100" 
                strokeDasharray="100"
                strokeDashoffset={100 - typingProgress} 
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 8px ${accent})` }} 
             />
          </svg>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

          {/* Text */}
          <p className="font-mono text-sm leading-7 text-left relative z-10" style={{ color: accent }}>
            <span className="opacity-50 mr-2">root@user:~#</span>
            <span className="text-gray-100 drop-shadow-md">{displayedText}</span>
            <span className="inline-block w-2 h-4 ml-1 align-middle animate-pulse bg-white" />
          </p>
        </div>

      </div>
    </div>
  )
}

export default AboutCard