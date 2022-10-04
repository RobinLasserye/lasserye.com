import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
// import { Depth, LayerMaterial } from 'lamina'
import { Sampler } from '@react-three/drei'
// import Perlin from 'perlin.js'

// Perlin.seed(Math.random())

export default function Forest({ children, strands = 6000, ...props }) {
  const meshRef = useRef(null)

  const geomRef = useRef()
  
  return (
    <>
      {React.cloneElement(children, { ref: geomRef })}
      <instancedMesh ref={meshRef} args={[undefined, undefined, strands]} {...props}>
        <coneGeometry args={[0.05, 1.0, 2, 20, false, 0, Math.PI]} />
        <meshBasicMaterial/>
      </instancedMesh>
      <group>
        <Sampler
          transform={({ position, normal, dummy: object }) => {
            const p = position.clone().multiplyScalar(5)
            const n = Perlin.simplex3(...p.toArray())
            object.scale.setScalar(THREE.MathUtils.mapLinear(n, -1, 1, 0.3, 1) * 0.1)
            object.position.copy(position)
            object.lookAt(normal.add(position))
            object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.5)
            object.rotation.z += Math.random() - 0.5 * (Math.PI * 0.5)
            object.rotation.x += Math.random() - 0.5 * (Math.PI * 0.5)
            object.updateMatrix()
            return object
          }}
          mesh={geomRef}
          instances={meshRef}
        />
      </group>
    </>
  )
}