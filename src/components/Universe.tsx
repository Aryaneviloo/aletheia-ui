import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

type Collection = {
  id: string
  name: string
  docCount: number
  position: [number, number, number]
  color: string
}

const FAKE: Collection[] = [
  { id: 'a', name: 'Research Papers', docCount: 120, position: [-7, 1, 0], color: '#8a5cff' },
  { id: 'b', name: 'Notes', docCount: 40, position: [6, -2, -4], color: '#ff6fb5' },
  { id: 'c', name: 'Code Docs', docCount: 80, position: [1, 4, -8], color: '#4aa8ff' },
]

function gaussian() {
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function Nebula({ c }: { c: Collection }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const radius = 1 + Math.sqrt(c.docCount) * 0.25
    const n = c.docCount * 60
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    const base = new THREE.Color(c.color)
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < n; i++) {
      const x = gaussian() * radius * 0.5
      const y = gaussian() * radius * 0.2
      const z = gaussian() * radius * 0.5
      positions.set([x, y, z], i * 3)

      const d = Math.min(Math.hypot(x, y, z) / radius, 1)
      const col = base.clone().lerp(white, (1 - d) * 0.7)
      colors.set([col.r, col.g, col.b], i * 3)
    }
    return { positions, colors }
  }, [c])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })

  return (
    <group position={c.position}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

export default function Universe() {
  return (
    <>
      <Stars radius={120} depth={60} count={4000} factor={4} fade />
      {FAKE.map((c) => (
        <Nebula key={c.id} c={c} />
      ))}
      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  )
}