import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaCode, FaGraduationCap, FaBriefcase, FaRocket, FaAtom } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const historyData = [
  {
    year: "2021",
    title: "System Initialization",
    role: "Hello World",
    description: "Wrote my first line of code. The journey into logic and syntax began here.",
    icon: <FaCode />,
    color: "#22d3ee" // Cyan
  },
  {
    year: "2023",
    title: "Knowledge Upgrade",
    role: "Full Stack Development",
    description: "Mastered the MERN stack. Built my first scalable applications and deployed to the cloud.",
    icon: <FaGraduationCap />,
    color: "#a855f7" // Purple
  },
  {
    year: "2024",
    title: "Professional Deployment",
    role: "Freelance & Projects",
    description: "Started delivering professional solutions. Focused on UI/UX and performance optimization.",
    icon: <FaBriefcase />,
    color: "#facc15" // Yellow
  },
  {
    year: "2025",
    title: "Current Trajectory",
    role: "Next-Gen Tech",
    description: "Diving deep into WebGL (Three.js) and AI integration to build immersive web experiences.",
    icon: <FaRocket />,
    color: "#4ade80" // Green
  },
]

// --- SUB-COMPONENT: HACKER DECODING TEXT ---
const HackerText = ({ text, isHovered }) => {
  const [displayText, setDisplayText] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*"

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text)
      return
    }

    let iterations = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      if (iterations >= text.length) clearInterval(interval)
      iterations += 1 / 2
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span>{displayText}</span>
}

// --- SUB-COMPONENT: 3D TILT CARD ---
const HoloCard = ({ item, isLeft }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10 // Max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * 10

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.1,
      ease: "power1.out"
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    })
  }

  return (
    <div 
      className="relative group perspective-1000 z-10 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className={`
          relative p-8 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 
          transform-style-3d transition-shadow duration-500
          hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] hover:border-cyan-400/50
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* HOLOGRAPHIC SHINE LAYER */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" 
             style={{ transform: "translateZ(20px)" }} />
        
        {/* CONNECTION BEAM */}
        <div className={`
            hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent
            ${isLeft ? '-right-12 w-12 rotate-180' : '-left-12 w-12'}
            opacity-50
        `}>
             {/* Pulse Packet */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
        </div>

        {/* CONTENT LAYER (Floating above card) */}
        <div className="relative" style={{ transform: "translateZ(30px)" }}>
            
            {/* Year Badge */}
            <div className={`absolute -top-10 ${isLeft ? 'right-0' : 'left-0'} px-3 py-1 bg-black/50 border border-cyan-500 rounded text-cyan-400 font-mono text-xs shadow-[0_0_15px_rgba(34,211,238,0.2)]`}>
                {item.year}
            </div>

            <h4 className="text-2xl font-bold text-white mb-2 mt-2 group-hover:text-cyan-300 transition-colors">
                <HackerText text={item.title} isHovered={isHovered} />
            </h4>
            
            <p className="text-xs font-mono text-purple-400 mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
                <FaAtom className="animate-spin-slow" /> {item.role}
            </p>
            
            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-cyan-400/50 transition-colors">
               {item.description}
            </p>
        </div>

        {/* CORNER DECORS */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-cyan-400 transition-colors" style={{ transform: "translateZ(10px)" }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-cyan-400 transition-colors" style={{ transform: "translateZ(10px)" }} />

      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
const MissionLog = () => {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SPINE ANIMATION
      gsap.fromTo(lineRef.current, 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1, 
          }
        }
      )
      
      // CARD REVEAL
      gsap.utils.toArray(".mission-row").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, y: 0, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto mt-40 px-4 md:px-0">
      
      {/* HEADER */}
      <div className="text-center mb-28 relative z-10">
         <div className="inline-block relative group">
            <h3 className="text-4xl font-black font-orbitron text-white tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                My Journey
            </h3>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent group-hover:via-cyan-400 transition-all duration-500" />
         </div>
      </div>

      {/* CHRONO SPINE */}
      <div className="absolute left-4 md:left-1/2 top-24 bottom-0 w-[4px] bg-slate-800 -translate-x-1/2 rounded-full z-0 overflow-hidden">
         <div ref={lineRef} className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_20px_#22d3ee]" />
      </div>

      {/* LOG ENTRIES */}
      <div className="flex flex-col gap-32 pb-20">
        {historyData.map((item, idx) => {
          const isLeft = idx % 2 === 0
          
          return (
            <div 
              key={idx} 
              className={`mission-row relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* CARD SIDE */}
              <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                 <HoloCard item={item} isLeft={isLeft} />
              </div>

              {/* REACTOR NODE (Center) */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-24 h-24 z-20 flex items-center justify-center">
                 
                 {/* 1. Orbiting Electron */}
                 <div className="absolute w-full h-full animate-[spin_4s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
                 </div>

                 {/* 2. Reverse Ring */}
                 <div className="absolute w-16 h-16 border border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                 
                 {/* 3. Static Hex Core */}
                 <div 
                    className="relative w-12 h-12 bg-slate-950 flex items-center justify-center z-10"
                    style={{ 
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        boxShadow: `inset 0 0 20px ${item.color}60`,
                        border: `1px solid ${item.color}`
                    }}
                 >
                    <div className="text-lg drop-shadow-[0_0_5px_white]" style={{ color: item.color }}>
                        {item.icon}
                    </div>
                 </div>

              </div>

              {/* SPACER */}
              <div className="hidden md:block w-[45%]" />

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MissionLog