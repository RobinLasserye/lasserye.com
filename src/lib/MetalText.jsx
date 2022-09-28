import React, {useMemo} from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { extend, useLoader } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Roboto from './Roboto_Bold.json';

extend({ TextGeometry })

export default function MetalText (props) {
    const {text} = props

      // parse JSON file with Three
    const font = new FontLoader(Roboto)
    //   const config = useMemo(
    //     () => ({
    //       font: font,
    //       size: 0.5,
    //       height: 0.2,
    //       curveSegments: 32,
    //       bevelEnabled: true,
    //       bevelThickness: 0.03,
    //       bevelSize: 0.02,
    //       bevelOffset: 0,
    //       bevelSegments: 5
    //     }),
    //     [font]
    //   );

    // const Plane = () => {
    //     const [ref, api] = usePlane(() => ({
    //       mass: 1,
    //       position: [0, 0, 0],
    //       type: "Static",
    //       rotation: [-Math.PI / 2, 0, 0]
    //     }));

    // useFrame(({ mouse }) => {
    //     api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
    // });


    return (
        <mesh {...props} receiveShadow>
            <textGeometry center args={[text, {
          font: font,
          size: 0.5,
          height: 0.2,
          curveSegments: 32,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        }]} />
            {/* <meshStandardMaterial attach='material' color="grey" metalness={1} side={THREE.DoubleSide} /> */}
            <meshNormalMaterial />
        </mesh>
    );

}
