import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const accent = new THREE.Color('#c84468')
const warm = new THREE.Color('#d98a6c')

function gaussian(x, z, cx, cz, sx, sz, amp) {
  return Math.exp(-(((x - cx) ** 2) / sx + ((z - cz) ** 2) / sz)) * amp
}

function heightAt(x, z) {
  const massif = gaussian(x, z, -1.8, 0.25, 4.2, 2.5, 0.58)
  const eastern = gaussian(x, z, 1.65, -0.18, 2.6, 1.9, 0.74)
  const shoulder = gaussian(x, z, 0.35, 1.0, 5.0, 0.72, 0.25)
  const ridge = Math.exp(-((z + Math.sin(x * 0.58) * 0.42) ** 2) / 0.5) * 0.24
  const valley = gaussian(x, z, 0.68, 0.02, 0.22, 0.28, 0.28)
  const erosion = Math.sin(x * 1.45 + Math.sin(z * 1.8)) * 0.035 + Math.sin(z * 2.8 - x * 0.55) * 0.023
  const micro = Math.sin((x + z) * 4.1) * 0.012 + Math.sin(x * 5.7 - z * 3.2) * 0.009
  const edgeFade = Math.max(0, 1 - Math.pow(Math.abs(x) / 4.9, 5) - Math.pow(Math.abs(z) / 3.3, 5))
  return 0.105 + (massif + eastern + shoulder + ridge - valley + erosion + micro) * Math.max(0.35, edgeFade)
}

function buildContours() {
  const vertices = []
  const xMin = -4.4
  const xMax = 4.4
  const zMin = -2.9
  const zMax = 2.9
  const nx = 78
  const nz = 52
  const levels = [0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 0.98]

  const interpolate = (a, b, va, vb, level) => {
    const denom = vb - va
    const t = Math.abs(denom) < 1e-6 ? 0.5 : (level - va) / denom
    return [THREE.MathUtils.lerp(a[0], b[0], t), THREE.MathUtils.lerp(a[1], b[1], t)]
  }

  levels.forEach((level) => {
    for (let iz = 0; iz < nz; iz++) {
      const z0 = THREE.MathUtils.lerp(zMin, zMax, iz / nz)
      const z1 = THREE.MathUtils.lerp(zMin, zMax, (iz + 1) / nz)
      for (let ix = 0; ix < nx; ix++) {
        const x0 = THREE.MathUtils.lerp(xMin, xMax, ix / nx)
        const x1 = THREE.MathUtils.lerp(xMin, xMax, (ix + 1) / nx)
        const corners = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]
        const values = corners.map(([x, z]) => heightAt(x, z))
        const hits = []
        const edges = [[0, 1], [1, 2], [2, 3], [3, 0]]

        edges.forEach(([a, b]) => {
          const va = values[a] - level
          const vb = values[b] - level
          if ((va < 0 && vb >= 0) || (vb < 0 && va >= 0)) hits.push(interpolate(corners[a], corners[b], values[a], values[b], level))
        })

        if (hits.length >= 2) {
          for (let i = 0; i + 1 < hits.length; i += 2) {
            const [a, b] = [hits[i], hits[i + 1]]
            vertices.push(a[0], level + 0.013, a[1], b[0], level + 0.013, b[1])
          }
        }
      }
    }
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  return geometry
}

function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8.8, 5.8, 118, 78)
    const pos = geo.attributes.position
    const colors = []
    const low = new THREE.Color('#b9afa3')
    const mid = new THREE.Color('#d9d1c8')
    const high = new THREE.Color('#f4f0e9')

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const planeY = pos.getY(i)
      const z = -planeY
      const h = heightAt(x, z)
      pos.setZ(i, h)
      const t = THREE.MathUtils.clamp((h - 0.08) / 0.9, 0, 1)
      const c = t < 0.56 ? low.clone().lerp(mid, t / 0.56) : mid.clone().lerp(high, (t - 0.56) / 0.44)
      colors.push(c.r, c.g, c.b)
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    return geo
  }, [])

  const contours = useMemo(() => buildContours(), [])

  return (
    <group position={[0, -0.74, 0]}>
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[9.25, 0.22, 6.25]} />
        <meshStandardMaterial color="#a99f94" roughness={0.94} metalness={0} />
      </mesh>
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshPhysicalMaterial vertexColors roughness={0.93} metalness={0} clearcoat={0.05} clearcoatRoughness={0.9} />
      </mesh>
      <lineSegments geometry={contours} position={[0, 0.008, 0]}>
        <lineBasicMaterial color="#665d55" transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

function CustomerRoute({ selectedFocusRef }) {
  const pulseRefs = useRef([])
  const bottleneckRef = useRef()

  const curve = useMemo(() => {
    const raw = [
      [-3.55, -0.7],
      [-2.52, 0.28],
      [-1.28, -0.16],
      [-0.08, 0.18],
      [0.94, -0.06],
      [2.0, 0.4],
      [3.25, 0.02],
    ]
    const points = raw.map(([x, z]) => new THREE.Vector3(x, heightAt(x, z) - 0.60, z))
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.48)
  }, [])

  const linePoints = useMemo(() => curve.getPoints(130), [curve])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const routeT = (t * 0.062 + i / 8) % 1
      const p = curve.getPointAt(routeT)
      mesh.position.copy(p)
      const focus = selectedFocusRef.current ?? 0.62
      const dist = Math.abs(routeT - focus)
      mesh.scale.setScalar(dist < 0.05 ? 0.42 : 1)
      mesh.material.opacity = dist < 0.05 ? 0.22 : 0.88
    })

    if (bottleneckRef.current) {
      const focus = selectedFocusRef.current ?? 0.62
      const p = curve.getPointAt(focus)
      bottleneckRef.current.position.copy(p)
      bottleneckRef.current.rotation.y = Math.sin(t * 0.5) * 0.16
    }
  })

  return (
    <group>
      <Line points={linePoints} color="#8e294b" lineWidth={2.0} transparent opacity={0.7} />
      <Line points={linePoints} color="#efb099" lineWidth={0.58} transparent opacity={0.92} />
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.047, 16, 16]} />
          <meshBasicMaterial color={i % 2 ? accent : warm} transparent opacity={0.9} />
        </mesh>
      ))}
      <group ref={bottleneckRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.018, 12, 54]} />
          <meshStandardMaterial color="#ad3155" emissive="#681632" emissiveIntensity={0.7} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <octahedronGeometry args={[0.052, 0]} />
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
    <Html key={label} position={[x, heightAt(x, z) - 0.45, z]} center distanceFactor={7.5} style={{ pointerEvents: 'none' }}>
      <div className="map-label">{label}</div>
    </Html>
  ))
}

function SurveyMarkers() {
  const points = [[-2.65, 1.45], [-0.6, -1.7], [1.6, 1.5], [3.1, -1.15]]
  return points.map(([x, z], index) => (
    <group key={`${x}-${z}`} position={[x, heightAt(x, z) - 0.63, z]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.24, 8]} />
        <meshBasicMaterial color="#625a53" transparent opacity={0.48} />
      </mesh>
      <mesh position={[0, 0.245, 0]}>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshBasicMaterial color={index === 2 ? '#c84468' : '#6f665e'} />
      </mesh>
    </group>
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
      desired.set(6.7 - q * 1.1, 4.55 - q * 0.28, 7.8 - q * 0.85)
      target.set(-0.1, -0.02, 0)
    } else if (p < 0.58) {
      const q = (p - 0.25) / 0.33
      desired.set(5.6 - q * 1.75, 4.27 - q * 1.18, 6.95 - q * 1.65)
      target.set(0.12 + q * 0.45, 0.02, 0)
    } else if (p < 0.82) {
      const q = (p - 0.58) / 0.24
      const x = THREE.MathUtils.lerp(-0.25, THREE.MathUtils.lerp(-2.0, 2.1, focus), q)
      desired.set(3.85 - q * 0.72, 3.09 - q * 0.58, 5.3 - q * 1.28)
      target.set(x, -0.02, 0)
    } else {
      const q = (p - 0.82) / 0.18
      desired.set(3.13 + q * 0.48, 2.51 + q * 1.3, 4.02 + q * 1.55)
      target.set(0.55, -0.02, 0)
    }

    desired.x += pointer.x * 0.14
    desired.y += pointer.y * 0.07
    camera.position.lerp(desired, 0.042)
    camera.lookAt(target)
  })

  return null
}

function Scene({ progressRef, selectedFocusRef }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#fff9f2', '#756a60', 2.0]} />
      <directionalLight position={[4.5, 8.5, 5.5]} intensity={3.0} color="#fff8f0" castShadow shadow-mapSize-width={1536} shadow-mapSize-height={1536} />
      <pointLight position={[-4, 2.1, -2]} intensity={9} color="#d8786e" distance={8} />
      <pointLight position={[3, 1.4, 2]} intensity={6} color="#ae3157" distance={6.5} />
      <Terrain />
      <CustomerRoute selectedFocusRef={selectedFocusRef} />
      <SurveyMarkers />
      <Labels />
      <ContactShadows position={[0, -0.92, 0]} opacity={0.22} scale={10.8} blur={3.5} far={4.4} />
      <CameraRig progressRef={progressRef} selectedFocusRef={selectedFocusRef} />
    </>
  )
}

export function LivingMap({ progressRef, selectedFocusRef }) {
  return (
    <div className="living-map" aria-hidden="true">
      <div className="living-map-fallback" />
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [6.7, 4.55, 7.8], fov: 39, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Scene progressRef={progressRef} selectedFocusRef={selectedFocusRef} />
      </Canvas>
      <div className="map-ui-corner map-ui-corner--tl" />
      <div className="map-ui-corner map-ui-corner--br" />
      <div className="map-ui-status"><i /> LIVE DECISION TERRAIN / V2</div>
    </div>
  )
}
