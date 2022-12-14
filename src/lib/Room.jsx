import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import gsap from "gsap";


export default function Room(props) {
  const meshsRef = useRef()
  const mainRef = useRef()
  const wallRef = useRef()

  const appearAnim = (element, delay, duration) => {
    gsap.fromTo(element.scale, 
      {
          x: 0,
          y: 0,
          z: 0
      }, 
      {
          x: element.scale.x,
          y: element.scale.y,
          z: element.scale.z,
          duration: duration || 10, 
          delay: delay
      })
  }

  useEffect(() => {
    materials.floor.roughness = 0.5
    materials.floor.metalness = 0.3
    materials['bed/door-material'].roughness = 0.5
    materials['bed/door-material'].metalness = 0.3

    // const timer = setTimeout(() => {
      //   wallRef.scale = [1.34, 1, 1.26]
      //   meshsRef.scale = 1
      //   return(clearTimeout(timer))
      // }, 1000)
    
    let delay = 0.5
    let duration = 0.08

    for (let i = 0; i < mainRef.current.children.length; i += 1){
      

      appearAnim(mainRef.current.children[i], delay, duration)
      delay += duration
    }
    

  }, [])

  const { nodes, materials } = useGLTF('/room.glb')
  return (
    <group {...props} dispose={null} ref={mainRef}>
      <group position={[0, -0.01, 0.1]} scale={[1.34, 1, 1.26]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.floor} />
        <mesh castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials.wall1} />
        <mesh castShadow receiveShadow geometry={nodes.Cube_3.geometry} material={materials.wall2} />
      </group>
      <group position={[-0.38, 0, 0.09]} scale={[1, 1, 1.17]}>
        <mesh castShadow receiveShadow geometry={nodes.DoorFrame.geometry} material={materials['bed/door-material']} position={[-1.07, 0.12, 0.57]} rotation={[0, -1.57, 0]} scale={[0.8, 0.68, 0.5]}>
          <mesh castShadow receiveShadow geometry={nodes.Door.geometry} material={materials['bed/door-material']} position={[-0.42, 1.05, 0.02]} rotation={[0, 0.47, 0]} scale={[1, 1.04, 1]}>
            <mesh castShadow receiveShadow geometry={nodes.Handle_Back.geometry} material={materials.Handle_material} position={[0.76, 0, 0]} rotation={[0, 0, Math.PI]} />
            <mesh castShadow receiveShadow geometry={nodes.Handle_Front.geometry} material={materials.Handle_material} position={[0.76, 0, -0.03]} rotation={[-Math.PI, 0, -Math.PI]} />
          </mesh>
        </mesh>
      </group>
      <mesh castShadow receiveShadow geometry={nodes['10105_Computer_Keyboard_v1'].geometry} material={materials['10105_Computer_Keyboard_v1']} position={[-0.98, 0.63, -0.24]} rotation={[-Math.PI, 0.85, -Math.PI]} scale={0.01} />
      
      <mesh castShadow receiveShadow geometry={nodes['10106_Computer_Mouse_v1_L3'].geometry} material={materials._10106_Computer_Mouse_v1_L310106_Computer_Mouse_v1} position={[-1.09, 0.63, -0.53]} rotation={[3.08, -0.5, 3.11]} scale={0.01} />
      <group position={[-1.33, 1.47, -1.14]} rotation={[0.1, Math.PI / 2, 0]} scale={[0.99, 0.81, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Book0_1.geometry} material={materials.Book0_material} />
        <mesh castShadow receiveShadow geometry={nodes.Book0_2.geometry} material={materials.Book0_side_material} />
      </group>
      <group position={[-1.33, 1.48, -1.1]} rotation={[0.11, Math.PI / 2, 0]} scale={[0.78, 1, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Book1_1.geometry} material={materials.Book1_material} />
        <mesh castShadow receiveShadow geometry={nodes.Book1_2.geometry} material={materials.Book1_side_material} />
      </group>
      <group position={[-0.37, -0.07, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Book2_1.geometry} material={materials.Book2_material} />
        <mesh castShadow receiveShadow geometry={nodes.Book2_2.geometry} material={materials.Book2_side_material} />
      </group>
      <group position={[-1.35, 1.14, -1.22]} rotation={[-0.21, 1.57, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Book0001_1.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Book0001_2.geometry} material={materials.Book2_side_material} />
      </group>
      <group position={[-1.33, 1.16, -1.13]} rotation={[Math.PI, 0, -Math.PI / 2]}>
        <mesh castShadow receiveShadow geometry={nodes.Book0002_1.geometry} material={materials.blue} />
        <mesh castShadow receiveShadow geometry={nodes.Book0002_2.geometry} material={materials.Book1_side_material} />
      </group>
      <group position={[-1.35, 1.14, -1.29]} rotation={[-0.21, 1.57, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Book2001_1.geometry} material={materials['Book2_material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Book2001_2.geometry} material={materials['Book2_side_material.001']} />
      </group>
      <group position={[-1.35, 1.14, -1.25]} rotation={[-0.21, 1.57, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Book1001_1.geometry} material={materials.orange} />
        <mesh castShadow receiveShadow geometry={nodes.Book1001_2.geometry} material={materials['Book1_side_material.001']} />
      </group>
      <group position={[-1.31, 1.18, -1.12]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
        <mesh castShadow receiveShadow geometry={nodes.Book1002_1.geometry} material={materials['Book1_material.002']} />
        <mesh castShadow receiveShadow geometry={nodes.Book1002_2.geometry} material={materials['Book1_side_material.002']} />
      </group>
      <group>
        <mesh castShadow receiveShadow geometry={nodes.Window_01.geometry} material={materials.window} position={[-0.37, 1.26, -1.6]} scale={[2.85, 0.31, 0.23]} />
        <mesh castShadow receiveShadow geometry={nodes.Window_01005.geometry} material={materials.window} position={[-0.37, 0.9, -1.6]} scale={[3.04, 0.32, 0.34]} />
        <mesh castShadow receiveShadow geometry={nodes.Window_01004.geometry} material={materials.window} position={[-0.37, 1.31, -1.6]} rotation={[0, 0.08, 1.57]} scale={[3.84, 0.23, 0.19]} />
        <mesh castShadow receiveShadow geometry={nodes.Window_01003.geometry} material={materials.window} position={[-0.36, 1.65, -1.6]} scale={[3.04, 0.44, 0.34]} />
        <mesh castShadow receiveShadow geometry={nodes.Window_01002.geometry} material={materials.window} position={[-0.63, 1.28, -1.6]} rotation={[0, 0.08, 1.57]} scale={[3.84, 0.23, 0.19]} />
        <mesh castShadow receiveShadow geometry={nodes.Window_01001.geometry} material={materials.window} position={[-0.1, 1.31, -1.6]} rotation={[0, 0.08, 1.57]} scale={[3.84, 0.23, 0.19]} />
        <mesh castShadow receiveShadow geometry={nodes.Blanket.geometry} material={materials['Material.005']} position={[0.89, 0.57, -0.7]} scale={[0.99, 0.94, 0.98]} />
      
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Cabinet.geometry} material={materials.Door_material} position={[-1.34, 1.39, -1.22]} rotation={[0, Math.PI / 2, 0]} scale={[0.64, 0.77, 0.35]}>
        <mesh castShadow receiveShadow geometry={nodes.Cabinet1_Door.geometry} material={materials.Door_material} position={[0.3, -0.35, 0.29]} rotation={[0, 0.93, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.Handle.geometry} material={materials.Handle_material} position={[-0.54, 0.58, 0.02]} rotation={[0, 0, -Math.PI / 2]} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Countertop1.geometry} material={materials.countertop_material} position={[-0.3, 0.35, -0.3]} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Pot.geometry} material={materials.pot} position={[-1.25, 0.2, 0.16]} scale={[1, 1.17, 1]} />
      <mesh castShadow receiveShadow geometry={nodes.Soil.geometry} material={materials.Soil} position={[-1.26, 0.29, 0.17]} scale={1.03} />
      <mesh castShadow receiveShadow geometry={nodes.table.geometry} material={materials['Table-texture']} position={[-1.1, 0.6, -0.62]} scale={[1, 1, 1.08]}>
        <group position={[-0.24, 0.07, -0.17]} rotation={[0, -0.27, 0]} scale={[0.99, 1, 0.93]}>
          <mesh castShadow receiveShadow geometry={nodes.Cube024.geometry} material={materials.black} />
          <mesh castShadow receiveShadow geometry={nodes.Cube024_1.geometry} material={materials['pinkish-red']} />
          <mesh castShadow receiveShadow geometry={nodes.Cube024_2.geometry} material={nodes.Cube024_2.material} />
          <mesh castShadow receiveShadow geometry={nodes.time.geometry} material={materials['pinkish-red']} position={[0.01, 0, -0.01]} rotation={[0.02, 0.01, 0]} />
        </group>
        <group position={[0.17, 0.06, -0.23]} rotation={[Math.PI, 0, -Math.PI / 2]} scale={[1, 1, 0.92]}>
          <mesh castShadow receiveShadow geometry={nodes.Book0003_1.geometry} material={materials['pinkish-red']} />
          <mesh castShadow receiveShadow geometry={nodes.Book0003_2.geometry} material={materials['Book1_side_material.002']} />
          <group position={[0.03, 0.01, -0.01]} scale={0.8}>
            <mesh castShadow receiveShadow geometry={nodes.Book1003_1.geometry} material={materials['Book1_material.002']} />
            <mesh castShadow receiveShadow geometry={nodes.Book1003_2.geometry} material={materials['Book1_side_material.002']} />
          </group>
          <group position={[-0.02, -0.11, -0.1]} rotation={[2.98, 0, -Math.PI / 2]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder012.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder012_1.geometry} material={nodes.Cylinder012_1.material} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder012_2.geometry} material={materials.red} />
          </group>
          <group position={[-0.02, -0.1, -0.18]} rotation={[-2.9, 0, -Math.PI / 2]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder013.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder013_1.geometry} material={materials.blue} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder013_2.geometry} material={materials.white} />
          </group>
          <group position={[-0.02, 0, -0.2]} rotation={[-2.89, 0, -Math.PI / 2]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder014.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder014_1.geometry} material={materials.blue} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder014_2.geometry} material={materials.white} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder014_3.geometry} material={materials.orange} />
          </group>
          <mesh castShadow receiveShadow geometry={nodes.rubber.geometry} material={nodes.rubber.material} position={[-0.03, 0.02, -0.11]} rotation={[-3.04, 0, -Math.PI / 2]} scale={[0.21, 0.05, 0.07]} />
          <mesh castShadow receiveShadow geometry={nodes.Text.geometry} material={materials['pinkish-red']} position={[-0.02, 0.01, -0.1]} rotation={[-3.02, -0.05, -1.59]} scale={0.49} />
        </group>
        <group>
        <mesh castShadow receiveShadow geometry={nodes.drawer.geometry} material={materials['Table-texture']} position={[-0.01, -0.24, 0.42]} scale={[1.8, 1.4, 0.51]} />
        <mesh castShadow receiveShadow geometry={nodes.drawer_2.geometry} material={materials['Table-texture']} position={[0, -0.25, -0.41]} scale={[1.8, 1.4, 0.51]} />
        
        </group>
        <mesh castShadow receiveShadow geometry={nodes.pen_holder.geometry} material={materials.black} position={[-0.28, 0.08, -0.48]} scale={[1, 1, 0.92]}>
          <group position={[0.03, 0, 0]} rotation={[-0.12, 0.32, 1.18]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder016.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder016_1.geometry} material={materials.blue} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder016_2.geometry} material={materials.white} />
          </group>
          <group position={[0, 0.03, -0.02]} rotation={[-0.56, -1.3, -2.01]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder015.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder015_1.geometry} material={nodes.Cylinder015_1.material} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder015_2.geometry} material={materials.red} />
          </group>
          <group position={[-0.01, 0.01, 0.01]} rotation={[-0.05, 0.07, 1.65]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder018.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder018_1.geometry} material={nodes.Cylinder018_1.material} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder018_2.geometry} material={materials.red} />
          </group>
          <group position={[0.01, 0.02, -0.01]} rotation={[0.1, -0.14, -2.03]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder019.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder019_1.geometry} material={materials.blue} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder019_2.geometry} material={materials.white} />
          </group>
          <group position={[-0.02, 0.02, 0]} rotation={[-1.16, 1.17, -0.63]}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder017.geometry} material={materials.black} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder017_1.geometry} material={materials.blue} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder017_2.geometry} material={materials.white} />
            <mesh castShadow receiveShadow geometry={nodes.Cylinder017_3.geometry} material={materials.orange} />
          </group>
          <mesh castShadow receiveShadow geometry={nodes.pen001.geometry} material={materials.black} position={[0, -0.06, 0]} />
        </mesh>
      </mesh>
      <group>
      <mesh castShadow receiveShadow geometry={nodes.leg_1.geometry} material={materials.Handle_material} position={[-0.6, 0.35, -0.52]} rotation={[-0.12, -0.08, 0.33]} scale={[0.14, 2.5, 0.13]} />
      <mesh castShadow receiveShadow geometry={nodes.leg_4.geometry} material={materials.Handle_material} position={[-0.6, 0.35, -0.79]} rotation={[0.1, -0.09, 0.32]} scale={[0.14, 2.5, 0.13]} />
      <mesh castShadow receiveShadow geometry={nodes.leg3.geometry} material={materials.Handle_material} position={[-0.89, 0.35, -0.54]} rotation={[-0.14, -0.03, -0.12]} scale={[0.14, 2.5, 0.13]} />
      <mesh castShadow receiveShadow geometry={nodes.leg2.geometry} material={nodes.leg2.material} position={[-0.89, 0.35, -0.78]} rotation={[0.1, -0.05, -0.11]} scale={[0.14, 2.5, 0.13]} />
      <mesh castShadow receiveShadow geometry={nodes.chair_plane.geometry} material={materials.black} position={[-0.57, 0.44, -0.64]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials['bed/door-material']} position={[0.88, 0.19, -0.69]} scale={[0.99, 0.92, 0.96]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane001.geometry} material={materials.mattress} position={[0.89, 0.4, -0.68]} scale={[1, 0.9, 0.96]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane003.geometry} material={materials.pillow} position={[0.65, 0.51, -1.41]} rotation={[0.52, 0, 0]} scale={[1.83, 1.22, 1.31]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane011.geometry} material={materials.pillow} position={[1.14, 0.54, -1.44]} rotation={[-2.44, 0, -Math.PI]} scale={[2.02, 1.4, 1.4]} />
      
      </group>
      <group position={[-0.95, 0.64, -0.52]} rotation={[0, -0.16, 0]} scale={1.2}>
        <mesh castShadow receiveShadow geometry={nodes.Plane011_1.geometry} material={nodes.Plane011_1.material} />
        <mesh castShadow receiveShadow geometry={nodes.Plane011_2.geometry} material={materials['whitish yellowish']} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Dustbin.geometry} material={materials.green} position={[-0.97, 0.18, -1.44]} scale={0.81}>
        <mesh castShadow receiveShadow geometry={nodes.garbage.geometry} material={materials['whitish yellowish']} position={[0.05, 0.13, -0.03]} scale={0.64} />
        <mesh castShadow receiveShadow geometry={nodes.garbage001.geometry} material={materials['whitish yellowish']} position={[0.03, 0.14, 0.01]} scale={0.36} />
        <mesh castShadow receiveShadow geometry={nodes.garbage002.geometry} material={materials['whitish yellowish']} position={[0.03, 0.1, 0.02]} scale={0.29} />
        <mesh castShadow receiveShadow geometry={nodes.garbage003.geometry} material={materials['whitish yellowish']} position={[-0.02, 0.13, 0]} rotation={[-0.75, 1.19, 1.65]} scale={0.64} />
        <mesh castShadow receiveShadow geometry={nodes.garbage004.geometry} material={materials['whitish yellowish']} position={[0.02, 0.12, 0.05]} rotation={[-0.29, -0.5, 0.8]} scale={0.64} />
        <mesh castShadow receiveShadow geometry={nodes.garbage005.geometry} material={materials['whitish yellowish']} position={[-0.02, 0.13, -0.06]} rotation={[-2.66, 0.88, -2.16]} scale={0.64} />
      </mesh>
      <group>
      <mesh castShadow receiveShadow geometry={nodes.Cube007.geometry} material={materials['whitish yellowish']} position={[-1.44, 1.22, 1.39]} rotation={[0, 0, -Math.PI]} scale={[-0.03, -0.63, -1.01]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube008.geometry} material={materials.black} position={[-1.43, 1.22, 1.39]} scale={[0.22, 2.78, 0.8]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials.black} position={[-1.43, 1.22, 1.34]} scale={[0.22, 2.78, 0.8]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube010.geometry} material={materials.black} position={[-1.43, 1.22, 1.44]} scale={[0.22, 2.78, 0.8]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube011.geometry} material={nodes.Cube011.material} position={[-1.43, 1.24, 1.44]} rotation={[-0.01, 0.02, 0.11]} scale={[0.19, 1.99, 0.62]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube012.geometry} material={nodes.Cube012.material} position={[-1.43, 1.2, 1.39]} rotation={[-3.14, 0.02, 0.11]} scale={[0.19, 1.99, 0.62]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube013.geometry} material={nodes.Cube013.material} position={[-1.43, 1.2, 1.33]} rotation={[-3.14, 0.02, 0.11]} scale={[0.19, 1.99, 0.62]} />
      
      </group>
      <group position={[-1.43, 1.26, -0.42]} scale={[1.18, 0.85, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane001_1.geometry} material={materials['photo frame']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane001_2.geometry} material={materials['Material.002']} />
      </group>
      <group position={[-1.43, 1.57, -0.81]} rotation={[Math.PI / 2, 0, 0]} scale={[0.96, 1.01, 0.66]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane003_1.geometry} material={materials['photo frame']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane003_2.geometry} material={materials['the last supper']} />
      </group>
      <group position={[-1.43, 1.69, -0.03]} rotation={[Math.PI / 2, 0, 0]} scale={[0.73, 1.04, 0.62]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane004_1.geometry} material={materials['photo frame']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane004_2.geometry} material={materials['levi photo']} />
      </group>
      <group position={[-1.43, 1.28, -0.82]} scale={[1.11, 0.68, 0.94]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane007_1.geometry} material={materials['persistance of time']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane007_2.geometry} material={materials['photo frame']} />
      </group>
      <group position={[-1.43, 1.62, -0.42]} rotation={[Math.PI / 2, 0, 0]} scale={[1.18, 0.86, 0.73]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane008_1.geometry} material={materials['the great wave']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane008_2.geometry} material={materials['photo frame']} />
      </group>
      <group position={[-1.43, 1.27, -0.04]} scale={[1.18, 1.64, 0.76]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane009_1.geometry} material={materials['modern art']} />
        <mesh castShadow receiveShadow geometry={nodes.Plane009_2.geometry} material={materials['photo frame']} />
      </group>
      <group position={[0.18, 0.27, -1.4]} scale={[1.46, 1.71, 1.45]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube031.geometry} material={materials['bed/door-material']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube031_1.geometry} material={materials['lamp-side -dark']} />
        <mesh castShadow receiveShadow geometry={nodes.Handle009.geometry} material={materials['Handle_material.001']} position={[0, 0.03, 0.1]} scale={[0.5, 0.58, 0.6]} />
        <mesh castShadow receiveShadow geometry={nodes.Handle010.geometry} material={materials['Handle_material.001']} position={[0, -0.02, 0.1]} scale={[0.5, 0.58, 0.6]} />
        <mesh castShadow receiveShadow geometry={nodes.Handle011.geometry} material={materials['Handle_material.001']} position={[0, 0.07, 0.1]} scale={[0.5, 0.58, 0.6]} />
        <mesh castShadow receiveShadow geometry={nodes.Lamp_base.geometry} material={materials.Lamp_base_material} position={[-0.01, 0.11, 0]} scale={[0.51, 0.43, 0.51]}>
          <mesh castShadow receiveShadow geometry={nodes.Lampholder.geometry} material={materials.Lampholder_material} position={[0, 0.2, 0]} scale={0.74}>
            <mesh castShadow receiveShadow geometry={nodes.Lamp_Bulb.geometry} material={materials.Lamp_Bulb} position={[0, 0.08, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.Lampstrings.geometry} material={materials.Lampstrings_material} position={[0, 0.03, 0]}>
              <mesh castShadow receiveShadow geometry={nodes.Lamp_B1.geometry} material={materials.Lampstrings_material} position={[0.02, 0.02, 0]} />
              <mesh castShadow receiveShadow geometry={nodes.Lamp_B2.geometry} material={materials.Lampstrings_material} position={[-0.02, 0.02, 0]} />
            </mesh>
          </mesh>
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Lampshade.geometry} material={materials.Lampshade_material} position={[-0.01, 0.2, 0]} scale={[0.42, 0.36, 0.43]} />
      </group>
      <group position={[-1.25, 0.63, -0.33]} rotation={[Math.PI / 2, 0, -1.85]} scale={[0.11, 0.11, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh.geometry} material={materials.lambert8} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry} material={materials.phong15} />
      </group>
      <group position={[-1.25, 0.63, -0.33]} rotation={[Math.PI / 2, 0, -1.85]} scale={0.02}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh001.geometry} material={materials.phong15} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh001_1.geometry} material={materials.lambert8} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh001_2.geometry} material={materials.lambert11} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh001_3.geometry} material={materials.phong9} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh001_4.geometry} material={materials.phong8} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh001_5.geometry} material={materials.phong11} />
      </group>
      <group position={[-1.24, 0.82, -0.33]} rotation={[1.61, 0.14, -1.85]} scale={0.02}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh002.geometry} material={materials.phong10} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh002_1.geometry} material={materials.phong19} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh002_2.geometry} material={materials.phong20} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh002_3.geometry} material={materials.phong17} />
      </group>
      <group position={[-1.24, 0.82, -0.33]} rotation={[1.61, 0.14, -1.85]} scale={0.02}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh003.geometry} material={materials.phong16} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh003_1.geometry} material={materials.phong10} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh003_2.geometry} material={materials.phong13} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh003_3.geometry} material={materials.phong18} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Ecran_Video.geometry} material={materials['Material.006']} position={[-1.22, 0.82, -0.34]} rotation={[1.61, 0.13, -1.85]} scale={[0.2, 0.02, 0.11]} />
      <mesh castShadow receiveShadow geometry={nodes.tree.geometry} material={materials['Material.003']} position={[-1.24, 0.31, 0.18]} scale={0.34}>
        <mesh castShadow receiveShadow geometry={nodes.leaves.geometry} material={materials['Material.009']} position={[0.76, 0.62, 0.41]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/room.glb')
