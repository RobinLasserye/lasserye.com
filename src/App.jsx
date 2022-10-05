import {useRef, Suspense, useState} from "react";
import {Canvas} from '@react-three/fiber'
import { Effects, OrbitControls, OrthographicCamera, BakeShadows, Stats} from '@react-three/drei'
import MainScene from './lib/MainScene'
import Loader from './lib/Loader'

export default function App() {
  const canvas = useRef()
  const testing = true

  return (
    <>
      <Canvas id="myThreeJsCanvas" ref={canvas} 
            dpr={window.devicePixelRatio}
            gl={{ antialias: false,  }}
            style={{position: "absolute", width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0"}}
            color={"#202030"}
            shadows
            >
              {testing && <Stats/>}
              {testing && <axesHelper args={[100]}/>}
              {testing && <gridHelper args={[10, 10]}/>}

              <Suspense fallback={<Loader/>}>

                <MainScene canvasRef={canvas}/>

                {/* <BakeShadows /> */}
                <OrthographicCamera makeDefault far={10000} near={-100} position={[10, 10, 10]} zoom={40} fov={50}/>
                {!testing && <OrbitControls enableZoom={false} enableRotate={false}/>}
                {testing && <OrbitControls/>}
              </Suspense>
        </Canvas>
    </>
  )
}
