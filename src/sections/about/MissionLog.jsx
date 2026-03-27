import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaCode, FaGraduationCap, FaBriefcase, FaRocket, FaAtom } from "react-icons/fa"
import { SiMongodb, SiReact, SiNodedotjs, SiThreedotjs, SiTailwindcss, SiJavascript, SiGooglecloud, SiCplusplus } from "react-icons/si"

gsap.registerPlugin(ScrollTrigger)

const historyData = [
  {
    year: "2021",
    title: "System Initialization",
    role: "Hello World",
    description: "Wrote my first line of code. The journey into logic and syntax began here, establishing the core foundations.",
    icon: <FaCode />,
    color: "#22d3ee", // Cyan
    tech: [SiJavascript, SiCplusplus, SiTailwindcss]
  },
  {
    year: "2023",
    title: "Knowledge Upgrade",
    role: "Full Stack Development",
    description: "Mastered the MERN stack. Built my first scalable applications, handled complex databases, and deployed to the cloud.",
    icon: <FaGraduationCap />,
    color: "#a855f7", // Purple
    tech: [SiMongodb, SiReact, SiNodedotjs]
  },
  {
    year: "2024",
    title: "Professional Deployment",
    role: "Freelance & Projects",
    description: "Started delivering professional client solutions. Focused strictly on premium UI/UX, robust performance, and SEO optimization.",
    icon: <FaBriefcase />,
    color: "#facc15", // Yellow
    tech: [SiReact, SiGooglecloud, SiTailwindcss]
  },
  {
    year: "2025",
    title: "Current Trajectory",
    role: "Next-Gen Tech",
    description: "Diving deep into WebGL (Three.js), AI integration, and advanced frontend architectures to build highly immersive, interactive web experiences.",
    icon: <FaRocket />,
    color: "#4ade80", // Green
    tech: [SiThreedotjs, SiReact, SiNodedotjs]
  },
]

// --- HACKER DECODING TEXT ---
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
      iterations += 1 / 3 // Smooth decode speed
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span>{displayText}</span>
}

// --- PREMIUM GLASSMORPHIC TILT CARD ---
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
    
    // Smooth, performance-friendly 3D Tilt
    gsap.to(cardRef.current, {
      rotateX: -((y - centerY) / centerY) * 8, // Max 8 degree tilt
      rotateY: ((x - centerX) / centerX) * 8,
      duration: 0.5,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
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
        className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/5 transform-style-3d transition-all duration-500 overflow-hidden hover:border-white/20 will-change-transform shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Inner Glow mapped to theme color */}
        <div 
          className="absolute -inset-10 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-3xl pointer-events-none" 
          style={{ backgroundColor: item.color }} 
        />

        {/* Cyber Grid Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
        />

        {/* Content Layer (Pushed forward in 3D Space) */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
            
            {/* Top Bar: Year & Tech Badges */}
            <div className="flex justify-between items-start mb-8 gap-4 flex-wrap">
                <span 
                   className="px-5 py-2 rounded-full text-xs font-mono font-bold tracking-widest bg-slate-950 border border-white/10 text-white shadow-lg" 
                   style={{ borderColor: `${item.color}50`, color: item.color }}
                >
                    {item.year}
                </span>
                
                <div className="flex gap-2.5">
                   {item.tech.map((Icon, idx) => (
                       <div key={idx} className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-sm text-gray-400 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1" style={{ transitionDelay: `${idx * 50}ms` }}>
                          <Icon />
                       </div>
                   ))}
                </div>
            </div>

            {/* Main Content */}
            <h4 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-wide transition-all group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                <HackerText text={item.title} isHovered={isHovered} /> 
            </h4>
            
            <p className="text-sm font-mono tracking-[0.2em] uppercase flex items-center gap-3 mb-6" style={{ color: item.color }}>
                <FaAtom className="animate-spin-slow opacity-80 text-lg" /> {item.role}
            </p>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed border-l-2 pl-5 transition-colors duration-500" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
               {item.description}
            </p>
        </div>

        {/* Decorative Sci-Fi Brackets */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/10 opacity-30 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-500 rounded-tl-3xl pointer-events-none" style={{ borderColor: item.color, transform: "translateZ(10px)" }} />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/10 opacity-30 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-500 rounded-br-3xl pointer-events-none" style={{ borderColor: item.color, transform: "translateZ(10px)" }} />

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
      
      // 1. GLOWING NEON LASER SPINE ANIMATION
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1, 
          }
        }
      )
      
      // 2. CINEMATIC 3D CARD ENTRANCES
      gsap.utils.toArray(".mission-row").forEach((el, index) => {
        const isLeft = index % 2 === 0;
        
        gsap.fromTo(el,
          { 
              opacity: 0, 
              x: isLeft ? -100 : 100, 
              rotationY: isLeft ? 15 : -15 
          },
          { 
            opacity: 1, 
            x: 0, 
            rotationY: 0, 
            duration: 1.2, 
            ease: "expo.out",
            scrollTrigger: { 
                trigger: el, 
                start: "top 80%",
                // Plays when scrolling down, does not reverse so user can read smoothly, 
                // but re-triggers if they scroll all the way back up
                toggleActions: "play none none reverse" 
            }
          }
        )
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto mt-40 px-4 md:px-0">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-32 relative z-10">
         <div className="inline-block relative group">
            <h3 className="text-4xl md:text-6xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                My Journey
            </h3>
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] scale-x-50 group-hover:scale-x-100 transition-transform duration-700" />
         </div>
         <p className="text-slate-400 mt-6 font-mono text-sm max-w-xl mx-auto">Tracing the timeline of skills acquired, systems built, and technologies mastered in my developer career.</p>
      </div>

      {/* GLOWING LASER SPINE CONTAINER */}
      <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[2px] bg-slate-900/50 -translate-x-1/2 z-0">
         {/* The fill laser */}
         <div 
             ref={lineRef} 
             className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_20px_#22d3ee,0_0_40px_rgba(168,85,247,0.5)] origin-top will-change-transform" 
         />
      </div>

      {/* LOG ENTRIES */}
      <div className="flex flex-col gap-28 md:gap-40 pb-20">
        {historyData.map((item, idx) => {
          const isLeft = idx % 2 === 0
          
          return (
            <div 
              key={idx} 
              className={`mission-row relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* INTERACTIVE CARD SIDE */}
              <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-12 md:pl-0`}>
                 <HoloCard item={item} isLeft={isLeft} />
              </div>

              {/* NEXT-LEVEL REACTOR NODE (Center) */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 z-20 flex items-center justify-center">
                 
                 {/* Outer Core Ring */}
                 <div className="absolute inset-0 bg-slate-950 rounded-full border border-white/10 shadow-2xl" />

                 {/* Rotating Dashed Ring (Radar effect) */}
                 <div 
                    className="absolute inset-[2px] rounded-full animate-[spin_8s_linear_infinite_reverse] border-2 border-dashed border-white/20" 
                    style={{ borderColor: `${item.color}40` }}
                 />

                 {/* Inner Pulsing Core */}
                 <div className="absolute inset-4 rounded-full bg-slate-900 border" style={{ borderColor: `${item.color}50`, boxShadow: `inset 0 0 20px ${item.color}30` }}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: item.color }} />
                 </div>

                 {/* Center Holographic Icon */}
                 <div className="relative z-10 text-xl md:text-3xl drop-shadow-[0_0_15px_currentColor]" style={{ color: item.color }}>
                    {item.icon}
                 </div>

                 {/* Subtle glowing connection laser to the card */}
                 <div 
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] ${isLeft ? 'right-full w-16' : 'left-full w-16'}`} 
                    style={{ background: `linear-gradient(to ${isLeft ? 'left' : 'right'}, ${item.color}, transparent)` }} 
                 />
                 
              </div>

              {/* EMPTY SPACER FOR OPPOSITE SIDE (Maintains layout structure) */}
              <div className="hidden md:block w-[45%]" />

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MissionLog