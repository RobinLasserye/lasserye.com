import { Canvas, extend } from '@react-three/fiber'
import { Effects, OrbitControls, OrthographicCamera, BakeShadows } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import TexturedSphere from './TexturedSphere'
import Loader from './TexturedSphere'
import { Suspense } from 'react'

extend({ UnrealBloomPass })

export default function MainScene() {
    
    return (
        <Canvas shadows gl={{ antialias: false }}
        style={{position: "absolute", width: "100vw", height: "100vh", margin: 0, right: "0", top: "0", bottom: "0", left: "0"}}
        dpr={window.devicePixelRatio}
        >
            <Suspense fallback={<Loader/>}>
                <color attach="background" args={['#202030']} />
                <fog attach="fog" args={['#202030', 10, 25]} />

                <hemisphereLight intensity={0.5} color="#eaeaea" groundColor="blue" />
                <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} />
                
                <TexturedSphere/>

                <Effects disableGamma>
                    <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
                </Effects>

                <BakeShadows />
                <OrthographicCamera makeDefault far={100} near={0.1} position={[-10, 2, -10]} zoom={100} />
                <OrbitControls autoRotate enableZoom={false} />
            
                
                </Suspense>   
        </Canvas>
      )
}