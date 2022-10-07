import { extend, useLoader, useFrame } from '@react-three/fiber'
import { Effects, Sky, Plane, Environment, Cloud, OrbitControls, Html, PerspectiveCamera } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import TexturedSphere from './TexturedSphere'
import Terrain from './Terrain'
import Room from './Room'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three';



function Marker({ children, ...props }) {
  // This holds the local occluded state
  const [occluded, occlude] = useState()
  const {hide} = props

  return (
    <>
    {!hide && <mesh position={[0, 2, 0]}>
    <sphereGeometry args={[0.001, 1, 1]} />
    <meshBasicMaterial color="white" />
    <Html 
      // 3D-transform contents
      // transform
      // Hide contents "behind" other meshes
      occlude
      // Tells us when contents are occluded (or not)
      onOcclude={occlude}
      // We just interpolate the visible state into css opacity and transforms
      style={{ transition: 'all 0.2s', opacity: occluded ? 0 : 1, transform: `scale(${occluded ? 0.25 : 1})`}}
      {...props}>
      {children}
      
    </Html>
  </mesh>}
    </>
    
    
  )
}

function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, -0.2, 0]} castShadow>
      <planeGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="#E8DED1" />
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

export default function MainScene(props) {
    const {testing, handleDiv, hideHtml, isMobile} = props
    const orbitRef = useRef()

    const handlePanels = (e, param) => {
      e.preventDefault()
      
      handleDiv(true, param)
    }
    
    return (
        <>
            {/* <ambientLight intensity={0.1}  /> */}
            <directionalLight intensity={0.2} color={"white"} castShadow position={[5, 10, 5]}/>
            {/* <pointLight
              castShadow
              intensity={8}
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
            <Room position={[1, 0, 1]} />

            <Marker position={[-0.2, -1, 0.5]} hide={hideHtml}>
              <button 
                style={{ position: 'absolute', fontSize: "2vh", padding: 2, background: "white", color: "black", letterSpacing: -0.5, zIndex: 5}}
                onClick={(e) => {handlePanels(e, 1)}}
                >
                  Compétences
                </button>
            </Marker>

            <Marker position={[-0.2, -0.8, 2.4]} hide={hideHtml}>
              <button 
                style={{ position: 'absolute', fontSize: "3vh", padding: "0.4vw", background: "black", color: "grey", letterSpacing: -0.5, zIndex: 5}}
                onClick={(e) => {handlePanels(e, 3)}}
                >
                  Contact
                </button>
            </Marker>

            
        
            <Environment preset={'apartment'}/>
            <PerspectiveCamera makeDefault far={1000} near={2} position={isMobile ? [10, 8, 10] : [10, 8, 10]} zoom={isMobile ? 2 : 5.5} fov={75}/>
            {!testing && <OrbitControls enableZoom={false} enableRotate={false} enableDamping={false} enablePan={false} ref={orbitRef}/>}
            {testing && <OrbitControls ref={orbitRef}/>}
            
            {/* <color attach="background" args={['#202030']} /> */}
            {/* <Clouds /> */}
            {/* <fog attach="fog" args={['#202030', -5, 50]} /> */}
            {/* <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0.5} azimuth={0.25} /> */}
        </>
                
            
      )
}