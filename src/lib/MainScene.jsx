import { extend, useLoader, useFrame } from '@react-three/fiber'
import { Effects, Sky, Plane, Environment, Cloud } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import TexturedSphere from './TexturedSphere'
import Terrain from './Terrain'
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

const Surface = () => {

  const [ref, api] = usePlane(() => ({
    mass: 1,
    position: [0, 0, 0],
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0]
  }));
  
  useFrame(({ mouse }) => {
    api.rotation.set(-Math.PI / 2 - mouse.y * 0.02, 0 + mouse.x * 0.02, 0);
  });

  return (
    <mesh scale={200} ref={ref} receiveShadow>
    <planeBufferGeometry />
    <meshStandardMaterial color="white" side={THREE.DoubleSide} />
  </mesh>
  );
};

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
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.1} castShadow />
            <pointLight
              castShadow
              intensity={3}
              args={[0xff0000, 1, 100]}
              position={[-1, 3, 1]}
            />
            <spotLight
              castShadow
              intensity={1}
              args={["blue", 1, 100]}
              position={[-1, 4, -1]}
              penumbra={1}
            />

            <Physics>
              <Surface/>
              {positions.map((position, idx) => (
                <TexturedSphere position={position} key={idx} />
              ))}
            </Physics>
              
            
            {/* <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects> */}
            <Environment preset={"night"}/>
            <color attach="background" args={['#202030']} />
            {/* <Clouds /> */}
            <fog attach="fog" args={['#202030', -5, 50]} />
            {/* <Sky /> */}
        </>
                
            
      )
}