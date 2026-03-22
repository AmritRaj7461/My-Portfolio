import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MeteorShowerTheme = () => {
  const [meteors, setMeteors] = useState(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 200 - 50 + "%", 
      delay: Math.random() * 15,
      duration: Math.random() * 4 + 5,
      tailLength: Math.random() * 100 + 100 
    }));
  });

  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      {meteors.map((m) => (
        <motion.div
          key={m.id}
          className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-fuchsia-500 to-white blur-[0.5px] rounded-full shadow-[0_0_15px_rgba(217,70,239,0.8)]"
          style={{ 
             left: m.left, 
             height: m.tailLength,
             rotate: "45deg",
             transformOrigin: "bottom" 
          }}
          initial={{ y: "-20vh", x: "20vh", opacity: 0 }}
          animate={{ y: "120vh", x: "-120vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            ease: "linear",
            delay: m.delay
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
    </div>
  );
};

export default MeteorShowerTheme;
