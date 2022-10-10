import {useRef, Suspense, useState, useEffect} from "react";
import {Canvas} from '@react-three/fiber'
import { Effects, OrbitControls, PerspectiveCamera, OrthographicCamera, BakeShadows, Stats, PresentationControls} from '@react-three/drei'
import MainScene from './lib/MainScene'
import Loader from './lib/Loader'
import Panels from './lib/Panels'
import gsap from "gsap";

const isMobile = () => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    // console.log(true)
    return true
  }else{
    // false for not mobile device
    // console.log(false)
    return false
  }
}

export default function App() {
  const canvas = useRef()
  const testing = true
  const [panelVisibility, setPanelVisibility] = useState(false)
  const [hideHtml, setHideHtml] = useState(false)
  const [panel, setPanel] = useState(1)
  const ismobile = isMobile()
  
  const mainPanel = useRef()

  // const zooming = (cameraRef) => {
  //   console.log(cameraRef)
  //   gsap.to(cameraRef.current, {
  //     zoom : cameraRef.current.zoom * 1.2,
  //     duration: 1
  //   })
  // }
  // const unzooming = (cameraRef) => {
  //   console.log(cameraRef)
  //   gsap.to(cameraRef.current, {
  //     zoom : cameraRef.current.zoom / 1.2,
  //     duration: 1
  //   })
  // }

  const handleDiv = (vibility, panel_id, cameraRef) => {
    setHideHtml(vibility)
    setPanelVisibility(vibility)
    setPanel(panel_id)
    // if (!vibility) {
    //   zooming(cameraRef)
    // } else {
    //   unzooming(cameraRef)
    // }
  }

  return (
    <>
      {panelVisibility && 
      <div style={{position: "absolute", background: "black", opacity: 0.7, width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0", zIndex: 10}}
      onClick={() => {handleDiv(false)}}
      />}
      {panelVisibility &&
        <div className="radiodiv" style={{position: "absolute", background: "white", opacity: 1, width: "70vw", height: "85vh", borderRadius: "1vw", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 15}}>
          <button style={{position: "absolute", left: "69vw", top: "-3vh", borderRadius: "50%", margin: 0, padding: "3px 8px"}} onClick={() => {handleDiv(false)}}>x</button>
          <Panels param={panel} isMobile={isMobile}/>
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
                <PresentationControls
                global={false} // Spin globally or by dragging the model
                cursor={false} // Whether to toggle cursor style on drag
                snap={false} // Snap-back to center (can also be a spring config)
                speed={1} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[0, 0, 0]} // Default rotation
                polar={!panelVisibility ? [-Math.PI / 48, Math.PI / 48] : [0, 0, 0]} // Vertical limits
                azimuth={!panelVisibility ? [-Math.PI / 48, Math.PI / 48] : [0, 0, 0]} // Horizontal limits
                config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                >

                  <MainScene 
                  canvasRef={canvas} 
                  testing={testing} 
                  handleDiv={handleDiv} 
                  hideHtml={hideHtml}
                  isMobile={ismobile}
                  />
                </PresentationControls>
                {/* <OrthographicCamera makeDefault far={10000} near={2} position={[10, 10, 10]} zoom={130} fov={75}/> */}
                
              </Suspense>
        </Canvas>
    </>
  )
}
