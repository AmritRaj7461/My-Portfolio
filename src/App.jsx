import { useState } from "react"
import GlobalBackground from "./components/GlobalBackground"
import Navbar from "./components/Navbar"
import Hero from "./sections/hero/Hero"
import About from "./sections/about/About"
import Skills from "./sections/skills/Skills"
import Certifications from "./sections/certifications/Certifications"
import Projects from "./sections/projects/Projects"
import Contact from "./sections/contact/Contact"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import Cursor from "./components/Cursor"
import CometCanvas from "./canvas/CometCanvas"
import { PortfolioProvider } from './context/PortfolioContext'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [showHero, setShowHero] = useState(false)

  return (
    <PortfolioProvider>
      
      {loading && (
        <Loader 
          onComplete={() => setLoading(false)} 
          onReveal={() => setShowHero(true)} 
        />
      )}

      {/* FIX: Changed 'bg-slate-950' to 'bg-transparent'
         This allows GlobalBackground to control the color fully.
      */}
      <div className="relative w-full min-h-screen bg-transparent text-white selection:bg-cyan-400 selection:text-black">
          
          {/* Global Background is Fixed Behind Everything */}
          <div className="fixed inset-0 z-0 pointer-events-none">
             <GlobalBackground />
          </div>
          
          <CometCanvas />
          <Cursor />
          <Navbar />

          <main className="relative z-10">
            <Hero showAnimation={showHero} />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
          </main>

      </div>
      
    </PortfolioProvider>
  )
}

export default App