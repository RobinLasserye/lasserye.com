import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { OrbitControls, useTexture, Effects } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import gsap from 'gsap'

extend({ GlitchPass });


// All textures are CC0 textures from: https://cc0textures.com/
const listOfTexture = [
    "Leather034C_1K_",
    "PavingStones120_1K_",
    "Rock035_1K_",
    "Rock050_1K_",
    "Wicker007B_1K_"
]

export default function TexturedSphere(props) {
    const [count, setCount] = useState(0)
    const [makeGlitch, setMakeGlitch] = useState(false)
    // const name = (type) => `${listOfTexture[count]}${type}.jpg`
    const listOfTextureLoad = []
    const position = props.position ? props.position : [0, 5, 0] 

    const [sphereRef] = useSphere(() => ({
        mass: 10,
        position: position
      }));
    // const sphereRef = useRef()
    const materialRef = useRef()

    const [hovered, hover] = useState(false)
    
    for(let i=0 ; i < listOfTexture.length; i += 1) {
        const name = (type) => `${listOfTexture[i]}${type}.jpg`
        
        listOfTextureLoad.push(useLoader(TextureLoader, [
            name("Color"),
            name("Displacement"),
            name("Normal"),
            name("Roughness"),
            name("AmbientOcclusion")
        ]))
    }
    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
        aoMap
    ] = listOfTextureLoad[count]

    // useFrame(() => {
    //     sphereRef.current.rotation.y += 0.01
    // })

    const handleClick = (e) => {
        setMakeGlitch(makeGlitch => makeGlitch = true)
        const timer = setTimeout(() => {
            setMakeGlitch(makeGlitch => makeGlitch = false)
        }, 500)

        materialRef.current.map.dispose();
        if (count === listOfTexture.length - 1) {
            setCount(count => count = 0)
        } else {
            setCount(count => count = count + 1)
        }
        materialRef.current.needsUpdate = true;
    }

    // const handePointerOver = (e) => {
    //     gsap.to(sphereRef.current.scale, {
    //         x: sphereRef.current.scale * 1.2,
    //         y: sphereRef.current.scale * 1.2,
    //         z: sphereRef.current.scale * 1.2,
    //         duration: 0.5,
    //         ease: "linear"
    //     })
    // }

    // const handePointerOut = (e) => {
    //     gsap.to(sphereRef.current.scale, {
    //         x: sphereRef.current.scale / 1.2,
    //         y: sphereRef.current.scale / 1.2,
    //         z: sphereRef.current.scale / 1.2,
    //         duration: 0.5,
    //         ease: "linear"
    //     })
    // }

    return (<>
        {makeGlitch && <Effects>
            <glitchPass attachArray="passes"/>
      </Effects>}
      <mesh {...props} 
        onClick={handleClick} 
        ref={sphereRef} 
        // onPointerOver={handePointerOver}
        // onPointerOut={handePointerOut}
        castShadow
        receiveShadow
        >
            {/* Width and height segments for displacementMap */}
            <sphereGeometry args={[1, 100, 100]} />
            <meshStandardMaterial
            displacementScale={0.2}
            map={colorMap}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            ref={materialRef}
            />
        </mesh>
    </>
        
    );
}