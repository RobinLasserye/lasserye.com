import { extend, useLoader, useFrame } from '@react-three/fiber'
import { Effects, Sky, Plane, Environment, Cloud } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import TexturedSphere from './TexturedSphere'
import Terrain from './Terrain'
import Room from './Room'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three';

extend({ UnrealBloomPass })

const positions = [
  [0, 2, 3],
  [-1, 5, 16],
  [-2, 5, -10],
  [0, 12, 3],
  [-10, 5, 16],
  [8, 5, -10]
];

function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

function Clouds() {
  return (
    <group>
      <Cloud position={[-10, 5, -10]} speed={0.2} opacity={0.4} scale={2}/>
      {/* <Cloud position={[10, 5, -15]} speed={0.2} opacity={0.25} scale={2}/> */}
      {/* <Cloud position={[10, 5, 8]} speed={0.2} opacity={0.2} scale={2}/> */}
      <Cloud position={[-10, 5, -8]} speed={0.2} opacity={0.2} scale={1}/>
      <Cloud position={[0, 5, 20]} speed={0.2} opacity={0.8} scale={2}/>
      <Cloud position={[10, 5, 10]} speed={0.2} opacity={0.25} scale={1}/>
    </group>
  )
}

export default function MainScene() {
    
    return (
        <>
            {/* <ambientLight intensity={0.1} castShadow/>
            <directionalLight intensity={1} castShadow /> */}
            {/* <pointLight
              castShadow
              intensity={1}
              args={[0x000000, 1, 100]}
              position={[5, 3, 5]}
            /> */}
            {/* <spotLight
              castShadow
              intensity={2}
              args={["white", 1, 100]}
              position={[4, 2, 2]}
              penumbra={1}
            /> */}

            <GroundPlane/>
            <Room/>
              
            
            {/* <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects> */}
            <Environment preset={'apartment'}/>
            {/* <color attach="background" args={['#202030']} /> */}
            {/* <Clouds /> */}
            {/* <fog attach="fog" args={['#202030', -5, 50]} /> */}
            <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0.5} azimuth={0.25} />
        </>
                
            
      )
}