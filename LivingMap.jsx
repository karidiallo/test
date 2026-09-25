import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const accent = new THREE.Color('#c84468')
const warm = new THREE.Color('#d98a6c')

function heightAt(x, z) {
  const moundA = Math.exp(-((x + 1.6) ** 2 + (z + 0.1) ** 2) / 2.9) * 0.66
  const moundB = Math.exp(-((x - 1.55) ** 2 + (z - 0.25) ** 2) / 2.2) * 0.82
  const ridge = Math.exp(-((z + Math.sin(x * 0.65) * 0.38) ** 2) / 0.72) * 0.28
  const cut = Math.exp(-((x - 0.62) ** 2 + (z + 0.02) ** 2) / 0.16) * 0.32
  return 0.1 + moundA + moundB + ridge - cut
}

function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8.8, 5.8, 88, 58)
    const pos = geo.attributes.position
    const colors = []
    const low = new THREE.Color('#bdb4aa')
    const high = new THREE.Color('#fbf8f2')

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const planeY = pos.getY(i)
      const z = -planeY
      const h = heightAt(x, z)
      pos.setZ(i, h)
      const t = THREE.MathUtils.clamp((h - 0.08) / 0.94, 0, 1)
      const c = low.clone().lerp(high, t)
      colors.push(c.r, c.g, c.b)
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    return geo
  }, [])

  const wire = useMemo(() => geometry.clone(), [geometry])

  return (
    <group position={[0, -0.74, 0]}>
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial vertexColors roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh geometry={wire} position={[0, 0.012, 0]}>
        <meshBasicMaterial color="#615850" wireframe transparent opacity={0.055} depthWrite={false} />
      </mesh>
    </group>
  )
}

function CustomerRoute({ selectedFocusRef }) {
  const pulseRefs = useRef([])
  const bottleneckRef = useRef()

  const curve = useMemo(() => {
    const raw = [
      [-3.55, -0.7],
      [-2.45, 0.35],
      [-1.15, -0.2],
      [0.0, 0.2],
      [1.0, -0.08],
      [2.0, 0.45],
      [3.2, 0.02],
    ]
    const points = raw.map(([x, z]) => new THREE.Vector3(x, heightAt(x, z) - 0.61, z))
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45)
  }, [])

  const linePoints = useMemo(() => curve.getPoints(100), [curve])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const p = curve.getPointAt((t * 0.075 + i / 7) % 1)
      mesh.position.copy(p)
      const focus = selectedFocusRef.current ?? 0.62
      const dist = Math.abs(((t * 0.075 + i / 7) % 1) - focus)
      mesh.scale.setScalar(dist < 0.055 ? 0.35 : 1)
      mesh.material.opacity = dist < 0.055 ? 0.2 : 0.95
    })

    if (bottleneckRef.current) {
      const focus = selectedFocusRef.current ?? 0.62
      const p = curve.getPointAt(focus)
      bottleneckRef.current.position.copy(p)
      bottleneckRef.current.rotation.y += 0.004
    }
  })

  return (
    <group>
      <Line points={linePoints} color="#8e294b" lineWidth={2.2} transparent opacity={0.76} />
      <Line points={linePoints} color="#e7a186" lineWidth={0.72} transparent opacity={0.9} />
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.058, 14, 14]} />
          <meshBasicMaterial color={i % 2 ? accent : warm} transparent opacity={0.95} />
        </mesh>
      ))}
      <group ref={bottleneckRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.028, 12, 42]} />
          <meshStandardMaterial color="#b82e58" emissive="#6f1537" emissiveIntensity={1.2} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <octahedronGeometry args={[0.065, 0]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

function Labels() {
  const labels = [
    ['POZYSKANIE', -3.25, -0.9],
    ['ZAUFANIE', -1.28, 0.82],
    ['KONWERSJA', 0.75, -0.92],
    ['PRZYCHÓD', 2.72, 0.62],
  ]
  return labels.map(([label, x, z]) => (
    <Html key={label} position={[x, heightAt(x, z) - 0.45, z]} center distanceFactor={7.2} style={{ pointerEvents: 'none' }}>
      <div className="map-label">{label}</div>
    </Html>
  ))
}

function CameraRig({ progressRef, selectedFocusRef }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const p = progressRef.current || 0
    const focus = selectedFocusRef.current ?? 0.62

    if (p < 0.25) {
      const q = p / 0.25
      desired.set(6.4 - q * 1.0, 4.7 - q * 0.35, 7.5 - q * 0.8)
      target.set(-0.15, 0.05, 0)
    } else if (p < 0.58) {
      const q = (p - 0.25) / 0.33
      desired.set(5.4 - q * 1.75, 4.35 - q * 1.3, 6.7 - q * 1.6)
      target.set(0.15 + q * 0.45, 0.08, 0)
    } else if (p < 0.82) {
      const q = (p - 0.58) / 0.24
      const x = THREE.MathUtils.lerp(-0.25, THREE.MathUtils.lerp(-2.0, 2.1, focus), q)
      desired.set(3.65 - q * 0.75, 3.05 - q * 0.6, 5.1 - q * 1.3)
      target.set(x, 0.02, 0)
    } else {
      const q = (p - 0.82) / 0.18
      desired.set(2.9 + q * 0.55, 2.45 + q * 1.45, 3.8 + q * 1.8)
      target.set(0.65, 0.02, 0)
    }

    desired.x += pointer.x * 0.18
    desired.y += pointer.y * 0.09
    camera.position.lerp(desired, 0.045)
    camera.lookAt(target)
  })

  return null
}

function Scene({ progressRef, selectedFocusRef }) {
  return (
    <>
      <ambientLight intensity={1.8} />
      <hemisphereLight args={['#fff6ea', '#5c4947', 2.6]} />
      <directionalLight position={[4, 8, 5]} intensity={3.4} color="#fff7ef" castShadow />
      <pointLight position={[-4, 2, -2]} intensity={18} color="#d8786e" distance={9} />
      <pointLight position={[3, 1.2, 2]} intensity={13} color="#ae3157" distance={7} />
      <Terrain />
      <CustomerRoute selectedFocusRef={selectedFocusRef} />
      <Labels />
      <ContactShadows position={[0, -0.84, 0]} opacity={0.25} scale={10} blur={2.8} far={4.2} />
      <CameraRig progressRef={progressRef} selectedFocusRef={selectedFocusRef} />
    </>
  )
}

export function LivingMap({ progressRef, selectedFocusRef }) {
  return (
    <div className="living-map" aria-hidden="true">
      <div className="living-map-fallback" />
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [6.4, 4.7, 7.5], fov: 40, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Scene progressRef={progressRef} selectedFocusRef={selectedFocusRef} />
      </Canvas>
      <div className="map-ui-corner map-ui-corner--tl" />
      <div className="map-ui-corner map-ui-corner--br" />
      <div className="map-ui-status"><i /> LIVE DECISION MAP / V1</div>
    </div>
  )
}
