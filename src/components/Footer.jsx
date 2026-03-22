import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/AmritRaj7461" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/amrit-raj-7065092a0/" },
    { name: "Twitter", icon: <FaTwitter />, url: "#" },
    { name: "LeetCode", icon: <SiLeetcode />, url: "https://leetcode.com/u/amritraj7461" },
    { name: "Email", icon: <FaEnvelope />, url: "mailto:amritraj7461@gmail.com" },
  ];

  return (
    <footer className="relative w-full pt-10 pb-6 overflow-hidden bg-slate-950 border-t border-cyan-500/20">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-24 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2 tracking-wide"
            >
              Amrit Raj
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 max-w-md text-sm leading-relaxed"
            >
              Building intelligent, scalable, and visually stunning digital experiences. Specializing in AI, Machine Learning, and Modern Web architectures.
            </motion.p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 font-semibold mb-3 tracking-wider text-sm uppercase"
            >
              Connect with me
            </motion.h4>
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                  aria-label={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-6 origin-center"
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-2 md:mb-0"
          >
            © {currentYear} Amrit Raj. All rights reserved.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-1.5"
          >
            Crafted with <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }} 
              className="text-fuchsia-500"
            >♥</motion.span> using <span className="text-cyan-400">React</span>, <span className="text-cyan-300">Tailwind</span> & <span className="text-fuchsia-400">Framer Motion</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
