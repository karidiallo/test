import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const INK = '#171412'
const GRAPHITE = '#2a2421'
const GRAPHITE_LIGHT = '#4b4039'
const STONE = '#d8cbbf'
const STONE_LIGHT = '#ede5dc'
const IVORY = '#f8f3eb'
const CHAMPAGNE = '#c79b78'
const CORAL = '#df765f'
const WINE = '#a52e55'
const WORLD_X = 1.1

const zones = [
  {
    key: 'visibility',
    title: 'WIDOCZNOŚĆ',
    short: 'Czy klienci mogą Cię znaleźć?',
    question: 'Czy Twoja firma pojawia się wtedy, kiedy klient naprawdę szuka?',
    detail: 'Google · SEO · Mapy Google · Reklamy · Wyszukiwanie AI',
    pos: [-3.8, -0.9],
    kind: 'tower',
  },
  {
    key: 'website',
    title: 'STRONA I OFERTA',
    short: 'Czy oferta jest od razu jasna?',
    question: 'Czy klient od razu rozumie wartość, przewagę i następny krok?',
    detail: 'Komunikat · UX · Wezwanie Do Działania · Oferta · Strona Docelowa',
    pos: [-1.72, 0.88],
    kind: 'pavilion',
  },
  {
    key: 'social',
    title: 'MEDIA SPOŁECZNOŚCIOWE I TREŚCI',
    short: 'Czy Treści Prowadzą Dalej?',
    question: 'Czy treści budują uwagę, relację i prowadzą klienta do kolejnego kroku?',
    detail: 'Treści · Media Społecznościowe · Spójność · Zaangażowanie',
    pos: [0.36, -0.76],
    kind: 'studio',
  },
  {
    key: 'trust',
    title: 'ZAUFANIE',
    short: 'Czy masz dowód, żeby Ci zaufać?',
    question: 'Czy klient ma wystarczający powód, żeby wybrać właśnie Ciebie?',
    detail: 'Opinie · Studia Przypadków · Reputacja · Dowody Zaufania',
    pos: [2.22, 0.98],
    kind: 'boardroom',
  },
  {
    key: 'conversion',
    title: 'KONWERSJA',
    short: 'Gdzie znika decyzja klienta?',
    question: 'Gdzie zainteresowanie przestaje zamieniać się w kontakt i sprzedaż?',
    detail: 'Formularz · Zapytanie · Konsultacja · Oferta · Sprzedaż',
    pos: [4.12, -0.5],
    kind: 'hq',
  },
]

const roadPoints = [
  [-5.3, -1.72], [-4.62, -1.22], [-3.8, -0.9], [-2.78, -0.06], [-1.72, 0.88],
  [-0.7, 0.18], [0.36, -0.76], [1.28, 0.06], [2.22, 0.98], [3.18, 0.18], [4.12, -0.5], [5.25, 0.08],
]

function premiumMaterial(color, { metalness = 0.25, roughness = 0.38, emissive, emissiveIntensity = 0 } = {}) {
  return { color, metalness, roughness, emissive, emissiveIntensity }
}

function MapSlab() {
  const contour = useMemo(() => {
    const lines = []
    for (let i = 0; i < 7; i += 1) {
      const inset = i * 0.31
      lines.push([
        new THREE.Vector3(-5.75 + inset, 0.19 + i * 0.001, -3.2 + inset * 0.32),
        new THREE.Vector3(5.75 - inset, 0.19 + i * 0.001, -3.2 + inset * 0.32),
        new THREE.Vector3(5.75 - inset, 0.19 + i * 0.001, 3.2 - inset * 0.32),
        new THREE.Vector3(-5.75 + inset, 0.19 + i * 0.001, 3.2 - inset * 0.32),
        new THREE.Vector3(-5.75 + inset, 0.19 + i * 0.001, -3.2 + inset * 0.32),
      ])
    }
    return lines
  }, [])

  return (
    <group position={[0, -0.96, 0]}>
      <RoundedBox args={[12.5, 0.36, 7.35]} radius={0.12} smoothness={4} receiveShadow>
        <meshStandardMaterial color="#cdbdae" metalness={0.1} roughness={0.72} />
      </RoundedBox>
      <RoundedBox args={[12.05, 0.11, 6.92]} radius={0.08} smoothness={4} position={[0, 0.235, 0]} receiveShadow>
        <meshStandardMaterial color="#efe8df" metalness={0.04} roughness={0.85} />
      </RoundedBox>
      {contour.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={i === 0 ? '#a77958' : '#c9b3a0'}
          lineWidth={i === 0 ? 1.2 : 0.55}
          transparent
          opacity={0.58 - i * 0.05}
        />
      ))}
    </group>
  )
}

function ZonePodium({ active, hovered }) {
  const glow = active || hovered
  return (
    <group>
      <RoundedBox args={[1.88, 0.18, 1.48]} radius={0.12} smoothness={4} position={[0, 0.03, 0]} receiveShadow>
        <meshStandardMaterial color={glow ? '#dfd0c2' : '#d3c4b6'} metalness={0.12} roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[1.52, 0.08, 1.16]} radius={0.08} smoothness={4} position={[0, 0.16, 0]}>
        <meshStandardMaterial color={glow ? '#f4ece4' : '#e6ddd4'} metalness={0.08} roughness={0.62} />
      </RoundedBox>
      <mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.67, 0.695, 72]} />
        <meshBasicMaterial color={glow ? CORAL : CHAMPAGNE} transparent opacity={glow ? 0.72 : 0.22} />
      </mesh>
    </group>
  )
}

function GlassPanel({ position, rotation = [0, 0, 0], size = [0.62, 0.36], active = false }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshPhysicalMaterial
        color={active ? '#f2c1a4' : '#d9c8bb'}
        transparent
        opacity={0.56}
        roughness={0.12}
        metalness={0.05}
        transmission={0.22}
        emissive={active ? CORAL : '#000000'}
        emissiveIntensity={active ? 0.18 : 0}
      />
    </mesh>
  )
}

function VisibilityTower({ active }) {
  return (
    <group position={[0, 0.18, 0]}>
      <RoundedBox args={[0.72, 1.16, 0.66]} radius={0.07} smoothness={4} position={[0, 0.64, 0]} castShadow>
        <meshStandardMaterial {...premiumMaterial('#28221f', { metalness: 0.5, roughness: 0.26 })} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.72, 0.18]} radius={0.04} smoothness={4} position={[0.48, 0.45, 0.08]} castShadow>
        <meshStandardMaterial {...premiumMaterial('#4f4139', { metalness: 0.34, roughness: 0.32 })} />
      </RoundedBox>
      {[0.31, 0.51, 0.71, 0.91].map((y) => (
        <GlassPanel key={y} position={[0.363, y, 0.01]} rotation={[0, Math.PI / 2, 0]} size={[0.012, 0.12]} active={active} />
      ))}
      <mesh position={[0, 1.49, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.038, 0.56, 16]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.84} roughness={0.2} />
      </mesh>
      {[0.22, 0.39].map((r) => (
        <mesh key={r} position={[0, 1.73, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.012, 12, 64]} />
          <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={active ? 0.9 : 0.42} />
        </mesh>
      ))}
    </group>
  )
}

function WebsitePavilion({ active }) {
  return (
    <group position={[0, 0.18, 0]}>
      <RoundedBox args={[1.36, 0.54, 0.9]} radius={0.08} smoothness={4} position={[0, 0.34, 0]} castShadow>
        <meshStandardMaterial {...premiumMaterial('#332b27', { metalness: 0.34, roughness: 0.28 })} />
      </RoundedBox>
      <RoundedBox args={[1.12, 0.04, 0.66]} radius={0.04} smoothness={4} position={[0, 0.64, -0.08]}>
        <meshStandardMaterial color="#4f4139" metalness={0.32} roughness={0.32} />
      </RoundedBox>
      <GlassPanel position={[0, 0.37, 0.458]} size={[0.88, 0.28]} active={active} />
      <RoundedBox args={[0.86, 0.06, 0.34]} radius={0.03} smoothness={3} position={[0, 0.09, 0.62]}>
        <meshStandardMaterial color="#211d1a" roughness={0.66} />
      </RoundedBox>
      <mesh position={[-0.42, 0.36, 0.468]}>
        <boxGeometry args={[0.06, 0.19, 0.015]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} />
      </mesh>
    </group>
  )
}

function SocialStudio({ active }) {
  const bars = [0.36, 0.54, 0.43, 0.72, 0.58]
  return (
    <group position={[0, 0.18, 0]}>
      <mesh position={[0, 0.17, 0]} castShadow>
        <cylinderGeometry args={[0.82, 0.9, 0.22, 64]} />
        <meshStandardMaterial color="#302925" metalness={0.28} roughness={0.46} />
      </mesh>
      <RoundedBox args={[1.28, 0.38, 0.62]} radius={0.06} smoothness={4} position={[0, 0.42, -0.16]} castShadow>
        <meshStandardMaterial color="#40352f" metalness={0.25} roughness={0.32} />
      </RoundedBox>
      {bars.map((h, i) => (
        <mesh key={i} position={[-0.4 + i * 0.2, 0.38 + h * 0.25, 0.17]}>
          <boxGeometry args={[0.09, h * 0.5, 0.075]} />
          <meshStandardMaterial
            color={i === 3 ? WINE : '#76665d'}
            emissive={i === 3 ? WINE : CHAMPAGNE}
            emissiveIntensity={active ? 0.72 : 0.13}
            metalness={0.42}
            roughness={0.34}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.88, -0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.015, 12, 64]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={active ? 0.88 : 0.36} />
      </mesh>
    </group>
  )
}

function TrustBoardroom({ active }) {
  return (
    <group position={[0, 0.18, 0]}>
      <RoundedBox args={[1.4, 0.54, 0.96]} radius={0.08} smoothness={4} position={[0, 0.34, 0]} castShadow>
        <meshStandardMaterial color="#2d2623" metalness={0.36} roughness={0.27} />
      </RoundedBox>
      <GlassPanel position={[0, 0.42, 0.492]} size={[0.92, 0.22]} active={active} />
      {[-0.46, -0.15, 0.15, 0.46].map((x, i) => (
        <mesh key={i} position={[x, 0.58, -0.18]} castShadow>
          <boxGeometry args={[0.055, 0.7, 0.07]} />
          <meshStandardMaterial color={i === 1 || i === 2 ? CHAMPAGNE : '#6d5b50'} metalness={0.64} roughness={0.28} />
        </mesh>
      ))}
      <RoundedBox args={[0.8, 0.08, 0.38]} radius={0.04} smoothness={4} position={[0, 0.15, 0.1]}>
        <meshStandardMaterial color="#3d312a" metalness={0.16} roughness={0.46} />
      </RoundedBox>
    </group>
  )
}

function ConversionHQ({ active }) {
  return (
    <group position={[0, 0.18, 0]}>
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[1.18 - i * 0.16, 0.34, 0.9 - i * 0.07]}
          radius={0.06}
          smoothness={4}
          position={[0.18 - i * 0.18, 0.2 + i * 0.25, -0.08 + i * 0.04]}
          castShadow
        >
          <meshStandardMaterial color={i === 2 ? '#503b36' : '#2d2724'} metalness={0.42} roughness={0.28} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.52, 0.06, 0.45]} radius={0.04} smoothness={4} position={[0.12, 0.9, 0]}>
        <meshStandardMaterial color={CHAMPAGNE} emissive={active ? CORAL : CHAMPAGNE} emissiveIntensity={active ? 1.15 : 0.3} metalness={0.4} roughness={0.28} />
      </RoundedBox>
      <GlassPanel position={[0.64, 0.46, 0.27]} rotation={[0, Math.PI / 2, 0]} size={[0.015, 0.38]} active={active} />
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

function Beacon({ active }) {
  const beam = useRef()
  const halo = useRef()
  useFrame(({ clock }) => {
    if (halo.current) {
      halo.current.rotation.z = clock.getElapsedTime() * 0.2
      halo.current.material.opacity = THREE.MathUtils.lerp(halo.current.material.opacity, active ? 0.68 : 0.12, 0.08)
    }
    if (beam.current) {
      beam.current.scale.y = THREE.MathUtils.lerp(beam.current.scale.y, active ? 1 : 0.55, 0.08)
    }
  })
  return (
    <group position={[0, 0.26, 0]}>
      <mesh ref={beam} position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.008, 0.018, 1.42, 10]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={active ? 0.62 : 0.18} />
      </mesh>
      <mesh ref={halo} position={[0, 1.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.012, 10, 64]} />
        <meshBasicMaterial color={active ? CORAL : CHAMPAGNE} transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function Zone({ zone, index, activeIndex, hoveredIndex, setHoveredIndex, onSelectZone }) {
  const group = useRef()
  const active = activeIndex === index
  const hovered = hoveredIndex === index
  const highlighted = active || hovered
  const [x, z] = zone.pos

  useFrame(() => {
    if (!group.current) return
    const scale = highlighted ? 1.055 : 1
    group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, scale, 0.1)
    group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, scale, 0.1)
    group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, scale, 0.1)
    const targetY = highlighted ? -0.675 : -0.72
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1)
  })

  return (
    <group
      ref={group}
      position={[x, -0.72, z]}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHoveredIndex(index)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setHoveredIndex(-1)
        document.body.style.cursor = ''
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelectZone?.(index)
      }}
    >
      <ZonePodium active={active} hovered={hovered} />
      <ZoneArchitecture kind={zone.kind} active={highlighted} />
      <Beacon active={highlighted} />
      {highlighted && <pointLight position={[0, 1.0, 0.25]} color={active ? CORAL : CHAMPAGNE} intensity={active ? 3.2 : 2.0} distance={2.8} />}
      {highlighted && (
        <Html position={[0, 1.92, 0]} center distanceFactor={8.8} style={{ pointerEvents: 'none' }}>
          <div className={`map-zone-label ${active ? 'is-active' : ''}`}>
            <span>{zone.title}</span>
            <strong>{zone.short}</strong>
          </div>
        </Html>
      )}
    </group>
  )
}

function RoadSystem({ progressRef }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    roadPoints.map(([x, z]) => new THREE.Vector3(x, -0.68, z)), false, 'catmullrom', 0.36
  ), [])
  const points = useMemo(() => curve.getPoints(280), [curve])
  const pulses = useRef([])
  const scanner = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulses.current.forEach((m, i) => {
      if (!m) return
      m.position.copy(curve.getPointAt((t * 0.035 + i / 9) % 1))
    })
    if (scanner.current) {
      const p = THREE.MathUtils.clamp((progressRef.current - 0.14) / 0.86, 0, 1)
      scanner.current.position.copy(curve.getPointAt(p))
    }
  })

  return (
    <group>
      <Line points={points} color="#201b18" lineWidth={9.5} transparent opacity={0.30} />
      <Line points={points} color="#ba9478" lineWidth={4.2} transparent opacity={0.94} />
      <Line points={points} color={WINE} lineWidth={1.15} transparent opacity={0.88} />
      {zones.map((zone) => (
        <group key={zone.key} position={[zone.pos[0], -0.67, zone.pos[1]]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.19, 40]} />
            <meshBasicMaterial color="#2c2724" transparent opacity={0.72} />
          </mesh>
          <mesh position={[0, 0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.075, 0.09, 32]} />
            <meshBasicMaterial color={IVORY} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} ref={(el) => { pulses.current[i] = el }}>
          <sphereGeometry args={[i % 4 === 0 ? 0.052 : 0.032, 14, 14]} />
          <meshBasicMaterial color={i % 4 === 0 ? IVORY : CORAL} />
        </mesh>
      ))}
      <group ref={scanner}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.23, 0.018, 10, 56]} />
          <meshBasicMaterial color={CORAL} transparent opacity={0.95} />
        </mesh>
        <pointLight color={CORAL} intensity={3.4} distance={1.5} />
      </group>
    </group>
  )
}

function Planter({ x, z, scale = 1 }) {
  return (
    <group position={[x, -0.67, z]} scale={scale}>
      <RoundedBox args={[0.34, 0.12, 0.34]} radius={0.04} smoothness={3} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#9d8877" roughness={0.76} />
      </RoundedBox>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.3, 10]} />
        <meshStandardMaterial color="#5d4d42" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.16, 14, 12]} />
        <meshStandardMaterial color="#6e7663" roughness={0.86} />
      </mesh>
    </group>
  )
}

function ContextCampus() {
  const blocks = [
    [-4.9, 1.65, .64, .40, .19], [-4.15, 1.84, .42, .34, .25], [-2.9, -2.02, .72, .44, .18],
    [-2.05, -1.88, .42, .32, .27], [-0.72, 1.9, .66, .42, .20], [0.1, 1.78, .38, .34, .30],
    [1.03, -2.0, .58, .40, .19], [1.73, -1.78, .36, .3, .28], [3.22, 1.98, .58, .38, .22],
    [4.25, 1.68, .4, .3, .32], [4.82, -1.72, .64, .4, .19], [3.68, -2.08, .36, .32, .25],
  ]
  return (
    <group>
      {blocks.map(([x, z, w, d, h], i) => (
        <RoundedBox key={i} args={[w, h, d]} radius={0.045} smoothness={3} position={[x, -0.69 + h / 2, z]} castShadow>
          <meshStandardMaterial color={i % 3 === 0 ? '#b7a799' : '#d7ccc1'} metalness={0.06} roughness={0.82} />
        </RoundedBox>
      ))}
      <Planter x={-5.05} z={0.55} />
      <Planter x={-2.7} z={1.55} scale={0.9} />
      <Planter x={0.95} z={1.62} scale={0.95} />
      <Planter x={2.95} z={-1.48} />
      <Planter x={4.92} z={0.75} scale={0.88} />
    </group>
  )
}

function CameraRig({ progressRef }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(WORLD_X, -0.42, 0), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const desiredTarget = useMemo(() => new THREE.Vector3(), [])

  const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(8.6, 5.55, 9.0),
    ...zones.map((z, i) => new THREE.Vector3(WORLD_X + z.pos[0] + (i % 2 ? 2.15 : 2.45), 2.72 + i * 0.035, z.pos[1] + 3.35)),
  ], false, 'catmullrom', 0.3), [])

  const targetPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(WORLD_X + 0.45, -0.48, 0),
    ...zones.map((z) => new THREE.Vector3(WORLD_X + z.pos[0], -0.32, z.pos[1])),
  ], false, 'catmullrom', 0.3), [])

  useFrame(() => {
    const raw = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1)
    const p = raw < 0.14 ? 0 : THREE.MathUtils.smoothstep((raw - 0.14) / 0.86, 0, 1)
    desired.copy(cameraPath.getPointAt(p))
    desiredTarget.copy(targetPath.getPointAt(p))
    desired.x += pointer.x * 0.14
    desired.y += pointer.y * 0.05
    camera.position.lerp(desired, 0.055)
    target.lerp(desiredTarget, 0.07)
    camera.lookAt(target)
  })
  return null
}

function Scene({ progressRef, activeIndex, hoveredIndex, setHoveredIndex, onSelectZone }) {
  return (
    <>
      <fog attach="fog" args={['#efe9e1', 17, 34]} />
      <ambientLight intensity={1.85} />
      <hemisphereLight args={['#fffaf2', '#9d8a79', 1.65]} />
      <directionalLight position={[6, 9, 6]} intensity={4.1} color="#fff5e6" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-4, 4, -5]} intensity={1.35} color="#d6dce2" />
      <pointLight position={[WORLD_X - 2.2, 2.6, 2.5]} intensity={3.6} color={CHAMPAGNE} distance={7} />
      <pointLight position={[WORLD_X + 3.4, 2.2, -0.7]} intensity={2.8} color={CORAL} distance={5.5} />

      <group position={[WORLD_X, 0, 0]}>
        <MapSlab />
        <ContextCampus />
        <RoadSystem progressRef={progressRef} />
        {zones.map((zone, i) => (
          <Zone
            key={zone.key}
            zone={zone}
            index={i}
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            onSelectZone={onSelectZone}
          />
        ))}
      </group>
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
      const breaks = [0.14, 0.31, 0.48, 0.65, 0.82]
      let next = -1
      for (let i = breaks.length - 1; i >= 0; i -= 1) {
        if (p >= breaks[i]) { next = i; break }
      }
      setActive((prev) => (prev === next ? prev : next))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progressRef])

  const inspectedIndex = hovered >= 0 ? hovered : active
  const inspected = inspectedIndex >= 0 ? zones[inspectedIndex] : null

  return (
    <div className="living-map living-map--executive">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [8.6, 5.55, 9.0], fov: 37, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        shadows
      >
        <Scene
          progressRef={progressRef}
          activeIndex={active}
          hoveredIndex={hovered}
          setHoveredIndex={setHovered}
          onSelectZone={onSelectZone}
        />
      </Canvas>

      {inspected && (
        <aside className="map-inspector is-active">
          <div className="map-inspector__top"><small>OBSZAR DIAGNOZY</small></div>
          <strong>{inspected.title}</strong>
          <p>{inspected.question}</p>
          <div>{inspected.detail}</div>
        </aside>
      )}

      <div className="executive-map-nav" aria-label="Obszary mapy">
        {zones.map((zone, index) => (
          <button
            key={zone.key}
            className={active === index ? 'active' : ''}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(-1)}
            onClick={() => onSelectZone?.(index)}
          >
            <b>{zone.title}</b>
          </button>
        ))}
      </div>
    </div>
  )
}
