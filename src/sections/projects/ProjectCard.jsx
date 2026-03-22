import { useRef, useState, useEffect } from "react"
// Ensure all icons are imported
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaBolt, FaFingerprint, FaCode } from "react-icons/fa"
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiPostgresql, SiHtml5, SiTailwindcss, SiJavascript, SiPhp, SiFramer, SiChartdotjs, SiExpress, SiCplusplus, SiPython, SiOpenai } from "react-icons/si"
import gsap from "gsap"

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imageRef = useRef(null)
  const scannerRef = useRef(null) // Ref for the laser scanner

  // --- ANIMATION LOGIC ---
  const handleMouseMove = (e) => {
    if (!cardRef.current || !imageContainerRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const xNorm = (e.clientX - rect.left) / rect.width * 2 - 1
    const yNorm = (e.clientY - rect.top) / rect.height * 2 - 1
    
    // Spotlight variables
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)

    // Lightweight glow and scale effect (Optimized for performance)
    gsap.to(cardRef.current, {
      scale: 1.015,
      boxShadow: `0 0 40px ${project.color}40`,
      borderColor: `${project.color}80`,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    })
  }

  const handleMouseEnter = () => {
    // Start Scanner Animation
    gsap.to(scannerRef.current, {
        y: "400%", // Move down
        opacity: 1,
        duration: 1.5,
        repeat: -1,
        ease: "linear"
    })
  }

  const handleMouseLeave = () => {
    // Reset Everything smoothly
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: `0 0 0 rgba(0,0,0,0)`,
      borderColor: 'rgba(255,255,255,0.1)',
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    })
    gsap.killTweensOf(scannerRef.current)
    gsap.to(scannerRef.current, { opacity: 0, y: "-100%", duration: 0.2 })
  }

  // Tech Icon Helper
  const getTechIcon = (tech) => {
      const t = tech.toLowerCase();
      if (t.includes("react")) return <SiReact />;
      if (t.includes("next")) return <SiNextdotjs />;
      if (t.includes("node")) return <SiNodedotjs />;
      if (t.includes("mongo")) return <SiMongodb />;
      if (t.includes("postgre")) return <SiPostgresql />;
      if (t.includes("html")) return <SiHtml5 />;
      if (t.includes("tailwind")) return <SiTailwindcss />;
      if (t.includes("java") || t.includes("js")) return <SiJavascript />;
      if (t.includes("php")) return <SiPhp />;
      if (t.includes("framer")) return <SiFramer />;
      if (t.includes("chart")) return <SiChartdotjs />;
      if (t.includes("express")) return <SiExpress />;
      if (t.includes("c++")) return <SiCplusplus />;
      if (t.includes("python")) return <SiPython />;
      if (t.includes("gemini") || t.includes("ai")) return <SiOpenai />;
      return <FaCode />;
  }

  return (
    <div style={{ perspective: "2500px" }} className="w-full">
        
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
            group relative w-full rounded-[3rem] 
            bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-slate-950/95 
            backdrop-blur-2xl border border-white/10 
            overflow-visible cursor-pointer transition-colors duration-500 
            hover:border-cyan-500/40
            h-auto lg:h-[480px] /* EXACT DESKTOP HEIGHT FOR FULL UNIFORMITY */
        `}
        style={{ transformStyle: "preserve-3d" }} 
      >
        
        {/* --- DYNAMIC BACKGROUND NOISE --- */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0 pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            {/* Spotlight Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${project.color}10, transparent 40%)` }}
            />
        </div>

        {/* --- FLEX CONTAINER --- */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full">

          {/* === TOP/LEFT SIDE: INFO DASHBOARD === */}
          <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center relative flex-1 pointer-events-none md:pointer-events-auto">
             
             {/* Tech Header */}
             <div className="flex items-center gap-3 mb-6">
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-white/10 shadow-inner">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }}/>
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Sys_Node_0{index + 1}</span>
                 </div>
                 <div className="h-[1px] w-12 bg-white/10 group-hover:w-24 transition-all duration-500" />
             </div>

             {/* Title with Color Shift */}
             <h3 
                className="text-4xl md:text-5xl font-black font-orbitron text-white mb-6 leading-tight transition-colors duration-300 group-hover:text-[var(--hover-color)] drop-shadow-lg"
                style={{ '--hover-color': project.color }}
             >
                 {project.title}
             </h3>

             {/* Description with Decor Line */}
             <div className="relative pl-6 mb-8 flex-1">
                 <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800 group-hover:bg-[var(--hover-color)] transition-colors duration-500" style={{ '--hover-color': project.color }}/>
                 {/* line-clamp prevents massive descriptions from stretching the 480px height! */}
                 <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
                     {project.description}
                 </p>
             </div>

             {/* Interactive Tech Chips */}
             <div className="flex flex-wrap gap-3 mb-10">
                 {project.tech.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 border border-white/5 rounded-lg text-xs font-bold text-gray-300 uppercase tracking-wider group-hover:border-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all">
                       <span style={{ color: project.color }}>{getTechIcon(t)}</span> {t}
                    </div>
                 ))}
             </div>

             {/* Action Button */}
             <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 group-hover:translate-x-4 group-hover:text-white text-gray-400">
                 <FaBolt style={{ color: project.color }} /> Initiate Protocol
             </div>

          </div>


          {/* === BOTTOM/RIGHT SIDE: IMAGES === */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-center relative lg:mt-0 h-[300px] lg:h-full">
              
              {/* FLAT IMAGE CONTAINER */}
              <div 
                  ref={imageContainerRef}
                  className="relative w-full h-full lg:aspect-auto rounded-2xl bg-slate-900 z-20 overflow-hidden group-hover:border-[1px] group-hover:border-white/20 transition-colors"
              >
                 
                 {/* 1. LASER SCANNER BEAM */}
                 <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-30" style={{ transform: "translateZ(1px)" }}>
                     <div 
                        ref={scannerRef}
                        className="w-full h-[2px] opacity-0 shadow-[0_0_15px_white]"
                        style={{ backgroundColor: project.color, transform: "translateY(-10px)" }}
                     />
                 </div>

                 {/* The Image */}
                 <div className="absolute inset-0 overflow-hidden">
                    <div 
                        ref={imageRef}
                        className="w-full h-full bg-cover bg-center transition-all duration-700 filter grayscale-[40%] group-hover:grayscale-0"
                        style={{ backgroundImage: `url(${project.image})` }}
                    >
                       <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500" />
                       <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
                    </div>
                 </div>

                 {/* Status Badge */}
                 <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white shadow-xl pointer-events-none">
                    <span className="w-1 h-1 inline-block bg-green-500 rounded-full mr-2 animate-pulse" />
                    ONLINE
                 </div>

              </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectCard