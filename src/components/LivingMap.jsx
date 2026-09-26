import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const PAPER = '#eee8df'
const STONE = '#c9c0b6'
const INK = '#181513'
const ACCENT = '#df765f'
const WINE = '#a83459'
const CHAMPAGNE = '#c69a7d'

const zones = [
  {
    key: 'visibility', no: '01', title: 'WIDOCZNOŚĆ', eyebrow: 'CZY FIRMA JEST WIDOCZNA?',
    detail: 'Google · SEO · Maps · AI Search', pos: [-3.6, -0.72], type: 'radar', color: '#d97861',
  },
  {
    key: 'website', no: '02', title: 'STRONA I OFERTA', eyebrow: 'CZY KLIENT ROZUMIE WARTOŚĆ?',
    detail: 'Komunikat · UX · CTA · oferta', pos: [-1.7, 0.78], type: 'portal', color: '#c55b69',
  },
  {
    key: 'social', no: '03', title: 'SOCIAL & CONTENT', eyebrow: 'CZY MARKA BUDUJE UWAGĘ?',
    detail: 'Treści · social · spójność · relacja', pos: [0.15, -0.58], type: 'network', color: '#9e3d62',
  },
  {
    key: 'trust', no: '04', title: 'ZAUFANIE', eyebrow: 'CZY KLIENT MA POWÓD CI ZAUFAĆ?',
    detail: 'Opinie · proof · reputacja · przewaga', pos: [2.05, 0.86], type: 'proof', color: '#8d3154',
  },
  {
    key: 'conversion', no: '05', title: 'KONWERSJA', eyebrow: 'GDZIE ZAINTERESOWANIE GINIE?',
    detail: 'Formularz · kontakt · lead · sprzedaż', pos: [3.9, -0.34], type: 'funnel', color: '#d16f5c',
  },
]

function heightAt(x, z) {
  const ridge = Math.exp(-((z + Math.sin(x * 0.55) * 0.44) ** 2) / 0.76) * 0.36
  const left = Math.exp(-((x + 2.7) ** 2 + (z - 0.15) ** 2) / 2.9) * 0.70
  const mid = Math.exp(-((x + 0.3) ** 2 + (z + 0.4) ** 2) / 2.1) * 0.52
  const right = Math.exp(-((x - 2.7) ** 2 + (z - 0.3) ** 2) / 2.55) * 0.80
  const canyon = Math.exp(-((x - 0.75) ** 2 + (z + 0.05) ** 2) / 0.19) * 0.38
  const step = Math.sin(x * 1.15 + z * 0.8) * 0.035
  return 0.14 + ridge + left + mid + right - canyon + step
}

function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10.8, 6.8, 150, 96)
    const pos = geo.attributes.position
    const colors = []
    const low = new THREE.Color('#a99f96')
    const mid = new THREE.Color('#d8d0c6')
    const high = new THREE.Color('#f8f4ed')

    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i)
      const z = -pos.getY(i)
      const h = heightAt(x, z)
      pos.setZ(i, h)
      const t = THREE.MathUtils.clamp((h - 0.08) / 0.95, 0, 1)
      const c = t < 0.55
        ? low.clone().lerp(mid, t / 0.55)
        : mid.clone().lerp(high, (t - 0.55) / 0.45)
      colors.push(c.r, c.g, c.b)
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    return geo
  }, [])

  const wire = useMemo(() => geometry.clone(), [geometry])

  return (
    <group position={[0, -0.86, 0]}>
      <mesh position={[0, -0.34, 0]} receiveShadow>
        <boxGeometry args={[11.35, 0.52, 7.35]} />
        <meshStandardMaterial color="#817970" roughness={0.96} />
      </mesh>
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial vertexColors roughness={0.86} metalness={0.01} />
      </mesh>
      <mesh geometry={wire} position={[0, 0.012, 0]}>
        <meshBasicMaterial color="#514a45" wireframe transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10.5, 6.5, 18, 12]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.028} depthWrite={false} />
      </mesh>
    </group>
  )
}

function RadarLandmark({ color }) {
  const sweep = useRef()
  useFrame(({ clock }) => {
    if (sweep.current) sweep.current.rotation.z = -clock.getElapsedTime() * 0.55
  })
  return (
    <group>
      {[0.32, 0.53, 0.75].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04 + i * 0.025, 0]}>
          <torusGeometry args={[r, 0.018, 12, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4 - i * 0.08} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.11, 0.88, 18]} />
        <meshStandardMaterial color={INK} metalness={0.35} roughness={0.34} />
      </mesh>
      <group ref={sweep} position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[0.38, 0, 0]}>
          <boxGeometry args={[0.72, 0.015, 0.018]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  )
}

function PortalLandmark({ color }) {
  return (
    <group>
      <mesh position={[-0.42, 0.40, 0]} castShadow><boxGeometry args={[0.12, 0.80, 0.14]} /><meshStandardMaterial color={INK} roughness={0.36} /></mesh>
      <mesh position={[0.42, 0.40, 0]} castShadow><boxGeometry args={[0.12, 0.80, 0.14]} /><meshStandardMaterial color={INK} roughness={0.36} /></mesh>
      <mesh position={[0, 0.78, 0]} castShadow><boxGeometry args={[0.96, 0.12, 0.14]} /><meshStandardMaterial color={INK} roughness={0.36} /></mesh>
      <mesh position={[0, 0.42, -0.02]}>
        <planeGeometry args={[0.70, 0.58]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.32} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.42, 0.02]}>
        <planeGeometry args={[0.50, 0.37]} />
        <meshBasicMaterial color="#fff8f0" transparent opacity={0.68} />
      </mesh>
    </group>
  )
}

function NetworkLandmark({ color }) {
  const nodes = [[-0.52, 0.22, 0.10], [0, 0.76, -0.04], [0.55, 0.28, 0.11], [0.05, 0.26, 0.52]]
  const lines = [[0,1],[1,2],[1,3],[0,3],[2,3]]
  return (
    <group>
      {lines.map(([a,b], i) => <Line key={i} points={[new THREE.Vector3(...nodes[a]), new THREE.Vector3(...nodes[b])]} color={color} lineWidth={1.7} transparent opacity={0.7} />)}
      {nodes.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[i === 1 ? 0.14 : 0.10, 20, 20]} />
          <meshStandardMaterial color={i === 1 ? '#fff5ec' : color} emissive={color} emissiveIntensity={i === 1 ? 0.65 : 0.28} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function ProofLandmark({ color }) {
  const core = useRef()
  useFrame(({ clock }) => {
    if (core.current) core.current.rotation.y = clock.getElapsedTime() * 0.20
  })
  return (
    <group>
      <mesh position={[0, 0.22, 0]} receiveShadow><cylinderGeometry args={[0.58, 0.68, 0.14, 6]} /><meshStandardMaterial color="#9b9187" roughness={0.8} /></mesh>
      <mesh ref={core} position={[0, 0.66, 0]} castShadow>
        <octahedronGeometry args={[0.40, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.33} metalness={0.24} roughness={0.28} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.48, 0.30, -0.43]} castShadow>
          <boxGeometry args={[0.24, 0.52 + i * 0.08, 0.18]} />
          <meshStandardMaterial color={i === 1 ? '#2a2522' : '#665d57'} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function FunnelLandmark({ color }) {
  return (
    <group>
      {[0.63, 0.47, 0.31].map((r, i) => (
        <mesh key={r} position={[0, 0.72 - i * 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.055, 12, 42]} />
          <meshStandardMaterial color={i === 2 ? WINE : color} emissive={color} emissiveIntensity={0.2 + i * 0.12} roughness={0.28} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI]} castShadow>
        <coneGeometry args={[0.22, 0.48, 24]} />
        <meshStandardMaterial color={INK} metalness={0.25} roughness={0.34} />
      </mesh>
    </group>
  )
}

function Landmark({ type, color }) {
  if (type === 'radar') return <RadarLandmark color={color} />
  if (type === 'portal') return <PortalLandmark color={color} />
  if (type === 'network') return <NetworkLandmark color={color} />
  if (type === 'proof') return <ProofLandmark color={color} />
  return <FunnelLandmark color={color} />
}

function Zone({ zone, index, progressRef, onSelectZone }) {
  const group = useRef()
  const halo = useRef()
  const [hovered, setHovered] = useState(false)
  const [x, z] = zone.pos
  const y = heightAt(x, z) - 0.70

  useFrame(({ clock }) => {
    const p = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1)
    const mapped = THREE.MathUtils.clamp((p - 0.12) / 0.88, 0, 0.999)
    const active = p > 0.12 && Math.min(4, Math.floor(mapped * 5)) === index
    const s = hovered || active ? 1.08 : 1
    if (group.current) group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.11)
    if (halo.current) {
      halo.current.material.opacity = THREE.MathUtils.lerp(halo.current.material.opacity, active ? 0.75 : hovered ? 0.5 : 0.18, 0.12)
      halo.current.rotation.z = clock.getElapsedTime() * (active ? 0.26 : 0.08)
    }
  })

  return (
    <group ref={group} position={[x, y, z]}>
      <mesh ref={halo} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.018, 12, 84]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <cylinderGeometry args={[0.86, 0.94, 0.11, 56]} />
        <meshStandardMaterial color="#d9d1c8" roughness={0.7} metalness={0.04} />
      </mesh>
      <group position={[0, 0.10, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <Landmark type={zone.type} color={zone.color} />
      </group>
      <Html position={[0, 1.46, 0]} center distanceFactor={6.4} style={{ pointerEvents: 'auto' }}>
        <button className={`map-zone-label ${hovered ? 'is-hovered' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onSelectZone?.(index)}>
          <span>{zone.no}</span>
          <strong>{zone.title}</strong>
          <small>{zone.detail}</small>
          <i>↗</i>
        </button>
      </Html>
    </group>
  )
}

function Route({ progressRef }) {
  const pulseRefs = useRef([])
  const scanRef = useRef()
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5.0, heightAt(-5.0, -1.1) - 0.66, -1.1),
    ...zones.map((z) => new THREE.Vector3(z.pos[0], heightAt(z.pos[0], z.pos[1]) - 0.57, z.pos[1])),
    new THREE.Vector3(5.0, heightAt(5.0, 0.4) - 0.62, 0.4),
  ], false, 'catmullrom', 0.40), [])
  const points = useMemo(() => curve.getPoints(220), [curve])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const pp = (t * 0.048 + i / 11) % 1
      mesh.position.copy(curve.getPointAt(pp))
      const s = 0.85 + Math.sin(t * 3.4 + i) * 0.18
      mesh.scale.setScalar(s)
    })
    if (scanRef.current) {
      const p = THREE.MathUtils.clamp((progressRef.current - 0.08) / 0.92, 0, 1)
      scanRef.current.position.copy(curve.getPointAt(p))
      scanRef.current.rotation.y = t * 0.5
    }
  })

  return (
    <group>
      <Line points={points} color="#7d2544" lineWidth={4.3} transparent opacity={0.18} />
      <Line points={points} color="#ef9a7f" lineWidth={1.55} transparent opacity={0.95} />
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={i} ref={(el) => { pulseRefs.current[i] = el }}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshBasicMaterial color={i % 4 === 0 ? '#ffffff' : ACCENT} transparent opacity={0.9} />
        </mesh>
      ))}
      <group ref={scanRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.025, 12, 48]} />
          <meshStandardMaterial color="#ffffff" emissive={WINE} emissiveIntensity={1.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.64, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  )
}

function DataPins() {
  const pins = useMemo(() => [
    [-4.4, 0.1], [-2.8, 1.3], [-2.5, -1.5], [-0.8, 1.65], [0.95, -1.35],
    [1.15, 1.55], [2.85, -1.55], [3.25, 1.45], [4.55, 0.85], [4.25, -1.35],
  ], [])
  return pins.map(([x, z], i) => {
    const y = heightAt(x, z) - 0.71
    const h = 0.16 + (i % 3) * 0.07
    return (
      <group key={i} position={[x, y, z]}>
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[0.012, 0.012, h, 8]} />
          <meshBasicMaterial color={i % 2 ? CHAMPAGNE : WINE} transparent opacity={0.55} />
        </mesh>
        <mesh position={[0, h + 0.03, 0]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    )
  })
}

function CameraRig({ progressRef }) {
  const { camera, pointer } = useThree()
  const pos = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const desiredTarget = useMemo(() => new THREE.Vector3(), [])

  const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(7.7, 5.5, 8.6),
    ...zones.map((z, i) => new THREE.Vector3(z.pos[0] + (i % 2 ? 2.2 : 2.5), 2.85 + i * 0.05, z.pos[1] + 3.55)),
  ], false, 'catmullrom', 0.34), [])

  const targetPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, -0.15, 0),
    ...zones.map((z) => new THREE.Vector3(z.pos[0], heightAt(z.pos[0], z.pos[1]) - 0.23, z.pos[1])),
  ], false, 'catmullrom', 0.34), [])

  useFrame(() => {
    const raw = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1)
    const p = raw < 0.115 ? 0 : THREE.MathUtils.smoothstep((raw - 0.115) / 0.885, 0, 1)
    desired.copy(cameraPath.getPointAt(p))
    desiredTarget.copy(targetPath.getPointAt(p))
    desired.x += pointer.x * 0.18
    desired.y += pointer.y * 0.10
    desired.z += pointer.x * 0.08
    pos.copy(camera.position).lerp(desired, 0.048)
    target.lerp(desiredTarget, 0.065)
    camera.position.copy(pos)
    camera.lookAt(target)
  })
  return null
}

function Scene({ progressRef, onSelectZone }) {
  return (
    <>
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 11, 24]} />
      <ambientLight intensity={1.3} />
      <hemisphereLight args={['#fff7ee', '#564b45', 2.25]} />
      <directionalLight position={[4, 9, 6]} intensity={3.35} color="#fff7ef" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-5, 3, -4]} intensity={1.15} color="#bbc8d7" />
      <pointLight position={[-3.5, 2.0, 1.5]} intensity={10} color={ACCENT} distance={7} />
      <pointLight position={[2.8, 2.2, 1.2]} intensity={11} color={WINE} distance={7} />
      <Terrain />
      <Route progressRef={progressRef} />
      <DataPins />
      {zones.map((zone, i) => <Zone key={zone.key} zone={zone} index={i} progressRef={progressRef} onSelectZone={onSelectZone} />)}
      <ContactShadows position={[0, -0.86, 0]} opacity={0.26} scale={14} blur={3.1} far={5.2} />
      <CameraRig progressRef={progressRef} />
    </>
  )
}

export function LivingMap({ progressRef, onSelectZone }) {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    let raf
    const tick = () => {
      const p = progressRef.current || 0
      const next = p <= 0.12 ? -1 : Math.min(4, Math.floor(((p - 0.12) / 0.88) * 5))
      setActive((prev) => (prev === next ? prev : next))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progressRef])

  return (
    <div className="living-map living-map--strategy">
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [7.7, 5.5, 8.6], fov: 39, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        shadows
      >
        <Scene progressRef={progressRef} onSelectZone={onSelectZone} />
      </Canvas>
      <div className="strategy-map-topline"><i /> INTERAKTYWNA MAPA WZROSTU <span>przewijaj lub wybierz obszar</span></div>
      <div className="strategy-map-nav" aria-label="Obszary mapy">
        {zones.map((zone, index) => (
          <button key={zone.key} className={active === index ? 'active' : ''} onClick={() => onSelectZone?.(index)}>
            <span>{zone.no}</span>{zone.title}
          </button>
        ))}
      </div>
      <div className="map-ui-corner map-ui-corner--tl" />
      <div className="map-ui-corner map-ui-corner--br" />
    </div>
  )
}
