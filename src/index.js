import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useMemo } from 'react'
import { Canvas, createPortal, useFrame } from 'react-three-fiber'
import { Shadow, OrthographicCamera, OrbitControls } from 'drei'
import { Text } from 'drei'
import './styles.css'

function Sphere({ children }) {
  const cam = useRef()
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('rgba(0,0,0,0)')
    const target = new THREE.WebGLRenderTarget(2048, 2048)
    return [scene, target]
  }, [])

  useFrame(({ gl }) => {
    gl.setRenderTarget(target)
    gl.render(scene, cam.current)
    gl.setRenderTarget(null)
  })

  return (
    <>
      <OrthographicCamera ref={cam} makeDefault={false} position={[0, 0, 10]} zoom={5} />
      {createPortal(
        <Text
          color="#dcecd3"
          fontSize={8}
          maxWidth={200}
          lineHeight={1.5}
          letterSpacing={0.1}
          textAlign="center"
          text={children}
          font="https://fonts.googleapis.com/css?family=Barlow:400,700https://fonts.gstatic.com/barlow-v4-latin-regular.woff"
          anchorX="center"
          anchorY="middle">
          {children}
        </Text>,
        scene
      )}
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
        <meshStandardMaterial attach="material" map={target.texture} />
      </mesh>
      {/* <Shadow scale={[2, 2, 1]} opacity={0.2} position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Shadow color="#C12020" scale={[4, 4, 1]} opacity={0.2} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} /> */}
    </>
  )
}

ReactDOM.render(
  <Canvas colorManagement pixelRatio={window.devicePixelRatio} camera={{ position: [3, 3, 15], fov: 25 }}>
    <ambientLight intensity={0.5} />
    {/* <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
    <pointLight position={[-10, -10, -5]} color="#ffffff" intensity={1} />
    <pointLight position={[0, -10, 0]} intensity={1.5} /> */}
    <Sphere>
      Typescript ReactJs Firebase Python Css NextJs Supabase Html NodeJs TailwindCss MongoDB Django MaterialUi GatsbyJs PostgreSQL Wordpress
      Sass ChakraUI Javascript Express Prisma Aws PHP MySQL Rails
    </Sphere>
    <OrbitControls />
  </Canvas>,
  document.getElementById('root')
)
