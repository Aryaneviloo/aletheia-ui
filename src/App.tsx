import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Universe from './components/Universe'

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#05060f' }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <color attach="background" args={['#000004']} />
          <Universe />
        <OrbitControls />
      </Canvas>
    </div>
  )
}