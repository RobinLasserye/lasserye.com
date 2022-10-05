import {useRef, Suspense, useState} from "react";
import {Canvas} from '@react-three/fiber'
import { Effects, OrbitControls, PerspectiveCamera, OrthographicCamera, BakeShadows, Stats} from '@react-three/drei'
import MainScene from './lib/MainScene'
import Loader from './lib/Loader'

export default function App() {
  const canvas = useRef()
  const testing = true
  const [panelVisibility, setPanelVisibility] = useState(false)

  const handleDiv = (vibility) => {
    setPanelVisibility(vibility)
  }

  const swicthPanel = (param) => {
    switch(param) {
      case 'foo':
         return 'bar';
     default:
       return 'foo';
     }
  }

  return (
    <>
      {panelVisibility && 
      <div style={{position: "absolute", background: "black", opacity: 0.7, width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0", zIndex: 10}}>
        
      </div>}
      {panelVisibility &&
        // <div style={{display: "flex", margin: 0, alignContent: "center", alignItems: "center", zIndex: 11}}>
        //   Test
        // </div>
        <div style={{position: "absolute", background: "white", opacity: 1, width: "40vw", height: "80vh", borderRadius: "1vw", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 15}}>
          <button style={{borderRadius: "100%", padding: "1%", margin: 0}}>X</button>
        </div>
      }
      <Canvas id="myThreeJsCanvas" ref={canvas} 
            dpr={window.devicePixelRatio}
            gl={{ antialias: false,  }}
            style={{position: "absolute", width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0"}}
            // color={"#202030"}
            shadows
            >
              {testing && <Stats/>}
              {testing && <axesHelper args={[100]}/>}
              {testing && <gridHelper args={[10, 10]}/>}

              <Suspense fallback={<Loader/>}>

                <MainScene canvasRef={canvas} testing={testing} handleDiv={handleDiv}/>

                {/* <OrthographicCamera makeDefault far={10000} near={2} position={[10, 10, 10]} zoom={130} fov={75}/> */}
                
              </Suspense>
        </Canvas>
    </>
  )
}
