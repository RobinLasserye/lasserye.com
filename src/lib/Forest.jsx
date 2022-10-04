import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Sampler } from '@react-three/drei'
// import './perlin.js'

// perlin.seed()

export default function Forest({ children, strands = 60000, ...props }) {
  const meshRef = useRef(null)

  useEffect(() => {
    meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5))
  }, [])

  const geomRef = useRef()
  return (
    <>
      {React.cloneElement(children, { ref: geomRef })}
      <instancedMesh ref={meshRef} args={[undefined, undefined, strands]} {...props}>
        <coneGeometry args={[0.2, 5.0, 2, 20, false, 0, Math.PI]} />
        <meshBasicMaterial color={'green'} />
      </instancedMesh>
      <group>
        <Sampler
          transform={({ position, normal, dummy: object }) => {
            object.scale.setScalar(THREE.MathUtils.mapLinear(1, -1, 1, 0.3, 1) * 0.1)
            object.position.copy(position)
            object.lookAt(normal.add(position))
            // object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.5)
            // object.rotation.z += Math.random() - 0.5 * (Math.PI * 0.5)
            object.rotation.x += Math.PI / 2
            
            // object.rotation.x += Math.random() - 0.5 * (Math.PI * 0.5)
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