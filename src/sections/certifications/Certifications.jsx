import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCertificate, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";

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
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const certData = [
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
      link: "#"
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
      link: "#"
    }
  ];

  return (
    <section id="certifications" className="relative w-full min-h-screen py-32 bg-transparent z-10" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* HEADER */}
        <div className="cert-header text-center mb-24 relative">
           <h2 className="absolute -top-10 -left-10 text-[6rem] md:text-[9rem] font-poppins font-black text-transparent opacity-5 select-none pointer-events-none z-0 hidden md:block" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
             ACHIEVEMENTS
           </h2>
           <h2 className="text-5xl md:text-7xl font-poppins font-bold text-white relative z-10">
             Certificates & <span className="font-cursive text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">Training</span>
           </h2>
           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* CERTIFICATES SECTION */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 cert-card">
             <FaCertificate className="text-cyan-400 text-3xl" />
             <h3 className="text-3xl font-orbitron font-bold text-white">Certificates</h3>
             <div className="flex-1 h-[1px] bg-white/10 ml-4" />
          </div>

          <div className="space-y-12">
             {certData.map((item, idx) => (
                <div key={idx} className="cert-card relative p-8 group rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-2">
                   
                   <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                           <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                        </div>
                        <div className="flex items-center gap-2 pl-5">
                          <span className="text-cyan-400 font-semibold">{item.provider}</span>
                          <a href={item.link} className="text-gray-400 hover:text-white transition-colors ml-2" title="View Certificate"><FaExternalLinkAlt className="inline text-sm" /></a>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-cyan-100 font-bold bg-cyan-900/40 px-4 py-1.5 rounded-full whitespace-nowrap border border-cyan-500/30">{item.date}</span>
                   </div>

                   <ul className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3 mt-4 list-disc list-outside ml-9 marker:text-cyan-600/50">
                     {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                     ))}
                   </ul>

                </div>
             ))}
          </div>
        </div>

        {/* TRAINING SECTION */}
        <div className="mt-32">
          <div className="flex items-center gap-4 mb-10 cert-card">
             <FaGraduationCap className="text-purple-400 text-3xl" />
             <h3 className="text-3xl font-orbitron font-bold text-white">Training</h3>
             <div className="flex-1 h-[1px] bg-white/10 ml-4" />
          </div>

          <div className="space-y-12">
             {trainingData.map((item, idx) => (
                <div key={idx} className="cert-card relative p-8 group rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-2">
                   
                   <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <div className="flex flex-col items-start gap-2">
                         <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-pulse" />
                           <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{item.title}</h4>
                         </div>
                         <div className="flex items-center gap-2 pl-5">
                            <span className="text-purple-400 font-semibold">{item.provider}</span>
                            <a href={item.link} className="text-gray-400 hover:text-white transition-colors ml-2" title="View Certificate"><FaExternalLinkAlt className="inline text-sm" /></a>
                         </div>
                      </div>
                      <span className="text-sm font-mono text-purple-100 font-bold bg-purple-900/40 px-4 py-1.5 rounded-full whitespace-nowrap border border-purple-500/30">{item.date}</span>
                   </div>

                   <ul className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3 mt-4 list-disc list-outside ml-9 marker:text-purple-600/50">
                     {item.points.map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                     ))}
                   </ul>

                </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
