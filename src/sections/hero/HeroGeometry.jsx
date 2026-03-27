import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, PresentationControls, Dodecahedron, Torus, Html, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { SiReact, SiNodedotjs, SiNextdotjs, SiVuedotjs, SiTypescript, SiMongodb } from "react-icons/si"

// --- ORBITING TECH NODE ---
// Creates a ring and a rotating icon node that orbits along that ring
const TechOrbitNode = ({ icon: Icon, color, radius, speed, offset, rotationAxis }) => {
  const ref = useRef()
  
  useFrame((state) => {
    // Calculate rotation over time
    const t = state.clock.getElapsedTime() * speed + offset
    if (ref.current) {
      // The group is rotated around its Y-axis at the specified speed
      // Since the outer group is tilted by rotationAxis, this creates intersecting orbits
      ref.current.rotation.y = t
    }
  })

  return (
    <group rotation={rotationAxis}>
      
      {/* The Orbiting Track (Ring) */}
      <Torus args={[radius, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} />
      </Torus>
      
      {/* The Orbiting Entity */}
      <group ref={ref}>
         <group position={[radius, 0, 0]}>
            {/* 3D Shell to give presence to the icon */}
            <Dodecahedron args={[0.3, 0]}>
               <meshBasicMaterial color={color} wireframe transparent opacity={0.6} toneMapped={false} />
            </Dodecahedron>
            
            <Dodecahedron args={[0.15, 0]}>
               <meshBasicMaterial color={color} toneMapped={false} />
            </Dodecahedron>

            {/* Glowing Light Source */}
            <pointLight color={color} intensity={2} distance={3} />

            {/* Floating UI Icon (Using Drei's HTML to render React-Icons in 3D Space) */}
            <Html center distanceFactor={15} zIndexRange={[100, 0]} className="pointer-events-none select-none">
               <div className="flex items-center justify-center p-3 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_currentColor]" style={{ color: color }}>
                  <Icon size={28} />
               </div>
            </Html>
         </group>
      </group>

    </group>
  )
}


// --- CENTRAL CORE SYSTEM ---
const CoreSystem = () => {
    const coreRef = useRef()
    const { viewport } = useThree()
    const isMobile = viewport.width < 5

    // Slowly rotate the central core
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.15
            coreRef.current.rotation.x = t * 0.1
        }
    })

    return (
        <group 
            scale={isMobile ? 0.6 : 0.85} 
            // Better gap: Shifted slightly to the right (0.5)
            position={isMobile ? [0, 0, 0] : [0.5, 0, 0]}
        >
           {/* 1. CENTRAL "PANTAGONE" (Dodecahedron has Pentagonal faces) */}
           <group ref={coreRef}>
               {/* Inner solid void */}
               <Dodecahedron args={[1.2, 0]}>
                   <meshBasicMaterial color="#0f172a" />
               </Dodecahedron>
               
               {/* Outer Wireframe Core */}
               <Dodecahedron args={[1.5, 0]}>
                   <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} toneMapped={false} />
               </Dodecahedron>
               
               {/* Central Core Light */}
               <pointLight color="#22d3ee" intensity={2} distance={10} />
           </group>

           {/* 2. CROSS-AXIAL ORBITS WITH TECH ICONS */}
           {/* React */}
           <TechOrbitNode 
               icon={SiReact} color="#61DAFB" 
               radius={2.6} speed={0.5} offset={0} 
               rotationAxis={[0.2, 0, 0.2]} 
           />
           {/* Node.js */}
           <TechOrbitNode 
               icon={SiNodedotjs} color="#339933" 
               radius={3.0} speed={0.4} offset={2} 
               rotationAxis={[-0.4, 0, 0.5]} 
           />
           {/* Next.js */}
           <TechOrbitNode 
               icon={SiNextdotjs} color="#ffffff" 
               radius={3.4} speed={0.3} offset={4} 
               rotationAxis={[0.5, 0, -0.2]} 
           />
           {/* Vue.js */}
           <TechOrbitNode 
               icon={SiVuedotjs} color="#4FC08D" 
               radius={3.8} speed={0.45} offset={1} 
               rotationAxis={[-0.2, 0, -0.6]} 
           />
           {/* MongoDB */}
           <TechOrbitNode 
               icon={SiMongodb} color="#47A248" 
               radius={4.2} speed={0.35} offset={3} 
               rotationAxis={[0.6, 0, 0.4]} 
           />

           {/* 3. BACKGROUND SPARKLES */}
           <Sparkles count={isMobile ? 50 : 150} scale={12} size={2} speed={0.2} opacity={0.5} color="#22d3ee" />
           <Sparkles count={isMobile ? 20 : 50} scale={12} size={3} speed={0.1} opacity={0.3} color="#a855f7" />
        </group>
    )
}

// --- MAIN CANVAS WRAPPER ---
const HeroGeometry = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full md:w-1/2 z-30 cursor-grab active:cursor-grabbing pointer-events-auto">
      {/* 
        Camera pulled back to Z=12 to ensure the outer orbits don't get cut off the screen.
      */}
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={1} />
        
        {/* Interactive Controls to allow the user to rotate the entire system */}
        <PresentationControls 
            global={false} cursor={true} snap={true} speed={2} zoom={1} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 4, Math.PI / 4]} 
            config={{ mass: 1, tension: 170, friction: 26 }} 
        >
             {/* Floating animation for the entire core */}
             <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <CoreSystem />
             </Float>
        </PresentationControls>

      </Canvas>
    </div>
  )
}

export default HeroGeometry