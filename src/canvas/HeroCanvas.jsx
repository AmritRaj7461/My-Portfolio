import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"

const HeroCanvas = () => {
  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 1] }}
    >
      <OrbitControls enableZoom={false} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={1}
      />
    </Canvas>
  )
}

export default HeroCanvas
