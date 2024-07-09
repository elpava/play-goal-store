'use client'

import * as React from 'react'
import * as THREE from 'three'
import clsx from 'clsx/lite'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D, useGLTF } from '@react-three/drei'
import useWindowReady from 'hook/useWindowReady'
import useScreenSize from 'hook/useScreenSize'

const GROUND_CLR = '#A9A9A9'
const PRIMARY_LIGHT_CLR = '#FFFFF0'
const FIRST_CLR = '#FFD700'
const SECOND_CLR = '#4ADE80'

export default function HeroBanner() {
  const { isWindowReady } = useWindowReady()

  return (
    <section className={clsx('relative h-[80svh] bg-black md:h-svh')}>
      {isWindowReady ? (
        <Scene />
      ) : (
        <div className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 animate-bounce rounded-full bg-zinc-100 text-3xl font-bold"></div>
      )}
    </section>
  )
}

function Scene() {
  const screenSize = useScreenSize()
  const modelRef = React.useRef()
  let size,
    zAxis,
    cameraPosition = [0, 0.5, 5],
    groundSize = [10000, 10000],
    textProps = { position: [-2.75, 0.0, 1.0], size: 1 },
    modelProps = { position: [0.2, 0.1, 1.65], scale: 1.85 },
    frameProps = {
      frameWidth: 7,
      frameHeight: 1.45,
      frameThickness: 0.1,
      frameXOffset: 0.25,
      frameYOffset: 0.45,
      frameZOffset: 1.1,
    }

  if (screenSize?.tablet) {
    size = -0.35
    cameraPosition = [0, 0.5, 6.0]
    groundSize = [7500, 7500]
    textProps = { position: [-1.9, 0.15, 1.0], size: 1 + size }
    modelProps = { position: [0.0, 0.1, 1.65], scale: 1.85 + size }
    frameProps = {
      frameWidth: 7 + -2.5,
      frameHeight: 1.45 + -0.4,
      frameThickness: 0.1,
      frameXOffset: 0.0,
      frameYOffset: 0.45,
      frameZOffset: 1.1,
    }
  }
  if (screenSize?.mobile) {
    size = -0.55
    zAxis = 0.6
    cameraPosition = [0, 0.5, 5]
    groundSize = [5000, 5000]
    textProps = { position: [-1.35, 0.15, 0.65 + zAxis], size: 1 + size }
    modelProps = { position: [0, -0.2, 0.8 + zAxis], scale: 1.85 + size }
    frameProps = {
      frameWidth: 3.0,
      frameHeight: 1.25,
      frameThickness: 0.1,
      frameXOffset: 0.0,
      frameYOffset: 0.165,
      frameZOffset: 0.8 + zAxis,
    }
  }

  return (
    <Canvas camera={{ position: cameraPosition }} shadows>
      {/* <fog attach="fog" color="black" near={20} far={50} /> */}
      <spotLight
        color={PRIMARY_LIGHT_CLR}
        position={[0, 1.75, 2.2]}
        intensity={8}
        angle={Math.PI / 1.45}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        distance={5.5}
        decay={1.5}
        penumbra={0.8}
      />
      <spotLight
        color={FIRST_CLR}
        position={[1.55, 0.85, 2.25]}
        intensity={85}
        angle={Math.PI / 0.2}
        distance={4.5}
        decay={3.5}
        penumbra={1.0}
      />
      <spotLight
        color={SECOND_CLR}
        position={[-1.55, 0.85, 2.25]}
        intensity={85}
        angle={Math.PI / 0.2}
        distance={4.5}
        decay={3.5}
        penumbra={1.0}
      />
      <Ground groundSize={groundSize} />
      <group>
        <NeonFrame {...frameProps}>
          <Text {...textProps} />
        </NeonFrame>
        <Soccerball ref={modelRef} {...modelProps} />
      </group>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

function Ground({ groundSize }) {
  const meshRef = React.useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = -0.75
    }
  })
  return (
    <mesh ref={meshRef} receiveShadow rotation-x={-Math.PI / 2}>
      <planeGeometry args={groundSize} />
      <meshStandardMaterial color={GROUND_CLR} opacity={0.65} transparent />
    </mesh>
  )
}

function NeonFrame({
  children,
  frameWidth,
  frameHeight,
  frameThickness,
  frameXOffset,
  frameYOffset,
  frameZOffset,
}) {
  const frameRefs = React.useRef([])
  const elementsCount = 4

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const color = new THREE.Color().lerpColors(
      new THREE.Color(FIRST_CLR),
      new THREE.Color(SECOND_CLR),
      (Math.sin(time) + 1) / 2,
    )
    if (frameRefs.current.length > 0) {
      frameRefs.current[0].color = color
      frameRefs.current[1].color = color
      frameRefs.current[2].color = color
      frameRefs.current[3].color = color
    }
  })

  const frameSidesPosition = [
    [
      frameXOffset,
      frameYOffset + frameHeight / 2 + frameThickness / 2,
      frameZOffset,
    ],
    [
      frameXOffset,
      frameYOffset - frameHeight / 2 - frameThickness / 2,
      frameZOffset,
    ],
    [
      frameXOffset - frameWidth / 2 - frameThickness / 2,
      frameYOffset,
      frameZOffset,
    ],
    [
      frameXOffset + frameWidth / 2 + frameThickness / 2,
      frameYOffset,
      frameZOffset,
    ],
  ]
  const frameSidesArgs = [
    [frameWidth + frameThickness, frameThickness, frameThickness],
    [frameWidth + frameThickness, frameThickness, frameThickness],
    [frameThickness, frameHeight + frameThickness, frameThickness],
    [frameThickness, frameHeight + frameThickness, frameThickness],
  ]

  return (
    <group>
      {children}
      {Array.from({ length: elementsCount }, (_, idx) => (
        <mesh
          key={idx}
          position={frameSidesPosition[idx]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={frameSidesArgs[idx]} />
          <meshBasicMaterial ref={el => (frameRefs.current[idx] = el)} />
        </mesh>
      ))}
    </group>
  )
}

function Text({ size, position }) {
  const textRef = React.useRef()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const amplitudeX = 0.025
    const amplitudeY = 0.0
    const amplitudeZ = 0.01
    const speed = 0.85
    textRef.current.rotation.x = Math.sin(time * speed) * amplitudeX
    textRef.current.rotation.y = Math.sin(time * speed) * amplitudeY
    textRef.current.rotation.z = Math.sin(time * speed) * amplitudeZ
  })

  return (
    <Text3D
      ref={textRef}
      font="/3D/VTF_Redzone Classic.json"
      size={size}
      height={0.15}
      castShadow
      receiveShadow
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.05}
      bevelOffset={0}
      bevelSegments={5}
      position={position}
      rotation={[0, Math.PI / 16, 0]}
    >
      PLAY GOAL
      <meshStandardMaterial color="#3D2B1F" />
    </Text3D>
  )
}

const Soccerball = React.forwardRef(function Soccerball(props, ref) {
  const model = useGLTF('/3D/soccer-ball.gltf')
  const modelRef = React.useRef(null)
  React.useImperativeHandle(ref, () => ({ ...modelRef.current }))

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
      modelRef.current.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true
        }
      })
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      scale={props.scale}
      position={props.position}
    />
  )
})
