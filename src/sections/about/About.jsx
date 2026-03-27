import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutGrid from "./AboutGrid"
import { FaDownload } from "react-icons/fa"
import HudOverlay from "./HudOverlay"
import MissionLog from "./MissionLog" // <--- IMPORT THIS

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const titleRef = useRef(null)

  useEffect(() => {
    // ... your existing GSAP code for title ...
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      )
    }, titleRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative min-h-screen py-24 bg-transparent overflow-hidden flex flex-col justify-center">
      
      <HudOverlay /> 

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div ref={titleRef} className="mb-10 relative">
          <h2 className="absolute -top-12 -left-4 md:-left-10 text-[6rem] md:text-[9rem] font-poppins font-black text-transparent opacity-5 select-none pointer-events-none z-0"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
            PROFILE
          </h2>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-4">
            <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white leading-none">About</h2>
            <span className="font-cursive text-5xl md:text-8xl text-cyan-400 -rotate-6 translate-y-2 md:translate-y-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Me.</span>
          </div>
          <div className="mt-6 flex items-center gap-4">
             <div className="h-1 w-12 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
             <p className="font-poppins text-gray-400 text-sm tracking-widest uppercase">Discover the persona</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <a href="/Amrit's Specialized CV.pdf" download className="px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] w-full sm:w-auto">
              <FaDownload /> Specialized CS CV
            </a>
            <a href="/Amrit's CV.pdf" download className="px-6 py-3 border border-indigo-500/50 text-indigo-400 rounded-full hover:bg-indigo-500/10 transition-colors flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] w-full sm:w-auto">
              <FaDownload /> General CV
            </a>
          </div>
        </div>

        {/* --- PART 1: GRID (Cards + Avatar) --- */}
        <div className="relative z-20 mb-20"> 
           <AboutGrid />
        </div>

        {/* --- PART 2: THE NEW MISSION LOG --- */}
        <div className="relative z-20">
           <MissionLog />
        </div>

      </div>
    </section>
  )
}

export default About