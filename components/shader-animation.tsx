'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RippleEffect() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = state.clock.elapsedTime
      material.uniforms.u_mouse.value.lerp(
        new THREE.Vector2(mousePosition.current.x, mousePosition.current.y),
        0.05
      )
    }
  })

  const handleMouseMove = (event: React.MouseEvent) => {
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5);
      float dist = distance(uv, center);
      
      // Ripple effect
      float ripple = sin(dist * 20.0 - u_time * 2.0) * 0.5 + 0.5;
      ripple *= exp(-dist * 3.0);
      
      // Mouse interaction
      float mouseDist = distance(uv, u_mouse * 0.5 + 0.5);
      float mouseRipple = sin(mouseDist * 30.0 - u_time * 3.0) * 0.3 + 0.3;
      mouseRipple *= exp(-mouseDist * 5.0);
      
      // Color palette - Cyber blue & purple
      vec3 color1 = vec3(0.055, 0.639, 0.914);  // Primary blue #0ea5e9
      vec3 color2 = vec3(0.545, 0.361, 0.965);  // Secondary purple #8b5cf6
      vec3 color3 = vec3(0.020, 0.714, 0.831);  // Accent cyan #06b6d4
      
      // Mix colors based on distance and ripple
      vec3 color = mix(color1, color2, ripple);
      color = mix(color, color3, mouseRipple);
      
      // Add glow
      float glow = ripple + mouseRipple;
      color += glow * 0.3;
      
      // Vignette
      float vignette = 1.0 - smoothstep(0.3, 1.0, dist);
      color *= vignette;
      
      gl_FragColor = vec4(color, 0.8);
    }
  `

  return (
    <mesh
      ref={meshRef}
      onMouseMove={handleMouseMove}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default function ShaderAnimation() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
      >
        <RippleEffect />
      </Canvas>
    </div>
  )
}
