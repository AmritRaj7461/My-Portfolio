import { useRef, useEffect } from "react"
import SkillCategory from "./SkillCategory"
import skills from "./data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const languages = skills.filter(s => s.orbit === 1)
  const frameworks = skills.filter(s => s.orbit === 2)
  const databases = skills.filter(s => s.orbit === 3)
  const tools = skills.filter(s => s.orbit === 4)

  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <section id="skills" className="relative min-h-screen py-24 bg-transparent overflow-hidden flex flex-col items-center">
      
      {/* --- CREATIVE HEADER --- */}
      <div ref={headerRef} className="text-center mb-24 relative z-10 px-4 w-full max-w-7xl">
        
        {/* 1. Giant Outline Background */}
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[9rem] font-poppins font-black text-transparent opacity-5 select-none pointer-events-none whitespace-nowrap z-0"
            style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
          EXPERTISE
        </h2>

        {/* 2. Main Title (Creative Mix) */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-2">
            My <span className="font-cursive text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Skills</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mt-4">
             <div className="h-[1px] w-12 bg-cyan-400/50" />
             <p className="font-poppins text-blue-200/60 text-sm tracking-widest uppercase">
               The Technical Toolkit
             </p>
             <div className="h-[1px] w-12 bg-cyan-400/50" />
          </div>
        </div>

      </div>

      {/* --- SKILL DECKS (Kept the layout, removed bg-colors if needed) --- */}
      <div className="
        w-full max-w-7xl px-4 
        flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8
        md:grid md:grid-cols-2 md:overflow-visible md:pb-0 
        lg:gap-12 lg:gap-10 
        relative z-10
        scrollbar-hide 
      ">
        <div className="min-w-[85vw] md:min-w-0 snap-center">
            <SkillCategory title="Core Languages" skills={languages} tiltDirection="left" />
        </div>
        <div className="min-w-[85vw] md:min-w-0 snap-center">
            <SkillCategory title="Frameworks" skills={frameworks} tiltDirection="right" />
        </div>
        <div className="min-w-[85vw] md:min-w-0 snap-center">
            <SkillCategory title="Data Systems" skills={databases} tiltDirection="right" />
        </div>
        <div className="min-w-[85vw] md:min-w-0 snap-center">
            <SkillCategory title="Tools" skills={tools} tiltDirection="left" />
        </div>
      </div>
      
    </section>
  )
}

export default Skills