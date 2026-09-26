import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const INK = '#0b0b0c'
const GRAPHITE = '#151517'
const GRAPHITE_2 = '#1f1f22'
const STEEL = '#77716b'
const IVORY = '#f4efe7'
const CHAMPAGNE = '#c9a477'
const CORAL = '#de755f'
const WINE = '#8f2f50'

const zones = [
  {
    key: 'visibility', no: '01', title: 'WIDOCZNOŚĆ',
    question: 'Czy Twoja firma pojawia się wtedy, kiedy klient naprawdę szuka?',
    detail: 'Google · SEO · Maps · Ads · AI Search',
    pos: [-3.7, -0.92], kind: 'tower',
  },
  {
    key: 'website', no: '02', title: 'STRONA I OFERTA',
    question: 'Czy klient od razu rozumie wartość, przewagę i następny krok?',
    detail: 'Komunikat · UX · CTA · oferta · landing page',
    pos: [-1.75, 0.82], kind: 'pavilion',
  },
  {
    key: 'social', no: '03', title: 'SOCIAL & CONTENT',
    question: 'Czy treści budują uwagę, relację i prowadzą dalej?',
    detail: 'Content · social · spójność · zaangażowanie',
    pos: [0.28, -0.78], kind: 'studio',
  },
  {
    key: 'trust', no: '04', title: 'ZAUFANIE',
    question: 'Czy klient ma wystarczający powód, żeby wybrać właśnie Ciebie?',
    detail: 'Opinie · case studies · reputacja · proof',
    pos: [2.15, 0.96], kind: 'boardroom',
  },
  {
    key: 'conversion', no: '05', title: 'KONWERSJA',
    question: 'Gdzie zainteresowanie przestaje zamieniać się w kontakt i sprzedaż?',
    detail: 'Formularz · lead · konsultacja · oferta · sprzedaż',
    pos: [4.02, -0.52], kind: 'hq',
  },
]

const roadPoints = [
  [-5.25, -1.7], [-4.55, -1.2], [-3.7, -0.92], [-2.85, -0.12], [-1.75, 0.82],
  [-0.72, 0.15], [0.28, -0.78], [1.26, 0.03], [2.15, 0.96], [3.15, 0.15], [4.02, -0.52], [5.15, 0.1],
]

function slabY(x, z) {
  return 0.015 + Math.sin(x * 0.5) * 0.006 + Math.cos(z * 0.8) * 0.004
}

function DistrictBase({ x, z, w, d, rot = 0, tone = GRAPHITE_2 }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh receiveShadow position={[0, 0.035, 0]}>
        <boxGeometry args={[w, 0.07, d]} />
        <meshStandardMaterial color={tone} metalness={0.18} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.073, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.92, d * 0.88]} />
        <meshBasicMaterial color="#2b2927" transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

function ExecutiveMapBase() {
  const contour = useMemo(() => {
    const lines = []
    for (let i = 0; i < 8; i += 1) {
      const inset = i * 0.32
      lines.push([
        new THREE.Vector3(-5.7 + inset, 0.086 + i * 0.001, -3.25 + inset * 0.34),
        new THREE.Vector3(5.7 - inset, 0.086 + i * 0.001, -3.25 + inset * 0.34),
        new THREE.Vector3(5.7 - inset, 0.086 + i * 0.001, 3.25 - inset * 0.34),
        new THREE.Vector3(-5.7 + inset, 0.086 + i * 0.001, 3.25 - inset * 0.34),
        new THREE.Vector3(-5.7 + inset, 0.086 + i * 0.001, -3.25 + inset * 0.34),
      ])
    }
    return lines
  }, [])

  return (
    <group position={[0, -0.92, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[12.4, 0.34, 7.4]} />
        <meshStandardMaterial color="#09090a" metalness={0.34} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.19, 0]} receiveShadow>
        <boxGeometry args={[11.85, 0.08, 6.88]} />
        <meshStandardMaterial color="#121214" metalness={0.16} roughness={0.84} />
      </mesh>
      {contour.map((points, i) => (
        <Line key={i} points={points} color={i === 0 ? '#5b5148' : '#393431'} lineWidth={i === 0 ? 1.25 : 0.65} transparent opacity={0.38 - i * 0.025} />
      ))}
      <DistrictBase x={-3.7} z={-0.92} w={2.05} d={1.75} rot={-0.08} />
      <DistrictBase x={-1.75} z={0.82} w={2.0} d={1.55} rot={0.04} tone="#19191b" />
      <DistrictBase x={0.28} z={-0.78} w={2.0} d={1.72} rot={-0.03} />
      <DistrictBase x={2.15} z={0.96} w={2.12} d={1.58} rot={0.06} tone="#19191b" />
      <DistrictBase x={4.02} z={-0.52} w={1.95} d={1.72} rot={-0.08} />
    </group>
  )
}

function LitWindow({ position, size = [0.18, 0.08], strength = 0.8 }) {
  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={IVORY} emissive={CHAMPAGNE} emissiveIntensity={strength} roughness={0.3} />
    </mesh>
  )
}

function VisibilityTower({ active }) {
  return (
    <group>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.7, 0.96, 0.62]} />
        <meshStandardMaterial color="#151517" metalness={0.46} roughness={0.28} />
      </mesh>
      {[0.2, 0.4, 0.6, 0.8].map((y) => <LitWindow key={y} position={[0.351, y, 0.0]} size={[0.01, 0.12]} strength={active ? 2.1 : 0.8} />)}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 0.52, 12]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.76} roughness={0.22} />
      </mesh>
      {[0.22, 0.38].map((r) => (
        <mesh key={r} position={[0, 1.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.012, 10, 48]} />
          <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={active ? 0.95 : 0.4} />
        </mesh>
      ))}
    </group>
  )
}

function WebsitePavilion({ active }) {
  return (
    <group>
      <mesh position={[0, 0.27, 0]} castShadow>
        <boxGeometry args={[1.28, 0.52, 0.82]} />
        <meshPhysicalMaterial color="#171719" metalness={0.28} roughness={0.2} transmission={0.18} transparent opacity={0.94} />
      </mesh>
      <mesh position={[0, 0.54, -0.1]}>
        <boxGeometry args={[1.06, 0.035, 0.58]} />
        <meshStandardMaterial color="#312a26" metalness={0.3} roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.29, 0.416]}>
        <planeGeometry args={[0.78, 0.25]} />
        <meshStandardMaterial color="#0e0f11" emissive={active ? CORAL : CHAMPAGNE} emissiveIntensity={active ? 1.2 : 0.25} />
      </mesh>
      {[[-0.44, 0.28, 0.418], [0.44, 0.28, 0.418]].map((p, i) => <LitWindow key={i} position={p} size={[0.13, 0.19]} strength={active ? 1.8 : 0.55} />)}
      <mesh position={[0, 0.04, 0.57]}>
        <boxGeometry args={[0.86, 0.035, 0.32]} />
        <meshStandardMaterial color="#262326" roughness={0.75} />
      </mesh>
    </group>
  )
}

function SocialStudio({ active }) {
  const bars = [0.35, 0.52, 0.4, 0.7, 0.57]
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.78, 0.84, 0.16, 40]} />
        <meshStandardMaterial color="#171719" metalness={0.3} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.23, -0.18]} castShadow>
        <boxGeometry args={[1.24, 0.35, 0.56]} />
        <meshStandardMaterial color="#202023" metalness={0.24} roughness={0.34} />
      </mesh>
      {bars.map((h, i) => (
        <mesh key={i} position={[-0.4 + i * 0.2, 0.28 + h * 0.28, 0.11]}>
          <boxGeometry args={[0.09, h * 0.56, 0.06]} />
          <meshStandardMaterial color={i === 3 ? WINE : '#6b5c54'} emissive={i === 3 ? WINE : CHAMPAGNE} emissiveIntensity={active ? 0.8 : 0.16} />
        </mesh>
      ))}
      <mesh position={[0, 0.74, -0.23]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.015, 10, 52]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={active ? 0.9 : 0.38} />
      </mesh>
    </group>
  )
}

function TrustBoardroom({ active }) {
  return (
    <group>
      <mesh position={[0, 0.26, 0]} castShadow>
        <boxGeometry args={[1.34, 0.5, 0.92]} />
        <meshStandardMaterial color="#151416" metalness={0.34} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.44, 0.47]}>
        <planeGeometry args={[0.88, 0.18]} />
        <meshStandardMaterial color="#16110f" emissive={active ? CHAMPAGNE : '#5f4936'} emissiveIntensity={active ? 1.1 : 0.3} />
      </mesh>
      {[-0.48, -0.16, 0.16, 0.48].map((x, i) => (
        <mesh key={i} position={[x, 0.54, -0.2]} castShadow>
          <boxGeometry args={[0.06, 0.66, 0.08]} />
          <meshStandardMaterial color={i === 1 || i === 2 ? CHAMPAGNE : '#5c5149'} metalness={0.58} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[0, 0.13, 0.08]}>
        <boxGeometry args={[0.76, 0.08, 0.36]} />
        <meshStandardMaterial color="#302721" metalness={0.15} roughness={0.45} />
      </mesh>
    </group>
  )
}

function ConversionHQ({ active }) {
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.18 - i * 0.18, 0.18 + i * 0.24, -0.08 + i * 0.04]} castShadow>
          <boxGeometry args={[1.1 - i * 0.18, 0.32, 0.86 - i * 0.08]} />
          <meshStandardMaterial color={i === 2 ? '#262126' : '#161618'} metalness={0.38} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0.12, 0.86, 0.0]}>
        <boxGeometry args={[0.48, 0.05, 0.42]} />
        <meshStandardMaterial color={CHAMPAGNE} emissive={active ? CORAL : CHAMPAGNE} emissiveIntensity={active ? 1.4 : 0.34} />
      </mesh>
      {[0.2, 0.44, 0.68].map((y, i) => <LitWindow key={y} position={[0.73 - i * 0.1, y, 0.18]} size={[0.012, 0.13]} strength={active ? 1.6 : 0.5} />)}
    </group>
  )
}

function ZoneArchitecture({ kind, active }) {
  if (kind === 'tower') return <VisibilityTower active={active} />
  if (kind === 'pavilion') return <WebsitePavilion active={active} />
  if (kind === 'studio') return <SocialStudio active={active} />
  if (kind === 'boardroom') return <TrustBoardroom active={active} />
  return <ConversionHQ active={active} />
}

function Zone({ zone, index, activeIndex, hoveredIndex, setHoveredIndex, onSelectZone }) {
  const group = useRef()
  const ring = useRef()
  const active = activeIndex === index
  const hovered = hoveredIndex === index
  const [x, z] = zone.pos

  useFrame(({ clock }) => {
    const target = active || hovered ? 1.08 : 1
    if (group.current) {
      group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, target, 0.1)
      group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, target, 0.1)
      group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, target, 0.1)
    }
    if (ring.current) {
      ring.current.rotation.z = clock.getElapsedTime() * (active ? 0.22 : 0.05)
      ring.current.material.opacity = THREE.MathUtils.lerp(ring.current.material.opacity, active ? 0.82 : hovered ? 0.5 : 0.12, 0.08)
    }
  })

  return (
    <group ref={group} position={[x, -0.71 + slabY(x, z), z]}
      onPointerEnter={(e) => { e.stopPropagation(); setHoveredIndex(index); document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHoveredIndex(-1); document.body.style.cursor = '' }}
      onClick={(e) => { e.stopPropagation(); onSelectZone?.(index) }}>
      <mesh ref={ring} position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.93, 0.015, 10, 72]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={0.12} />
      </mesh>
      <ZoneArchitecture kind={zone.kind} active={active || hovered} />
      <group position={[-0.64, 0.08, 0.64]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.055, 40]} />
          <meshStandardMaterial color={active ? CORAL : '#252327'} emissive={active ? CORAL : '#000000'} emissiveIntensity={active ? 0.8 : 0} metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.031, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.075, 0.09, 32]} />
          <meshBasicMaterial color={IVORY} />
        </mesh>
      </group>
    </group>
  )
}

function RoadSystem({ progressRef }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    roadPoints.map(([x, z]) => new THREE.Vector3(x, -0.695, z)), false, 'catmullrom', 0.36
  ), [])
  const points = useMemo(() => curve.getPoints(260), [curve])
  const pulses = useRef([])
  const scanner = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulses.current.forEach((m, i) => {
      if (!m) return
      m.position.copy(curve.getPointAt((t * 0.035 + i / 8) % 1))
    })
    if (scanner.current) {
      const p = THREE.MathUtils.clamp((progressRef.current - 0.08) / 0.92, 0, 1)
      scanner.current.position.copy(curve.getPointAt(p))
    }
  })

  return (
    <group>
      <Line points={points} color="#070708" lineWidth={8} transparent opacity={0.96} />
      <Line points={points} color="#5a4b40" lineWidth={3.6} transparent opacity={0.92} />
      <Line points={points} color={CHAMPAGNE} lineWidth={1.15} transparent opacity={0.9} />
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} ref={(el) => { pulses.current[i] = el }}>
          <sphereGeometry args={[i % 4 === 0 ? 0.055 : 0.036, 14, 14]} />
          <meshBasicMaterial color={i % 4 === 0 ? IVORY : CORAL} />
        </mesh>
      ))}
      <group ref={scanner}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.018, 10, 52]} />
          <meshBasicMaterial color={CORAL} transparent opacity={0.95} />
        </mesh>
        <pointLight color={CORAL} intensity={4} distance={1.5} />
      </group>
    </group>
  )
}

function ContextBlocks() {
  const blocks = useMemo(() => [
    [-4.9, 1.65, .62, .42, .20], [-4.15, 1.85, .42, .36, .28], [-2.9, -2.05, .7, .44, .18],
    [-2.05, -1.9, .42, .32, .31], [-0.72, 1.9, .66, .44, .22], [0.1, 1.78, .38, .35, .34],
    [1.03, -2.0, .58, .42, .20], [1.73, -1.78, .36, .3, .30], [3.22, 1.98, .58, .38, .24],
    [4.25, 1.68, .4, .3, .36], [4.82, -1.75, .64, .4, .20], [3.68, -2.1, .36, .32, .28],
  ], [])
  return blocks.map(([x, z, w, d, h], i) => (
    <mesh key={i} position={[x, -0.75 + h / 2, z]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={i % 3 === 0 ? '#222125' : '#18181a'} metalness={0.2} roughness={0.62} />
    </mesh>
  ))
}

function CameraRig({ progressRef }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const desiredTarget = useMemo(() => new THREE.Vector3(), [])

  const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(7.7, 5.2, 8.4),
    ...zones.map((z, i) => new THREE.Vector3(z.pos[0] + (i % 2 ? 2.1 : 2.45), 2.55 + i * 0.04, z.pos[1] + 3.3)),
  ], false, 'catmullrom', 0.32), [])
  const targetPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.3, -0.55, 0),
    ...zones.map((z) => new THREE.Vector3(z.pos[0], -0.35, z.pos[1])),
  ], false, 'catmullrom', 0.32), [])

  useFrame(() => {
    const raw = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1)
    const p = raw < 0.115 ? 0 : THREE.MathUtils.smoothstep((raw - 0.115) / 0.885, 0, 1)
    desired.copy(cameraPath.getPointAt(p))
    desiredTarget.copy(targetPath.getPointAt(p))
    desired.x += pointer.x * 0.12
    desired.y += pointer.y * 0.05
    camera.position.lerp(desired, 0.045)
    target.lerp(desiredTarget, 0.065)
    camera.lookAt(target)
  })
  return null
}

function Scene({ progressRef, activeIndex, hoveredIndex, setHoveredIndex, onSelectZone }) {
  return (
    <>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 11.5, 23]} />
      <ambientLight intensity={0.58} />
      <hemisphereLight args={['#eadbc8', '#070708', 0.8]} />
      <directionalLight position={[5, 8, 6]} intensity={2.5} color="#f0dfca" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-4, 4, -5]} intensity={0.75} color="#8a94a5" />
      <pointLight position={[-2.4, 2.4, 2.3]} intensity={5.5} color={CHAMPAGNE} distance={7} />
      <pointLight position={[3.4, 2.0, -0.8]} intensity={4.2} color={WINE} distance={5.5} />
      <ExecutiveMapBase />
      <ContextBlocks />
      <RoadSystem progressRef={progressRef} />
      {zones.map((zone, i) => (
        <Zone key={zone.key} zone={zone} index={i} activeIndex={activeIndex} hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex} onSelectZone={onSelectZone} />
      ))}
      <CameraRig progressRef={progressRef} />
    </>
  )
}

export function LivingMap({ progressRef, onSelectZone }) {
  const [active, setActive] = useState(-1)
  const [hovered, setHovered] = useState(-1)

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

  const inspected = zones[hovered >= 0 ? hovered : active >= 0 ? active : 0]
  const inspectedIndex = hovered >= 0 ? hovered : active

  return (
    <div className="living-map living-map--executive">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [7.7, 5.2, 8.4], fov: 38, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        shadows
      >
        <Scene progressRef={progressRef} activeIndex={active} hoveredIndex={hovered} setHoveredIndex={setHovered} onSelectZone={onSelectZone} />
      </Canvas>

      <div className="executive-map-kicker"><i /> DIGITALMAP / BUSINESS GROWTH MAP <span>scroll · hover · click</span></div>

      <aside className={`map-inspector ${inspectedIndex >= 0 ? 'is-active' : ''}`}>
        <div className="map-inspector__top"><span>{inspected.no}</span><small>OBSZAR DIAGNOZY</small></div>
        <strong>{inspected.title}</strong>
        <p>{inspected.question}</p>
        <div>{inspected.detail}</div>
      </aside>

      <div className="executive-map-nav" aria-label="Obszary mapy">
        {zones.map((zone, index) => (
          <button key={zone.key} className={active === index ? 'active' : ''}
            onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(-1)} onClick={() => onSelectZone?.(index)}>
            <span>{zone.no}</span><b>{zone.title}</b>
          </button>
        ))}
      </div>

      <div className="executive-map-scale"><span>01</span><i /><span>05</span></div>
    </div>
  )
}
