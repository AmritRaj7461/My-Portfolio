import { useEffect, useRef } from "react"
import gsap from "gsap"

const SkillDetails = ({ skill }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Animate content when skill changes
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    )
  }, [skill])

  return (
    <div ref={containerRef} className="h-full w-full p-6 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Glow based on Skill Color */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-current opacity-10 blur-[50px] rounded-full pointer-events-none transition-colors duration-500"
        style={{ color: skill.color }}
      />

      <div ref={textRef} className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          {/* Skill Name in Orbitron */}
          <h3 className="text-3xl font-orbitron font-bold text-white tracking-wide">
            {skill.name}
          </h3>
          {/* Level Badge in Rajdhani */}
          <span 
            className="px-3 py-1 rounded-full text-xs font-rajdhani font-bold border border-white/10 uppercase tracking-widest"
            style={{ 
              backgroundColor: `${skill.color}20`, 
              color: skill.color,
              borderColor: `${skill.color}40`
            }}
          >
            {skill.level}
          </span>
        </div>

        <p className="font-rajdhani font-medium text-blue-200/60 text-sm tracking-wider uppercase mb-4">
          Module ID: <span className="text-white">{skill.id.toUpperCase()}</span>
        </p>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
          {skill.description}
        </p>

        {/* --- METRICS HUD --- */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Mastery Bar */}
          <div>
            <div className="flex justify-between text-xs font-rajdhani font-bold tracking-widest text-gray-500 mb-1">
              <span>MASTERY</span>
              <span style={{ color: skill.color }}>{skill.metrics.mastery}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.metrics.mastery}%`, backgroundColor: skill.color }}
              />
            </div>
          </div>

          {/* Usage Bar */}
          <div>
            <div className="flex justify-between text-xs font-rajdhani font-bold tracking-widest text-gray-500 mb-1">
              <span>USAGE</span>
              <span style={{ color: skill.color }}>{skill.metrics.usage}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.metrics.usage}%`, backgroundColor: '#3b82f6' }} // Blue for usage
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SkillDetails