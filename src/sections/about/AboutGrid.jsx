import { useEffect, useRef } from "react"
import gsap from "gsap"
import AboutCarousel from "./AboutCarousel"
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb } from "react-icons/si"

const AboutGrid = () => {
  const gateRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)

  useEffect(() => {
    // 1. Main Gate Slow Spin
    gsap.to(gateRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "linear" })
    
    // 2. Inner Rings Contra-Rotating (Gyroscope effect)
    gsap.to(ring1Ref.current, { rotation: 360, duration: 20, repeat: -1, ease: "linear" })
    gsap.to(ring2Ref.current, { rotation: -360, duration: 15, repeat: -1, ease: "linear" })
    gsap.to(ring3Ref.current, { rotation: 360, duration: 10, repeat: -1, ease: "linear" })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-center overflow-visible relative">
      
      {/* --- LEFT: CARD CAROUSEL --- */}
      <div className="w-full relative min-h-[400px] flex items-center order-2 md:order-1 z-20">
        <AboutCarousel />
      </div>


      {/* --- RIGHT: THE QUANTUM GATE AVATAR --- */}
      <div className="relative z-10 flex justify-center order-1 md:order-2 h-full items-center min-h-[600px]">
        
        {/* --- 1. THE STARGATE BACKGROUND --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            {/* CORE GLOW (The energy source) */}
            <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[80px] rounded-full animate-pulse" />

            {/* RING 1: Main Structure (Static-ish) */}
            <div ref={gateRef} className="absolute w-[500px] h-[500px] border border-slate-700/50 rounded-full flex items-center justify-center">
                 {/* Decorative Nodes on the ring */}
                 {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div key={deg} className="absolute w-2 h-2 bg-cyan-900 rounded-full" 
                         style={{ transform: `rotate(${deg}deg) translate(250px) rotate(-${deg}deg)` }} />
                 ))}
            </div>

            {/* RING 2: The Energy Ring (Cyan) */}
            <div ref={ring1Ref} className="absolute w-[420px] h-[420px] rounded-full border-2 border-dashed border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
            
            {/* RING 3: The Logic Ring (Purple) */}
            <div ref={ring2Ref} className="absolute w-[350px] h-[350px] rounded-full border border-t-transparent border-b-transparent border-l-2 border-r-2 border-purple-500/50" />
            
            {/* RING 4: The Fast Inner Ring (White) */}
            <div ref={ring3Ref} className="absolute w-[280px] h-[280px] rounded-full border-[1px] border-white/10" />
        
        </div>


        {/* --- 2. THE AVATAR (Floating in the Gate) --- */}
        <div className="relative z-20 w-[350px] h-[500px] flex items-end justify-center group">
             
             {/* Platform Base */}
             <div className="absolute bottom-10 w-40 h-10 bg-black/50 border border-cyan-500/50 rounded-[100%] shadow-[0_0_30px_inset_cyan] backdrop-blur-md transform rotate-x-60" />

             {/* The Image */}
             <img 
                 src="/assets/avatar.png" 
                 className="h-[420px] object-contain drop-shadow-[0_0_5px_rgba(34,211,238,0.4)] animate-float mb-15"
                 style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                 alt="Avatar"
             />

             {/* --- ORBITING TECH ICONS --- */}
             {/* We place them on a 3D orbit using standard CSS animation */}
             <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-slate-900 border border-cyan-500 p-2 rounded-full shadow-[0_0_15px_cyan] animate-[spin_12s_linear_infinite_reverse]">
                    <SiReact className="text-cyan-400 text-xl" />
                 </div>
             </div>
             <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                 <div className="absolute bottom-20 left-0 bg-slate-900 border border-yellow-500 p-2 rounded-full shadow-[0_0_15px_yellow] animate-[spin_15s_linear_infinite]">
                    <SiJavascript className="text-yellow-400 text-xl" />
                 </div>
             </div>
        </div>

      </div>
    </div>
  )
}

export default AboutGrid