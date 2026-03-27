import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "./ProjectCard" // The Extreme 3D Card
import ProjectModal from "./ProjectModal" // The Terminal Modal
import projects from "./data" 
import { usePortfolio } from "../../context/PortfolioContext" 

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const headerRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const { selectedTech, toggleTech } = usePortfolio()

  // --- FILTER LOGIC ---
  const filteredProjects = selectedTech 
    ? projects.filter(p => {
        if (!p.tech) return false;
        const lowerCaseTech = p.tech.map(t => t.toLowerCase());
        const lowerCaseFilter = selectedTech.toLowerCase();
        return lowerCaseTech.includes(lowerCaseFilter);
      })
    : projects

  // --- HEADER ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" } 
        }
      )
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    // CRITICAL: overflow-visible is needed so the 3D image can "pop out" of the section bounds
    <section id="projects" className="relative min-h-screen py-32 bg-transparent overflow-visible">
      
      {/* 1. PROJECT MODAL (The Terminal) */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        
        {/* --- 2. HEADER SECTION --- */}
        <div ref={headerRef} className="mb-32 relative text-center">
          
          {/* Giant Background Text */}
          <h2 className="absolute -top-10 -left-10 text-[6rem] md:text-[9rem] font-poppins font-black text-transparent opacity-5 select-none pointer-events-none z-0 hidden md:block"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
            PORTFOLIO
          </h2>

          <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-poppins font-bold text-white leading-tight">
                Featured <br className="hidden md:block" />
                <span className="font-cursive text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] ml-2 md:ml-0">
                  Deployments
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full" />
              
              <p className="mt-6 text-gray-400 text-sm md:text-base tracking-widest uppercase font-mono">
                 // System Architecture & Design
              </p>
          </div>
        </div>

        {/* --- 3. FILTER BUTTONS --- */}
        {selectedTech && (
          <div className="flex justify-center mb-16 animate-fade-in-up relative z-20">
            <button 
              onClick={() => toggleTech(null)} 
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-full text-sm font-bold flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <span className="text-gray-400">Filtering by:</span>
              <span className="text-cyan-400">{selectedTech}</span>
              <span className="bg-white/10 rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</span>
            </button>
          </div>
        )}

        {/* --- 4. STACKED SCROLLING STREAM --- */}
        <div className="flex flex-col items-center w-full pb-32 space-y-24">
          
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
               // Wrapper div handles sticky scrolling behavior
               <div 
                 key={project.id} 
                 className="sticky z-10 transition-all duration-500 w-full shadow-[0_-20px_40px_rgba(0,0,0,0.6)] rounded-[3rem] will-change-transform"
                 style={{ top: `${15 + index * 2}vh` }} // Cards stack cleanly
               >
                 <ProjectCard 
                    project={project} 
                    index={index} 
                    onClick={(e) => {
                      if (e) e.preventDefault();
                      setSelectedProject(project);
                    }}
                 />
               </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-2 font-poppins">System Void</h3>
              <p className="text-gray-400 font-mono">No projects found for query: <span className="text-cyan-400">{selectedTech}</span></p>
              <button onClick={() => toggleTech(null)} className="mt-6 text-sm text-cyan-400 underline hover:text-white transition-colors">Reset System</button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default Projects 