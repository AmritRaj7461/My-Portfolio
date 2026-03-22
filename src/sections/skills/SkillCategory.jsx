import { useEffect, useRef, useState, useMemo } from "react"
import gsap from "gsap"
import SkillOrb from "./SkillOrb"
import SkillDetails from "./SkillDetails"

const SkillCategory = ({ title, skills, tiltDirection = "left" }) => {
  const containerRef = useRef(null)
  const ringRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  const activeSkill = useMemo(() => skills[activeIndex], [skills, activeIndex])

  // --- CONFIGURATION ---
  // 1. Dynamic Radius: Keep big radius for crowded rings, small for others
  const isCrowded = skills.length > 8
  const radius = isCrowded ? 150 : 100 

  // 2. Uniform Height: FIXED to 420px for EVERYONE so the grid aligns perfectly
  const containerHeight = "h-[420px]" 
  // ---------------------

  const getCoords = (index, total) => {
    const angle = (index / total) * Math.PI * 2
    const offset = radius + 40
    return {
      x: Math.cos(angle) * radius + offset,
      y: Math.sin(angle) * radius + offset
    }
  }

  const lines = useMemo(() => {
    const connections = []
    skills.forEach((skill, i) => {
      if (!skill.related) return
      skill.related.forEach(targetId => {
        const targetIndex = skills.findIndex(s => s.id === targetId)
        if (targetIndex !== -1 && i < targetIndex) {
          connections.push({
            id: `${skill.id}-${targetId}`,
            start: getCoords(i, skills.length),
            end: getCoords(targetIndex, skills.length)
          })
        }
      })
    })
    return connections
  }, [skills, radius])

  useEffect(() => {
    if (isPaused) return
    const cycle = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length)
    }, 3000)
    return () => clearInterval(cycle)
  }, [isPaused, skills.length])

  useEffect(() => {
    const ring = ringRef.current
    const orbs = containerRef.current.querySelectorAll(".orb-content")
    
    gsap.killTweensOf(ring)
    gsap.killTweensOf(orbs)

    gsap.to(ring, {
      rotation: tiltDirection === "left" ? 360 : -360,
      duration: 40 + Math.random() * 10,
      repeat: -1,
      ease: "none",
    })

    gsap.to(orbs, {
      rotation: tiltDirection === "left" ? -360 : 360,
      duration: 40 + Math.random() * 10,
      repeat: -1,
      ease: "none",
    })
  }, [tiltDirection])

  return (
    <div className="flex flex-col h-full gap-6">
      <div 
        // Applying the uniform height here
        className={`relative ${containerHeight} bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden group transition-all duration-500`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
           className="absolute inset-0 transition-colors duration-700 opacity-20 pointer-events-none"
           style={{ background: `radial-gradient(circle at 50% 50%, ${activeSkill.color}, transparent 70%)` }}
        />

        <h3 className="
          absolute top-6 w-full text-center z-20 pointer-events-none
          font-orbitron text-sm font-bold tracking-[0.2em] uppercase
          text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
        ">
          {title}
        </h3>

        <div 
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center perspective-800"
        >
          <div 
            className="relative flex items-center justify-center transform-style-3d"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(45deg) rotateY(${tiltDirection === "left" ? 10 : -10}deg)` 
            }}
          >
            <div className="absolute w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ transform: 'translateZ(0px)' }}>
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-ping" />
            </div>

            <div ref={ringRef} className="absolute flex items-center justify-center transform-style-3d" style={{ width: '100%', height: '100%' }}>
              
              {/* --- SVG LINES LAYER --- */}
              <svg 
                className="absolute pointer-events-none" 
                style={{ 
                    width: `${(radius * 2) + 80}px`, 
                    height: `${(radius * 2) + 80}px`, 
                    transform: 'translate(-50%, -50%)', 
                    left: '50%', 
                    top: '50%' 
                }}
              >
                 {lines.map(line => (
                   <line 
                     key={line.id}
                     x1={line.start.x} y1={line.start.y}
                     x2={line.end.x} y2={line.end.y}
                     stroke="white" 
                     strokeWidth="1" 
                     strokeOpacity="0.15" 
                     strokeDasharray="4 4"
                   />
                 ))}
              </svg>

              <div 
                className="absolute border border-white/10 rounded-full pointer-events-none"
                style={{ inset: `-${radius}px` }} 
              />
              
              {skills.map((skill, i) => (
                <SkillOrb 
                  key={skill.id} 
                  skill={skill} 
                  index={i} 
                  total={skills.length} 
                  radius={radius} 
                  isActive={i === activeIndex}
                  onHover={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[240px] bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col justify-center">
         <SkillDetails skill={activeSkill} />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gradient-to-b from-white/20 to-transparent -mt-5" />
      </div>
    </div>
  )
}

export default SkillCategory