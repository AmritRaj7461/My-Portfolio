import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCertificate, FaGraduationCap, FaExternalLinkAlt, FaDownload } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".cert-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      // Card Animations
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const certData = [
    {
      title: "GenAI & Machine Learning",
      provider: "FuturePrimeSkills",
      date: "2024",
      points: [
        "Earned certification in Generative AI and Machine Learning principles.",
        "Demonstrated understanding of modern AI architectures, model implementations, and prompt engineering."
      ],
      link: "/GenAI & ML Certificate(FuturePrimeSkills).pdf"
    },
    {
      title: "Introduction to Hardware and Operating Systems",
      provider: "IBM",
      date: "2024",
      points: [
        "Gained foundational knowledge of core computer hardware components.",
        "Mastered essential operating system management and interaction necessary for full-stack deployment."
      ],
      link: "/Introduction to Hardware and Operating Systems.pdf"
    },
    {
      title: "Software Engineering Implementation & Testing",
      provider: "Coursera",
      date: "2024",
      points: [
        "Mastered software testing methodologies and Continuous Integration (CI).",
        "Applied robust software implementation practices suitable for enterprise-level environments."
      ],
      link: "/Software Engineering Implementation and Testing.pdf"
    },
    {
      title: "IBM Full-Stack JavaScript Developer",
      provider: "IBM (via Coursera)",
      date: "Mar 2026",
      points: [
        "Architected end-to-end web applications using Node.js and React, focusing on scalable RESTful architectures and modern ES6+ standards.",
      ],
      link: "#"
    },
    {
      title: "Google AI Essentials",
      provider: "Google (via Coursera)",
      date: "Mar 2026",
      points: [
        "Leveraged generative AI tools to streamline development workflows and refined prompt engineering techniques for increased coding efficiency.",
      ],
      link: "/AI Essentials Certificate.pdf"
    },
    {
      title: "Technology Job Simulation",
      provider: "Deloitte Australia (via Forage)",
      date: "Jul 2025",
      points: [
        "Simulated technology consulting and system architecture workflows to deliver client-centric software solutions.",
      ],
      link: "#"
    },
  ];

  const trainingData = [
    {
      title: "Data Structures and Algorithms",
      provider: "Lovely Professional University",
      date: "Jun 2025 – Jul 2025",
      points: [
        "<strong>Mastered</strong> core and advanced DSA, focusing on optimizing code performance through rigorous <strong>Big O Complexity Analysis</strong>.",
        "<strong>Architected</strong> and implemented fundamental structures including <strong>Linked Lists, Stacks, Queues, and Trees</strong>, alongside optimized searching and sorting algorithms.",
        "<strong>Developed</strong> a <strong>Student Record Management System</strong> in <strong>C++</strong>, achieving <strong>O(log n)</strong> or <strong>O(1)</strong> efficiency for data retrieval and record operations.",
      ],
      link: "/Summer_Training_Certificate.pdf"
    }
  ];

  return (
    <section id="certifications" className="relative w-full min-h-screen py-32 bg-transparent z-10" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* HEADER */}
        <div className="cert-header text-center mb-24 relative">
           <h2 className="absolute -top-10 -left-10 text-[6rem] md:text-[9rem] font-poppins font-black text-transparent opacity-5 select-none pointer-events-none z-0 hidden md:block" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
             ACHIEVEMENTS
           </h2>
           <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white relative z-10">
             Certificates & <span className="font-cursive text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">Training</span>
           </h2>
           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        </div>

        {/* CERTIFICATES SECTION */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12 cert-card">
             <div className="p-4 bg-cyan-950/50 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <FaCertificate className="text-cyan-400 text-3xl" />
             </div>
             <h3 className="text-3xl font-orbitron font-bold text-white tracking-wide">Certificates</h3>
             <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {certData.map((item, idx) => (
                <div key={idx} className="cert-card relative group rounded-[2.5rem] bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden flex flex-col h-full">
                   
                   {/* Hover Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                   
                   <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                     <div className="flex flex-col gap-4 mb-6">
                        <div className="flex justify-between items-start gap-4">
                           <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse mt-2.5 shrink-0" />
                              <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">{item.title}</h4>
                           </div>
                           <span className="text-xs font-mono text-cyan-200 font-bold bg-cyan-900/40 px-3 py-1 rounded-full whitespace-nowrap border border-cyan-500/30 shrink-0">{item.date}</span>
                        </div>
                        <div className="pl-5">
                          <span className="text-sm font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-md border border-white/5">{item.provider}</span>
                        </div>
                     </div>

                     <ul className="text-gray-300 text-sm leading-relaxed space-y-3 mb-8 list-none pl-5 flex-1 relative">
                       <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-800 group-hover:bg-cyan-900 transition-colors" />
                       {item.points.map((point, i) => (
                          <li key={i} className="relative before:absolute before:-left-[21px] before:top-2 before:w-2 before:h-2 before:bg-cyan-500/50 before:rounded-full group-hover:before:bg-cyan-400 transition-colors">{point}</li>
                       ))}
                     </ul>

                     {/* Action Button */}
                     <a href={item.link} download={item.link !== "#"} target={item.link !== "#" ? "_blank" : "_self"} rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-cyan-950/30 hover:bg-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest text-xs rounded-xl border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 mt-auto shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-1">
                        Download Credential <FaDownload className="group-hover:scale-125 transition-transform" />
                     </a>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* TRAINING SECTION */}
        <div className="mt-32">
          <div className="flex items-center gap-4 mb-12 cert-card">
             <div className="p-4 bg-purple-950/50 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <FaGraduationCap className="text-purple-400 text-3xl" />
             </div>
             <h3 className="text-3xl font-orbitron font-bold text-white tracking-wide">Training</h3>
             <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 gap-8">
             {trainingData.map((item, idx) => (
                <div key={idx} className="cert-card relative group rounded-[2.5rem] bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden flex flex-col h-full">
                   
                   {/* Hover Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                   
                   <div className="p-8 md:p-10 relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center h-full">
                     <div className="flex-1">
                        <div className="flex flex-col gap-4 mb-6">
                           <div className="flex justify-between items-start gap-4">
                              <div className="flex items-start gap-3">
                                 <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-pulse mt-2.5 shrink-0" />
                                 <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">{item.title}</h4>
                              </div>
                              <span className="text-xs font-mono text-purple-200 font-bold bg-purple-900/40 px-3 py-1 rounded-full whitespace-nowrap border border-purple-500/30 shrink-0">{item.date}</span>
                           </div>
                           <div className="pl-5">
                             <span className="text-sm font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-md border border-white/5">{item.provider}</span>
                           </div>
                        </div>

                        <ul className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 mb-8 lg:mb-0 list-none pl-5 relative">
                          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-800 group-hover:bg-purple-900 transition-colors" />
                          {item.points.map((point, i) => (
                             <li key={i} className="relative before:absolute before:-left-[21px] before:top-2.5 before:w-2 before:h-2 before:bg-purple-500/50 before:rounded-full group-hover:before:bg-purple-400 transition-colors" dangerouslySetInnerHTML={{ __html: point }} />
                          ))}
                        </ul>
                     </div>

                     {/* Action Button */}
                     <div className="w-full lg:w-auto mt-4 lg:mt-0 lg:ml-8 shrink-0 flex flex-col gap-4 items-center">
                         <a href={item.link} download={item.link !== "#"} className="flex flex-col items-center justify-center p-6 bg-purple-950/20 hover:bg-purple-500/20 text-purple-400 rounded-[1.5rem] border border-purple-500/20 hover:border-purple-400 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:-translate-y-2">
                            <FaDownload className="text-4xl mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-110 group-hover:text-purple-300 transition-all duration-500" />
                            <span className="font-bold uppercase tracking-widest text-xs text-center">Download<br/>Certificate</span>
                         </a>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
