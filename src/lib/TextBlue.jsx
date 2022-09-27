import React, { Suspense, useRef } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three-stdlib'
import { ShaderPass } from 'three-stdlib'
import { RenderPass } from 'three-stdlib'
import { UnrealBloomPass } from 'three-stdlib'
import Text from './Text'
import lerp from 'lerp'

// Makes these prototypes available as "native" jsx-string elements
// extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, GlitchPass })
// extend(meshline)


export default function TextBlue({ mouse, hover, children, props }) {
    const ref = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    useFrame(state => {
      if (ref.current) {
        ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
        ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1)
        ref.current.rotation.y = 0.8
      }
    })
  
    return (
      <Suspense fallback={null}>
        <group ref={ref}>
          <Text
            size={10}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            {children}
          </Text>
          <group position={[35, -20, 0]} scale={[1, 0.5, 1]}>
            <Ellipse />
            <Ellipse rotation={[0, 0, Math.PI / 3]} />
            <Ellipse rotation={[0, 0, -Math.PI / 3]} />
            <mesh>
              <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
              <meshBasicMaterial attach="material" color="red" />
            </mesh>
          </group>
        </group>
      </Suspense>
    )
  }

  function Ellipse(props) {
    const geometry = useMemo(() => {
      const curve = new THREE.EllipseCurve(0, 0, 10, 3, 0, 2 * Math.PI, false, 0)
      const points = curve.getPoints(50)
      return new THREE.BufferGeometry().setFromPoints(points)
    }, [])
    return (
      <line geometry={geometry} {...props}>
        <meshBasicMaterial attach="material" />
      </line>
    )
}