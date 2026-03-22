import { useEffect, useRef } from "react"
import gsap from "gsap"
import { FaReact, FaLaptopCode, FaRocket } from "react-icons/fa6"
import AvatarModel from "./AvatarModel" // Import the new 3D component

const TechAvatar = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
        // We only need to animate the orbiting icons now, 
        // because the Avatar itself is animated by React Three Fiber!
        
        // 1. Tumble Animation (Rotation for icons)
        gsap.to(".tumbler", {
            rotation: 10,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        })

        // 2. Float Animation (Icons bobbing)
        gsap.to(".icon-floater", {
            y: 10,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: {
                each: 0.5,
                from: "random"
            }
        })

        // 3. Glow Pulse (Background)
        gsap.to(".glow-pulse", {
            opacity: 0.6,
            scale: 1.1,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center pointer-events-none select-none">
        
        {/* 1. BACKGROUND GLOW (The Aura) */}
        <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full glow-pulse" />

        {/* 2. THE 3D AVATAR CANVAS */}
        {/* We increase z-index to 10 so it sits above the glow but below icons */}
        <div className="relative z-10 w-[400px] h-[500px]"> 
             <AvatarModel />
        </div>

        {/* 3. ORBITING TECH: React Atom (Top Right) */}
        <div className="absolute top-20 right-10 z-20 icon-floater tumbler">
            <div className="w-20 h-20 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <FaReact className="text-5xl text-cyan-400 animate-spin-slow" />
            </div>
        </div>

        {/* 4. ORBITING TECH: Laptop/Code (Bottom Left) */}
        <div className="absolute bottom-20 left-10 z-20 icon-floater tumbler">
             <div className="w-24 h-24 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <FaLaptopCode className="text-5xl text-purple-400" />
             </div>
        </div>

        {/* 5. ORBITING TECH: Rocket (Top Left - blurry) */}
        <div className="absolute top-10 left-20 z-0 blur-[2px] opacity-60 icon-floater">
             <FaRocket className="text-4xl text-orange-400 -rotate-45" />
        </div>

    </div>
  )
}

export default TechAvatar