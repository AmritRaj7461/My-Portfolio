import { useRef, useState, useEffect } from "react"
import emailjs from "emailjs-com"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutImageStack from "./AboutImageStack"

gsap.registerPlugin(ScrollTrigger)

/* --- 1. SUB-COMPONENT: HOLOGRAPHIC INPUT --- */
// A futuristic input that glows and animates the label on focus
const HoloInput = ({ label, type = "text", name, value, onChange, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative w-full group mb-6 z-10">
      
      {/* Background Glass Plate */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none border ${isFocused ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-slate-900/40 border-white/5 group-hover:bg-slate-800/40'}`} />

      {/* The Input Field */}
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows="4"
          className="w-full bg-transparent text-white font-poppins text-lg p-4 outline-none resize-none z-10 relative"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent text-white font-poppins text-lg p-4 outline-none z-10 relative"
        />
      )}

      {/* Floating Label Animation */}
      <label
        className={`absolute transition-all duration-300 pointer-events-none font-poppins z-20
          ${isFocused || hasValue 
            ? "-top-3 left-3 bg-slate-900/90 px-2 rounded-md border border-cyan-500/20 backdrop-blur-sm shadow-md text-cyan-400 text-[10px] tracking-widest uppercase font-bold" 
            : "top-4 left-4 text-gray-500 text-lg"}
        `}
      >
        {label}
      </label>

      {/* Focus Glow Stroke */}
      <div 
        className={`absolute inset-0 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4),_inset_0_0_10px_rgba(34,211,238,0.2)] transition-all duration-500 pointer-events-none
        ${isFocused ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}`} 
      />
    </div>
  )
}

/* --- 2. SUB-COMPONENT: MAGNETIC BUTTON --- */
// A button that follows your mouse slightly for a heavy, premium feel
const MagneticButton = ({ children, onClick, disabled, status }) => {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    if (disabled) return
    const { clientX, clientY } = e
    const { left, top, width, height } = btnRef.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.3 // Magnetic pull strength
    const y = (clientY - (top + height / 2)) * 0.3
    gsap.to(btnRef.current, { x, y, duration: 0.2 })
  }

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" })
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`
        relative w-full py-5 rounded-2xl font-bold text-lg tracking-widest uppercase overflow-hidden group
        transition-all duration-500
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-[0_0_40px_rgba(34,211,238,0.6),_inset_0_0_20px_rgba(34,211,238,0.3)]'}
        bg-slate-950 border border-cyan-500/50 text-cyan-400 hover:text-white hover:border-cyan-400
      `}
    >
      {/* Solid Glow Backdrop */}
      <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/30 transition-colors duration-500" />
      
      {/* Shine Sweep */}
      <div className="absolute top-0 left-[-100%] w-[120%] h-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
      
      <span className="relative z-10 flex items-center justify-center gap-3">
        {status === "sending" ? (
           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#22d3ee]" />
        ) : status === "success" ? (
           "Transmission Sent ✅"
        ) : (
           children
        )}
      </span>
    </button>
  )
}

/* --- 3. MAIN COMPONENT --- */
const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [status, setStatus] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus("sending")
    emailjs.send(
      "service_m5rm0mc", "template_nb4rm6s", // Replace with your IDs if needed
      { from_name: formData.name, from_email: formData.email, message: formData.message },
      "MJJPLD1-WoImEbrZj"
    ).then(() => {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus(""), 4000)
    }, () => setStatus("error"))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo(formRef.current, 
        { y: 50, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black -z-20" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      
      {/* Header */}
      <div className="text-center mb-16 z-10">
        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-20 select-none absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
          CONTACT
        </h2>
        <h2 className="text-4xl md:text-6xl font-bold text-white relative">
          Initialize <span className="text-cyan-400 font-cursive">Connection</span>
        </h2>
      </div>

      <div className="w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* --- LEFT: HOLOGRAPHIC FORM --- */}
        <div className="flex justify-center lg:justify-end">
          <form 
            ref={formRef}
            onSubmit={sendEmail}
            className="w-full max-w-md relative p-10 pt-16 group rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-2 z-10"
          >
            {/* Minimalist Glowing Pulse Indicator */}
            <div className="absolute top-6 left-8 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
               <h4 className="text-sm font-bold text-cyan-400 tracking-widest uppercase">Secure Link</h4>
            </div>
            
            {/* Cyber Grid Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none rounded-[2rem]" />

            <div className="space-y-8 relative z-10">
              <HoloInput label="Name" name="name" value={formData.name} onChange={handleChange} />
              <HoloInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <HoloInput label="Message" name="message" value={formData.message} onChange={handleChange} isTextArea />
              
              <MagneticButton status={status} disabled={status === "sending" || status === "success"}>
                Send Message
              </MagneticButton>
            </div>
          </form>
        </div>

        {/* --- RIGHT: IMAGE STACK --- */}
        <div className="h-[500px] flex items-center justify-center lg:justify-start">
           <AboutImageStack />
        </div>

      </div>
    </section>
  )
}

export default Contact