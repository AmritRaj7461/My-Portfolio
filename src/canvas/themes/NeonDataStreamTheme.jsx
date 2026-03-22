import { useEffect, useRef } from "react";
import gsap from "gsap";

const NeonDataStreamTheme = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const columns = Math.floor(window.innerWidth / 24);
    const dropTexts = "01HIJXYZABCDEFGHIJKLMNOPQRSTUV123456789".split("");

    const streams = Array.from({ length: columns }).map((_, i) => {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = `${i * 24}px`;
      el.style.top = `-${Math.random() * 800 + 100}px`;
      el.style.color = "#0ea5e9"; // Cyan 500
      el.style.opacity = (Math.random() * 0.4 + 0.1).toString();
      el.style.fontSize = "18px";
      el.style.fontFamily = "monospace";
      el.style.fontWeight = "bold";
      el.style.textShadow = "0 0 10px #38bdf8";
      el.style.whiteSpace = "pre";
      
      const updateText = () => {
         el.innerText = Array.from({ length: 25 })
           .map(() => dropTexts[Math.floor(Math.random() * dropTexts.length)])
           .join("\n");
      };
      updateText();
      
      containerRef.current.appendChild(el);

      gsap.to(el, {
        y: window.innerHeight + 1200,
        duration: Math.random() * 5 + 3,
        ease: "none",
        repeat: -1,
        onRepeat: updateText,
        delay: Math.random() * -5 // Start randomly staggered
      });

      return el;
    });

    return () => {
      streams.forEach(el => gsap.killTweensOf(el));
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none" />
      <div ref={containerRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-20" />
    </div>
  );
};

export default NeonDataStreamTheme;
