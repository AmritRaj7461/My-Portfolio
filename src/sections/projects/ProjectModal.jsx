import { useEffect, useState } from "react"
import gsap from "gsap"
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa"

const ProjectModal = ({ project, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Reveal Animation
    gsap.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(".modal-content", 
        { scale: 0.8, opacity: 0, y: 50 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    )
    
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'unset'
  }, [])

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsClosing(true)
    gsap.to(".modal-content", { scale: 0.8, opacity: 0, y: 50, duration: 0.3 })
    gsap.to(".modal-overlay", { opacity: 0, duration: 0.3, onComplete: onClose })
  }

  return (
    <div className="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-md">
      
      {/* --- THE TERMINAL WINDOW --- */}
      <div className="modal-content relative w-full max-w-5xl h-[90vh] md:h-auto bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.2)] flex flex-col md:flex-row">
        
        {/* 1. LEFT: VISUAL DISPLAY */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black">
           <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
           
           {/* Scanline Overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_4px,3px_100%]" />
           
           {/* Floating Tech Badge */}
           <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-cyan-500/50 rounded backdrop-blur-md text-cyan-400 font-mono text-xs">
              STATUS: DEPLOYED
           </div>
        </div>

        {/* 2. RIGHT: DATA PANEL */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col relative bg-slate-900">
           
           {/* Close Button */}
           <button 
             onClick={handleClose} 
             className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
           >
              <FaTimes size={20} />
           </button>

           {/* Header */}
           <h2 className="text-4xl font-bold text-white font-orbitron mb-2">{project.title}</h2>
           <p className="text-cyan-400 font-mono text-sm tracking-wider mb-6">
              // {project.category.toUpperCase()}
           </p>

           {/* Description with Typing Effect Line */}
           <div className="flex-grow mb-8 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-cyan-500/30 pl-4">
                 {project.description}
              </p>
              
              <div className="mt-6">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                     <span className="w-2 h-2 bg-purple-500 rounded-full" /> 
                     Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                          <span key={t} className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-gray-300">
                              {t}
                          </span>
                      ))}
                  </div>
              </div>
           </div>

           {/* Action Footer */}
           <div className="pt-6 border-t border-white/10 flex gap-4">
               <a 
                 href={project.links.live} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded flex items-center justify-center gap-2 transition-transform hover:scale-105"
               >
                  <FaExternalLinkAlt /> Live Demo
               </a>
               <a 
                 href={project.links.github} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex-1 py-3 border border-white/20 hover:bg-white/10 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors"
               >
                  <FaGithub /> Source Code
               </a>
           </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectModal