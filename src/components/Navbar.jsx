import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useMotionTemplate } from "framer-motion"
import { FaUserAstronaut, FaCode, FaLayerGroup, FaPaperPlane, FaRocket, FaCertificate } from "react-icons/fa"

const navLinks = [
  { id: "hero", label: "Start", icon: <FaRocket size={15} /> },
  { id: "about", label: "About", icon: <FaUserAstronaut size={15} /> },
  { id: "skills", label: "Skills", icon: <FaCode size={15} /> },
  { id: "projects", label: "Projects", icon: <FaLayerGroup size={15} /> },
  { id: "certifications", label: "Certs", icon: <FaCertificate size={15} /> },
  { id: "contact", label: "Contact", icon: <FaPaperPlane size={14} /> },
]

const Navbar = () => {
  const mouseX = useMotionValue(Infinity)
  const [activeTab, setActiveTab] = useState("hero")

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id)
        }
      })
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  )

  navLinks.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  })

  return () => observer.disconnect()
}, [])


  return (
    // ✅ FIXED: Outer div ignores clicks, Inner div accepts them
    // ✅ FIXED: z-[9990] puts it above CometCanvas (z-9996 is background) but below Cursor (z-[9999])
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990] flex items-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="
          pointer-events-auto
          relative flex items-end gap-2
          px-2 py-2
          rounded-2xl
          bg-slate-950/80 backdrop-blur-md
          border border-white/10
          shadow-[0_0_20px_rgba(0,0,0,0.5)]
          ring-1 ring-white/5
        "
      >
        <Spotlight mouseX={mouseX} />

        {navLinks.map((link, i) => (
          <DockIcon
            key={link.id}
            index={i}
            mouseX={mouseX}
            activeTab={activeTab}
            {...link}
          />
        ))}
      </motion.div>
    </div>
  )
}

const Spotlight = ({ mouseX }) => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none rounded-2xl opacity-50"
    style={{
      background: useMotionTemplate`
        radial-gradient(
          200px circle at ${mouseX}px 50%,
          rgba(255,255,255,0.1),
          transparent 80%
        )
      `,
    }}
  />
)

const DockIcon = ({ mouseX, id, label, icon, activeTab, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isActive = activeTab === id
  const [clickParticles, setClickParticles] = useState([])

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 55, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  // ✅ FIXED: Reliable Scroll Interaction
  const handleInteraction = () => {
    const element = document.getElementById(id)
    if (element) {
      // scrollIntoView works best for simple layouts
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      angle: i * 60 + Math.random() * 30,
      dist: 20 + Math.random() * 10,
    }))

    setClickParticles(newParticles)
    setTimeout(() => setClickParticles([]), 600)
  }

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square relative flex items-center justify-center group cursor-pointer z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteraction}
      whileTap={{ scale: 0.85 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <AnimatePresence>
        {clickParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
              y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            className="
              absolute -top-8 left-1/2 -translate-x-1/2
              px-2 py-0.5 rounded-md
              bg-slate-900 border border-white/20
              text-cyan-50 text-[9px] font-bold uppercase
              pointer-events-none whitespace-nowrap
            "
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative z-10 ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-white"}`}>
        <motion.div style={{ scale: useTransform(distance, [-100, 0, 100], [1, 1.15, 1]) }}>
          {icon}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Navbar