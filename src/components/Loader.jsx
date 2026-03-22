import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { FaCog, FaCode } from "react-icons/fa" // 1. Import Icons

const Loader = ({ onComplete, onReveal }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const barRef = useRef(null)
  const [progress, setProgress] = useState(0)
  
  const onCompleteRef = useRef(onComplete)
  const onRevealRef = useRef(onReveal)

  useEffect(() => {
    onCompleteRef.current = onComplete
    onRevealRef.current = onReveal
  }, [onComplete, onReveal])

  const words = ["CODE.", "CONNECT.", "CREATE."]
  const duration = 4.0 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current && onCompleteRef.current()
      })

      // 1. Progress Bar
      tl.to({ val: 0 }, {
        val: 100,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: function () {
          const p = Math.round(this.targets()[0].val)
          setProgress(p)
          if (barRef.current) barRef.current.style.width = `${p}%`
        }
      }, 0)

      // 2. Word Cycle
      const wordDuration = duration / words.length
      gsap.set(".loader-word", { opacity: 0, y: 30 })

      words.forEach((_, i) => {
        const startTime = i * wordDuration
        tl.to(`.word-${i}`, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, startTime)
          .to(`.word-${i}`, { opacity: 0, y: -30, duration: 0.3, ease: "power3.in" }, startTime + wordDuration - 0.2)
      })

      // 3. FADE & ZOOM EXIT
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      })
      
      .call(() => {
         if (onRevealRef.current) onRevealRef.current()
      })

      .to(containerRef.current, {
        opacity: 0,
        scale: 1.1, 
        filter: "blur(10px)",
        duration: 1.0,
        ease: "power2.inOut", 
      }, "<") 

    }, containerRef)

    return () => ctx.revert()
  }, []) 

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden origin-center"
    >
      <div ref={contentRef} className="relative w-full flex flex-col items-center">
          
          {/* Words */}
          <div className="relative h-24 w-full flex justify-center items-center mb-8">
            {words.map((word, i) => (
              <h1 key={i} className={`word-${i} loader-word absolute text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white`}>
                {word}
              </h1>
            ))}
          </div>

          {/* Bar */}
          <div className="loader-bar w-64 md:w-80 h-1 bg-gray-900 rounded-full overflow-hidden relative">
            <div ref={barRef} className="h-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" style={{ width: '0%' }} />
          </div>

          {/* Counter */}
          <div className="loader-counter mt-3 font-mono text-cyan-400/80 text-xs">{progress}%</div>

          {/* 🔥 NEW: TECH ICONS ROW */}
          <div className="flex justify-between w-72 md:w-96 mt-16 px-4 opacity-80">
             
             {/* Left: Rotating Gear (System Settings) */}
             <div className="flex flex-col items-center gap-2">
                <FaCog 
                  className="text-cyan-400 animate-spin" 
                  size={40} 
                  style={{ animationDuration: '3s' }} // Slow spin
                />
                <span className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-widest">Sys.Cfg</span>
             </div>

             {/* Right: Pulsing Code (Logic) */}
             <div className="flex flex-col items-center gap-2">
                <FaCode 
                   className="text-purple-400 animate-pulse" 
                   size={40} 
                />
                <span className="text-[10px] font-mono text-purple-400/50 uppercase tracking-widest">Logic.Init</span>
             </div>

          </div>

      </div>
    </div>
  )
}

export default Loader