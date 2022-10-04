import { extend, useLoader } from '@react-three/fiber'
import { Effects, Sky, Plane, Environment, Cloud } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { TextureLoader } from "three/src/loaders/TextureLoader";
import TexturedSphere from './TexturedSphere'
import Forest from './Forest'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three';

extend({ UnrealBloomPass })

const Terrain = () => {
  const height = useLoader(TextureLoader, "mountains_displacement.png");
  const normals = useLoader(TextureLoader, "mountains_normal.png");
  const colors = useLoader(TextureLoader, "mountains_color.jpg");

  return (
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        args={[64, 64, 1024, 1024]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          map={colors}
          metalness={0.2}
          normalMap={normals}
          displacementMap={height}
          displacementScale={10}
        />
      </Plane>
  );
};

function Clouds() {
  return (
    <group>
      <Cloud position={[-10, -6, -10]} speed={0.2} opacity={0.4} />
      <Cloud position={[10, 6, -15]} speed={0.2} opacity={0.25} />
      <Cloud position={[0, 10, 0]} speed={0.2} opacity={0.2} />
      <Cloud position={[0, -10, 0]} speed={0.2} opacity={0.2} />
      <Cloud position={[-10, -6, 15]} speed={0.2} opacity={0.3} />
      <Cloud position={[10, 6, 10]} speed={0.2} opacity={0.25} />
    </group>
  )
}

export default function MainScene() {
    
    return (
        <>
            
            

            <hemisphereLight intensity={0.5} color="#eaeaea" groundColor="green" />
            {/* <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} /> */}
            {/* <pointLight intensity={1} position={[7, 5, 1]} /> */}
            {/* <Sky sunPosition={[7, 5, 1]} /> */}
            {/* <TexturedSphere/> */}
            <Forest>
              <Terrain/>
            </Forest>
            
            <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects>
            <Environment preset={"night"}/>
            <color attach="background" args={['#202030']} />
            {/* <Clouds /> */}
            {/* <fog attach="fog" args={['#202030', 15, 20]} /> */}
            {/* <Sky /> */}
        </>
                
            
      )
}