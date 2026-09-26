import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const ACCENT = '#d96f62'
const WINE = '#a62f55'
const INK = '#171513'
const GLASS = '#d7dde0'

const stations = [
  { key: 'acquisition', no: '01', title: 'POZYSKANIE', sub: 'Przyciągasz uwagę', pos: [-5.8, 0, 0.75], rot: -0.08, screen: 'MARKETING / DISCOVERY' },
  { key: 'visibility', no: '02', title: 'WIDOCZNOŚĆ', sub: 'Jesteś widoczny', pos: [-2.9, 0.35, -0.35], rot: 0.06, screen: 'SEO / CONTENT / ANALYTICS' },
  { key: 'trust', no: '03', title: 'ZAUFANIE', sub: 'Budujesz zaufanie', pos: [0.05, 0.72, 0.7], rot: -0.04, screen: 'PROOF / OPINIE / EXPERTISE' },
  { key: 'conversion', no: '04', title: 'KONWERSJA', sub: 'Podejmują decyzję', pos: [3.0, 0.35, -0.48], rot: 0.05, screen: 'OFERTA / CTA / KONTAKT' },
  { key: 'revenue', no: '05', title: 'PRZYCHÓD', sub: 'Generujesz wzrost', pos: [5.95, 0.92, 0.62], rot: -0.05, screen: 'WYNIK / RETENCJA / LTV' },
]

function Box({ position, scale, color = '#d6cec4', roughness = 0.72, metalness = 0.03, transparent = false, opacity = 1 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} transparent={transparent} opacity={opacity} />
    </mesh>
  )
}

function Desk({ x, z, rotation = 0 }) {
  return (
    <group position={[x, 0.34, z]} rotation={[0, rotation, 0]}>
      <Box position={[0, 0, 0]} scale={[0.74, 0.055, 0.33]} color="#8f8175" roughness={0.65} />
      <Box position={[-0.28, -0.18, 0]} scale={[0.045, 0.34, 0.26]} color="#4c4743" />
      <Box position={[0.28, -0.18, 0]} scale={[0.045, 0.34, 0.26]} color="#4c4743" />
      <Box position={[0, 0.20, -0.055]} scale={[0.38, 0.24, 0.025]} color="#22201e" roughness={0.35} />
      <Box position={[0, 0.20, -0.068]} scale={[0.31, 0.16, 0.012]} color="#c95870" roughness={0.35} />
    </group>
  )
}

function Plant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.10, 0.14, 0.24, 18]} />
        <meshStandardMaterial color="#7d6c5d" roughness={0.82} />
      </mesh>
      {[[-0.05, 0.33, 0], [0.05, 0.43, 0.02], [0, 0.52, -0.03]].map((p, i) => (
        <mesh key={i} position={p} rotation={[0, i * 1.2, 0.45]}>
          <sphereGeometry args={[0.09, 12, 8]} />
          <meshStandardMaterial color={i === 1 ? '#43584b' : '#526958'} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function People({ seed = 0 }) {
  const points = useMemo(() => [
    [-0.9, -0.35], [-0.4, 0.25], [0.25, -0.28], [0.75, 0.15], [0.08, 0.44],
  ].map(([x, z], i) => [x + Math.sin(seed + i) * 0.08, z + Math.cos(seed * 2 + i) * 0.07]), [seed])

  return points.map(([x, z], i) => (
    <group key={i} position={[x, 0.17, z]}>
      <mesh position={[0, 0.23, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.20, 4, 8]} />
        <meshStandardMaterial color={i % 2 ? '#2f3134' : '#5a514a'} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#c89e84" roughness={0.8} />
      </mesh>
    </group>
  ))
}

function OfficeWorld({ station, index }) {
  const [x, y, z] = station.pos
  const width = index === 2 ? 2.55 : 2.35
  const depth = index === 4 ? 1.85 : 1.7
  const wallH = index === 4 ? 1.55 : 1.35

  return (
    <group position={[x, y, z]} rotation={[0, station.rot, 0]}>
      <Box position={[0, -0.11, 0]} scale={[width, 0.20, depth]} color="#c4bbb0" roughness={0.88} />
      <Box position={[0, -0.01, 0]} scale={[width - 0.12, 0.06, depth - 0.12]} color="#e9e3db" roughness={0.62} />

      <Box position={[0, wallH / 2 - 0.02, -depth / 2 + 0.045]} scale={[width, wallH, 0.06]} color="#b9b0a6" roughness={0.75} />
      <Box position={[-width / 2 + 0.04, wallH / 2 - 0.02, 0]} scale={[0.055, wallH, depth]} color={GLASS} transparent opacity={0.28} roughness={0.15} />
      <Box position={[width / 2 - 0.04, wallH / 2 - 0.02, 0]} scale={[0.055, wallH, depth]} color={GLASS} transparent opacity={0.18} roughness={0.15} />

      <Box position={[0, 0.93, -depth / 2 + 0.09]} scale={[1.42, 0.50, 0.045]} color="#242221" roughness={0.30} />
      <Box position={[0, 0.93, -depth / 2 + 0.06]} scale={[1.25, 0.34, 0.018]} color={index === 3 ? '#b73758' : index === 4 ? '#d97a5f' : '#93415c'} roughness={0.25} />

      {index === 0 ? (
        <>
          <Box position={[-0.58, 0.18, 0.14]} scale={[0.65, 0.28, 0.44]} color="#7e7065" />
          <Box position={[0.25, 0.18, 0.20]} scale={[0.65, 0.28, 0.44]} color="#7e7065" />
          <Plant position={[0.88, 0, -0.40]} />
        </>
      ) : index === 2 ? (
        <>
          <Box position={[0, 0.30, 0.10]} scale={[1.25, 0.08, 0.60]} color="#8b7d72" />
          <People seed={index + 10} />
          <Plant position={[-0.98, 0, -0.46]} />
          <Plant position={[0.99, 0, 0.46]} />
        </>
      ) : index === 4 ? (
        <>
          <Box position={[0, 0.26, 0.08]} scale={[1.35, 0.07, 0.66]} color="#75675f" />
          <People seed={index + 20} />
          <Plant position={[-0.92, 0, 0.52]} />
        </>
      ) : (
        <>
          <Desk x={-0.55} z={0.22} rotation={0.05} />
          <Desk x={0.46} z={0.15} rotation={-0.05} />
          <Plant position={[0.88, 0, -0.48]} />
          <People seed={index} />
        </>
      )}

      <Html position={[0, 1.62, 0.03]} center distanceFactor={6.8} style={{ pointerEvents: 'none' }}>
        <div className="office-station-label">
          <span>{station.no}</span>
          <div><b>{station.title}</b><small>{station.sub}</small></div>
        </div>
      </Html>

      <Html position={[0, 1.05, -depth / 2 + 0.01]} center distanceFactor={8.6} style={{ pointerEvents: 'none' }}>
        <div className="office-screen-copy">{station.screen}</div>
      </Html>
    </group>
  )
}

function Bridges() {
  const links = stations.slice(0, -1).map((s, i) => {
    const a = new THREE.Vector3(...s.pos)
    const b = new THREE.Vector3(...stations[i + 1].pos)
    const mid = a.clone().lerp(b, 0.5)
    const length = a.distanceTo(b)
    const angle = Math.atan2(b.z - a.z, b.x - a.x)
    return { mid, length, angle, y: Math.max(a.y, b.y) + 0.05 }
  })

  return links.map((l, i) => (
    <group key={i} position={[l.mid.x, l.y, l.mid.z]} rotation={[0, -l.angle, 0]}>
      <Box position={[0, -0.02, 0]} scale={[l.length - 1.0, 0.07, 0.34]} color="#c8beb4" roughness={0.65} />
      <Box position={[0, 0.18, -0.15]} scale={[l.length - 1.0, 0.34, 0.025]} color={GLASS} transparent opacity={0.23} roughness={0.15} />
      <Box position={[0, 0.18, 0.15]} scale={[l.length - 1.0, 0.34, 0.025]} color={GLASS} transparent opacity={0.23} roughness={0.15} />
    </group>
  ))
}

function Route() {
  const pulseRefs = useRef([])
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-6.65, 0.15, 1.15),
    ...stations.map((s) => new THREE.Vector3(s.pos[0], s.pos[1] + 0.10, s.pos[2] + 0.08)),
    new THREE.Vector3(6.7, 1.08, 0.20),
  ], false, 'catmullrom', 0.35), [])
  const linePoints = useMemo(() => curve.getPoints(220), [curve])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const p = (t * 0.035 + i / 9) % 1
      mesh.position.copy(curve.getPointAt(p))
      const s = 0.72 + Math.sin(t * 3 + i) * 0.12
      mesh.scale.setScalar(s)
    })
  })

  return (
    <group>
      <Line points={linePoints} color="#7d2544" lineWidth={4.2} transparent opacity={0.40} />
      <Line points={linePoints} color="#ffb28f" lineWidth={1.55} transparent opacity={0.95} />
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} ref={(el) => { pulseRefs.current[i] = el }}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#ffffff' : ACCENT} />
        </mesh>
      ))}
    </group>
  )
}

function Ground() {
  return (
    <group position={[0, -0.25, 0]}>
      <Box position={[0, -0.28, 0]} scale={[15.4, 0.48, 5.2]} color="#a99f95" roughness={0.95} />
      <Box position={[0, -0.02, 0]} scale={[15.0, 0.06, 4.8]} color="#ded7cf" roughness={0.82} />
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 4.6, 1, 1]} />
        <meshStandardMaterial color="#e7e0d8" roughness={0.92} />
      </mesh>
    </group>
  )
}

function CameraRig({ progressRef }) {
  const { camera, pointer } = useThree()
  const pos = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const nextPos = useMemo(() => new THREE.Vector3(), [])
  const nextTarget = useMemo(() => new THREE.Vector3(), [])

  const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(8.8, 6.4, 9.8),
    new THREE.Vector3(-5.3, 2.1, 4.15),
    new THREE.Vector3(-2.45, 2.05, 3.55),
    new THREE.Vector3(0.35, 2.35, 3.55),
    new THREE.Vector3(3.15, 2.05, 3.45),
    new THREE.Vector3(6.15, 2.45, 3.6),
  ], false, 'catmullrom', 0.25), [])

  const targetPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.45, 0),
    ...stations.map((s) => new THREE.Vector3(s.pos[0], s.pos[1] + 0.43, s.pos[2])),
  ], false, 'catmullrom', 0.25), [])

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1)
    const eased = THREE.MathUtils.smoothstep(p, 0, 1)
    nextPos.copy(cameraPath.getPointAt(eased))
    nextTarget.copy(targetPath.getPointAt(eased))
    nextPos.x += pointer.x * 0.12
    nextPos.y += pointer.y * 0.06
    pos.copy(camera.position).lerp(nextPos, 0.055)
    target.lerp(nextTarget, 0.075)
    camera.position.copy(pos)
    camera.lookAt(target)
  })
  return null
}

function Scene({ progressRef }) {
  return (
    <>
      <color attach="background" args={['#ece7df']} />
      <fog attach="fog" args={['#ece7df', 11, 23]} />
      <ambientLight intensity={1.25} />
      <hemisphereLight args={['#fff7ec', '#665d55', 2.2]} />
      <directionalLight position={[3, 9, 6]} intensity={3.3} color="#fff4e8" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-7, 4, -5]} intensity={1.1} color="#b7cae1" />
      <pointLight position={[0, 3.5, 1]} intensity={15} color="#e57f63" distance={10} />
      <Ground />
      <Bridges />
      {stations.map((station, i) => <OfficeWorld key={station.key} station={station} index={i} />)}
      <Route />
      <ContactShadows position={[0, -0.25, 0]} opacity={0.26} scale={18} blur={3.6} far={5.5} />
      <CameraRig progressRef={progressRef} />
    </>
  )
}

export function LivingMap({ progressRef }) {
  return (
    <div className="living-map living-map--office">
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [8.8, 6.4, 9.8], fov: 40, near: 0.1, far: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <Scene progressRef={progressRef} />
      </Canvas>
      <div className="journey-hud">
        <span>3D GROWTH JOURNEY</span>
        <div>{stations.map((s) => <i key={s.key} title={s.title} />)}</div>
      </div>
      <div className="map-ui-status"><i /> INTERACTIVE BUSINESS JOURNEY / V8</div>
    </div>
  )
}
