'use client'

import * as React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import {
  SCENE_PRIMARY_LIGHT_CLR,
  SCENE_SECONDARY_LIGHT_CLR,
} from 'library/constants'

export default function Ball3D() {
  return (
    <div className="mx-auto size-72">
      <Scene />
    </div>
  )
}

function Scene() {
  const modelRef = React.useRef()

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <directionalLight
        color={SCENE_PRIMARY_LIGHT_CLR}
        position={[0, 1.75, 2.2]}
        intensity={2}
      />
      <spotLight
        color={SCENE_SECONDARY_LIGHT_CLR}
        position={[2, 2.5, 6.25]}
        intensity={50}
        angle={Math.PI / 1.45}
        distance={5.5}
        decay={1.5}
        penumbra={0.8}
      />

      <Soccerball ref={modelRef} />
    </Canvas>
  )
}

const Soccerball = React.forwardRef(function Soccerball(props, ref) {
  const model = useGLTF('/3D/soccer-ball.gltf')
  const modelRef = React.useRef(null)
  React.useImperativeHandle(ref, () => ({ ...modelRef.current }))

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0009
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      scale={3.45}
      position={[0, 0, 3.85]}
    />
  )
})
