import {useRef, Suspense, useState} from "react";
import {Canvas} from '@react-three/fiber'
import { Effects, OrbitControls, OrthographicCamera, BakeShadows } from '@react-three/drei'
import MainScene from './lib/MainScene'
import Loader from './lib/Loader'

export default function App() {
  const canvas = useRef()

  return (
    <>
      <Canvas id="myThreeJsCanvas" ref={canvas} 
            dpr={window.devicePixelRatio}
            shadows gl={{ antialias: false }}
            style={{position: "absolute", width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0"}}
            color={"#202030"}
            >
            <Suspense fallback={<Loader/>}>

              <MainScene canvasRef={canvas}/>

              <BakeShadows />
              <OrthographicCamera makeDefault far={10000} near={-20} position={[-10, 2, -10]} zoom={10} fov={35}/>
              <OrbitControls />
            </Suspense>
        </Canvas>
    </>
  )
}
