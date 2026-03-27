import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"
import socialLinks from "../../data/socials"
import HeroCanvas from "../../canvas/HeroCanvas" 
import CometCanvas from "../../canvas/CometCanvas" 
import HeroGeometry from "./HeroGeometry" 

const Hero = ({ showAnimation }) => { 
  const containerRef = useRef(null)
  const subtitleRef = useRef(null)
  
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const toRotate = "Hi, I'm Amrit"
  const [delta, setDelta] = useState(110)

  // --- 1. TYPING LOGIC ---
  useEffect(() => {
    if (!showAnimation) return
    if (text === toRotate) return 

    let ticker = setInterval(() => {
      let fullText = toRotate
      let updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)

      setText(updatedText)
      if (isDeleting) setDelta(50)
      if (!isDeleting && updatedText === fullText) return 
    }, delta)
    return () => clearInterval(ticker)
  }, [text, delta, showAnimation])

  // --- 2. GSAP ENTRY ---
  useEffect(() => {
    if (!showAnimation) return
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-content", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, delay: 0.1, ease: "power4.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [showAnimation])

  return (
    <section 
        id="hero" 
        ref={containerRef} 
        // FIX 1: Changed bg-slate-950 to bg-transparent
        className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center"
    >
      
      {/* 1. HERO SPECIFIC STARS (Optional: You can remove this if you want ONLY Global stars) */}
      {/* If you keep this, it adds EXTRA stars to the hero, making it denser. 
          To match exactly, you might want to remove opacity-40 or remove this div entirely. */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* 2. COMET CURSOR */}
      <div className="absolute inset-0 z-50 pointer-events-none">
         <CometCanvas />
      </div>
      
      {/* FIX 2: REMOVED THE DARK GRADIENT OVERLAY */}
      {/* This was the main culprit making the hero look darker/foggy */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10 pointer-events-none" /> */}

      {/* 3. 3D GEOMETRY */}
      <HeroGeometry />

      {/* 4. MAIN TEXT CONTENT */}
      <div className="hero-content relative z-40 w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center opacity-0 pointer-events-none">
        
        {/* LEFT SIDE: TEXT */}
        <div className="text-center md:text-left pointer-events-auto">
            
            {/* TITLE */}
            <div className="relative inline-block mb-4">
                <h1 className="font-cursive font-bold text-6xl md:text-9xl text-white tracking-wide py-4 select-none whitespace-nowrap flex items-center flex-wrap md:flex-nowrap">
                    <span 
                      data-cursor="text-lg"
                      className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent pb-2"
                    >
                      {text}
                    </span>
                    <span className="inline-block w-0.5 h-16 md:h-24 bg-cyan-400 ml-3 align-middle shadow-[0_0_10px_#22d3ee] animate-pulse" />
                </h1>
            </div>

            {/* SUBTITLE */}
            <div 
              ref={subtitleRef}
              data-cursor="text-sm"
              className="max-w-3xl mb-12 cursor-none inline-block"
            >
              <p className="text-2xl md:text-4xl text-gray-300 font-poppins font-medium tracking-wide">
                <span className="text-cyan-400 font-bold mr-2">&lt;</span>
                MERN Stack Developer
                <span className="text-cyan-400 font-bold ml-2">/&gt;</span>
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <button 
                onClick={() => window.location.href = '#projects'}
                className="px-8 py-4 bg-white text-black font-poppins font-semibold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
              >
                View Projects
              </button>
              
              <button 
                onClick={() => window.location.href = '#contact'}
                className="px-8 py-4 border border-white/20 text-white font-poppins font-medium text-lg rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Contact Me
              </button>
            </div>

            {/* SOCIALS */}
            <div className="mt-12 flex items-center md:items-start gap-8 text-gray-500">
               <a href={socialLinks.find(s => s.name === "GitHub")?.url || "#"} target="_blank" rel="noopener noreferrer">
                 <FaGithub size={24} className="hover:text-white transition-colors cursor-pointer hover:scale-110 duration-300" />
               </a>
               <a href={socialLinks.find(s => s.name === "LinkedIn")?.url || "#"} target="_blank" rel="noopener noreferrer">
                 <FaLinkedin size={24} className="hover:text-blue-400 transition-colors cursor-pointer hover:scale-110 duration-300" />
               </a>
               <a href={socialLinks.find(s => s.name === "Twitter")?.url || "#"} target="_blank" rel="noopener noreferrer">
                 <FaTwitter size={24} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-110 duration-300" />
               </a>
               <a href={socialLinks.find(s => s.name === "Email")?.url || "#"} target="_blank" rel="noopener noreferrer">
                 <FaEnvelope size={24} className="hover:text-red-400 transition-colors cursor-pointer hover:scale-110 duration-300" />
               </a>
            </div>

        </div>

        {/* RIGHT SIDE: SPACER */}
        <div className="hidden md:block h-full min-h-[500px]" />

      </div>
    </section>
  )
}

export default Hero