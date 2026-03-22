import { useEffect, useRef, useState } from "react";
import MeteorShowerTheme from "../canvas/themes/MeteorShowerTheme";
import NeonDataStreamTheme from "../canvas/themes/NeonDataStreamTheme";

// The Original Native Starfield Logic
const StarfieldCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
    </div>
  );
};

const GlobalBackground = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  // The user's carefully curated, ultra-high quality Framer/GSAP selections
  const themes = [
    { component: <StarfieldCanvas /> },
    { component: <NeonDataStreamTheme /> },
    { component: <MeteorShowerTheme /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % themes.length);
    }, 10000); // Crossfade every 10 seconds
    return () => clearInterval(interval);
  }, [themes.length]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-slate-950">
      {themes.map((theme, index) => {
        const isActive = index === themeIndex;

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {theme.component}
          </div>
        );
      })}
    </div>
  );
};

export default GlobalBackground;