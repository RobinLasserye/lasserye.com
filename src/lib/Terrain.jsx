import {useLoader } from '@react-three/fiber'
import {useRef} from 'react'
import {Plane} from '@react-three/drei'
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Terrain () {
    const height = useLoader(TextureLoader, "mountains_displacement.png");
    const normals = useLoader(TextureLoader, "mountains_normal.png");
    const colors = useLoader(TextureLoader, "mountains_color.jpg");
    const materialRef = useRef()
  
    return (
        <Plane
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -8, 0]}
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
            ref={materialRef}
          />
        </Plane>
    );
  };