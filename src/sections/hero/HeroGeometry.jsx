import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Octahedron, Icosahedron, Tetrahedron, Dodecahedron, Torus, Sphere, Sparkles, PresentationControls, Trail } from "@react-three/drei"
import * as THREE from "three"

// --- SOUND UTILITY ---
const playHoverSound = () => {
  // Create a simple "blip" sound using an Audio object
  // Ensure you have a file at public/sounds/hover.mp3
  // Or remove this function if you prefer silence for now
  try {
    const audio = new Audio("/sounds/hover.wav")
    audio.volume = 0.2
    audio.play().catch(() => {}) // Catch auto-play errors
  } catch (e) {
    // Fail silently if file missing
  }
}

// --- 1. GEOMETRY SHAPES ---
// (Kept exact same as your "Sacred Geometry" version)

const AtomShape = ({ color }) => (
  <group scale={0.4}>
    <Sphere args={[0.15, 16, 16]}>
        <meshBasicMaterial color={color} toneMapped={false} />
    </Sphere>
    <Torus args={[0.6, 0.02, 32, 64]}>
        <meshBasicMaterial color={color} toneMapped={false} />
    </Torus>
    <Torus args={[0.6, 0.02, 32, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color={color} toneMapped={false} />
    </Torus>
    <Torus args={[0.6, 0.02, 32, 64]} rotation={[-Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color={color} toneMapped={false} />
    </Torus>
  </group>
)

const PyramidShape = ({ color }) => (
  <group scale={0.4}>
    <Tetrahedron args={[0.7, 0]}>
        <meshBasicMaterial color={color} wireframe={true} toneMapped={false} />
    </Tetrahedron>
    <Tetrahedron args={[0.3, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
    </Tetrahedron>
  </group>
)

const CrystalShape = ({ color }) => (
  <group scale={0.4}>
    <Icosahedron args={[0.6, 0]}>
        <meshBasicMaterial color={color} wireframe={true} toneMapped={false} />
    </Icosahedron>
    <Icosahedron args={[0.3, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
    </Icosahedron>
  </group>
)

const DiamondShape = ({ color }) => (
  <group scale={0.4}>
    <Octahedron args={[0.6, 0]}>
        <meshBasicMaterial color={color} wireframe={true} toneMapped={false} />
    </Octahedron>
    <Octahedron args={[0.3, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
    </Octahedron>
  </group>
)

// --- 2. ORBITING LOGIC ---
const TechNode = ({ ShapeComponent, color, radius, speed, offset, clockwise = true }) => {
  const ref = useRef()
  const shapeRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset
    const dir = clockwise ? -1 : 1
    if (ref.current) ref.current.rotation.z = t * dir
    if (shapeRef.current) {
        shapeRef.current.rotation.x = t * 0.5
        shapeRef.current.rotation.y = t * 0.3
    }
  })

  return (
    <group ref={ref}>
      <group position={[radius, 0, 0]}>
         <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
             <group ref={shapeRef}>
                 <ShapeComponent color={color} />
             </group>
         </Trail>
         <pointLight color={color} distance={2} intensity={3} decay={2} />
      </group>
    </group>
  )
}

// --- 3. MAIN REACTOR (Now Responsive) ---
const TechReactor = () => {
  const outerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const coreRef = useRef()
  const [hovered, setHover] = useState(false)
  
  // Responsive Hooks
  const { viewport } = useThree()
  const isMobile = viewport.width < 5 // Approximate threshold for mobile in R3F units

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (outerRef.current) {
        outerRef.current.rotation.y = time * 0.05
        outerRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
    }
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x = time * 0.15
        ring1Ref.current.rotation.y = time * 0.1
    }
    if (ring2Ref.current) {
        ring2Ref.current.rotation.x = -time * 0.15
        ring2Ref.current.rotation.z = time * 0.1
    }
    if (coreRef.current) {
        const scale = 0.8 + Math.sin(time * 3) * 0.05
        coreRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group 
        // 1. MOBILE RESPONSIVENESS:
        // If mobile: Scale down (1.2)
        // If Desktop: Hover expands from 2.0 -> 2.2
        scale={isMobile ? 1.2 : (hovered ? 2.2 : 2.0)} 
        transition="scale 0.5s ease"
    >
        
        {/* HIT BOX with Sound Trigger */}
        <mesh 
            onPointerOver={() => {
                setHover(true)
                playHoverSound() // <--- SOUND TRIGGER
            }} 
            onPointerOut={() => setHover(false)}
        >
           <sphereGeometry args={[3.5, 32, 32]} /> 
           <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>

        {/* --- GEOMETRY LAYERS --- */}
        <Octahedron args={[1.6, 0]} ref={outerRef}>
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.2} toneMapped={false} />
        </Octahedron>

        <group ref={ring1Ref}>
            <Torus args={[1.9, 0.02, 64, 100]}>
                <meshBasicMaterial color="#a855f7" transparent opacity={0.4} toneMapped={false} />
            </Torus>
            <TechNode ShapeComponent={AtomShape} radius={1.9} speed={0.5} offset={0} color="#22d3ee" clockwise={true} />
            <TechNode ShapeComponent={CrystalShape} radius={1.9} speed={0.5} offset={2} color="#a855f7" clockwise={true} />
            <TechNode ShapeComponent={PyramidShape} radius={1.9} speed={0.5} offset={4} color="#ffffff" clockwise={true} />
        </group>

        <group ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
            <Torus args={[1.8, 0.02, 64, 100]}>
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} toneMapped={false} />
            </Torus>
            <TechNode ShapeComponent={DiamondShape} radius={1.8} speed={0.4} offset={1} color="#22d3ee" clockwise={false} />
            <TechNode ShapeComponent={PyramidShape} radius={1.8} speed={0.4} offset={3} color="#a855f7" clockwise={false} />
            <TechNode ShapeComponent={AtomShape} radius={1.8} speed={0.4} offset={5} color="#ffffff" clockwise={false} />
        </group>

        <Dodecahedron args={[0.9, 0]}>
             <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} toneMapped={false} />
        </Dodecahedron>

        <Sparkles count={isMobile ? 40 : 80} scale={5} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
        
        <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.4, 2]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} depthWrite={false} />
        </mesh>

    </group>
  )
}

const HeroGeometry = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full md:w-1/2 z-30 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8.0] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        
        <PresentationControls 
            global={false} cursor={true} snap={true} speed={2} zoom={1} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 2, Math.PI / 2]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]} 
            config={{ mass: 1, tension: 170, friction: 26 }} 
        >
             <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <TechReactor />
             </Float>
        </PresentationControls>

      </Canvas>
    </div>
  )
}

export default HeroGeometry