import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#05060f' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#7aa2ff" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}