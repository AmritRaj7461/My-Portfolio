import { useEffect, useRef } from "react"
import gsap from "gsap"

const HudOverlay = () => {
  const radarRef = useRef(null)
  const codeRef = useRef(null)

  useEffect(() => {
    // 1. Radar Spin
    gsap.to(radarRef.current, { rotation: 360, duration: 4, repeat: -1, ease: "linear" })
    
    // 2. Random Code Scrolling
    const codes = ["SYS_CHK...", "RELAY_01: OK", "MEM_ALLOC: 40TB", "TARGET: USER", "RENDERING...", "V_SYNC: ON", "FPS: 120"]
    let i = 0
    const interval = setInterval(() => {
        if(codeRef.current) {
            codeRef.current.innerText = codes[i % codes.length]
            i++
        }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      
      {/* --- CORNER BRACKETS (The "Camera View" effect) --- */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-3xl" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-3xl" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl" />

      {/* --- LEFT SIDE: VERTICAL COORDINATES --- */}
      <div className="absolute left-6 top-1/3 flex flex-col gap-12 items-center opacity-30">
          <div className="h-24 w-[1px] bg-cyan-400" />
          <div className="writing-vertical-lr text-[10px] font-mono text-cyan-400 tracking-widest">
             LAT: 28.6139 N // LON: 77.2090 E
          </div>
          <div className="h-24 w-[1px] bg-cyan-400" />
      </div>

      {/* --- RIGHT SIDE: SYSTEM STATUS --- */}
      <div className="absolute right-10 top-1/4 flex flex-col items-end gap-2 opacity-60">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
             <span className="text-xs font-mono text-cyan-300">ONLINE</span>
          </div>
          <div className="text-[10px] font-mono text-cyan-500/80" ref={codeRef}>
             INIT_SYSTEM...
          </div>
          {/* Animated Bar Graph */}
          <div className="flex gap-1 items-end h-8">
              {[40, 70, 30, 80, 50].map((h, i) => (
                  <div key={i} className="w-1 bg-cyan-500/40 animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
              ))}
          </div>
      </div>

      {/* --- BOTTOM CENTER: RADAR SCANNER --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
          <div className="relative w-32 h-32 rounded-full border border-cyan-500 flex items-center justify-center">
             <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500 animate-spin-slow" />
             <div ref={radarRef} className="w-full h-1 bg-gradient-to-r from-transparent to-cyan-400 origin-center absolute top-1/2 left-0 -translate-y-1/2" />
          </div>
      </div>

    </div>
  )
}

export default HudOverlay