import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { OrbitControls, useTexture, Effects } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import gsap from 'gsap'

extend({ GlitchPass });


// All textures are CC0 textures from: https://cc0textures.com/
const listOfTexture = [
    "Wicker010A_2K_",
    "Ground054_2K_",
    "Moss002_2K_",
    "Fabric062_2K_"
]

export default function TexturedSphere(props) {
    const [count, setCount] = useState(0)
    const [makeGlitch, setMakeGlitch] = useState(false)
    const name = (type) => `${listOfTexture[count]}${type}.jpg`
    const sphereRef = useRef()

    const [hovered, hover] = useState(false)
    

    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
        aoMap
    ] = useLoader(TextureLoader, [
        name("Color"),
        name("Displacement"),
        name("Normal"),
        name("Roughness"),
        name("AmbientOcclusion")
    ]);

    useFrame(() => {
        sphereRef.current.rotation.y += 0.01
    })

    const handleClick = (e) => {
        setMakeGlitch(makeGlitch => makeGlitch = true)
        const timer = setTimeout(() => {
            setMakeGlitch(makeGlitch => makeGlitch = false)
        }, 500)
        if (count === listOfTexture.length - 1) {
            setCount(count => count = 0)
        } else {
            setCount(count => count = count + 1)
        }
    }

    const handePointerOver = (e) => {
        gsap.to(sphereRef.current.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.5,
            ease: "linear"
        })
    }

    const handePointerOut = (e) => {
        gsap.to(sphereRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "linear"
        })
    }

    return (<>
        {makeGlitch && <Effects>
            <glitchPass attachArray="passes"/>
      </Effects>}
      <mesh {...props} 
        onClick={handleClick} 
        ref={sphereRef} 
        onPointerOver={handePointerOver}
        onPointerOut={handePointerOut}
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
            />
        </mesh>
    </>
        
    );
}