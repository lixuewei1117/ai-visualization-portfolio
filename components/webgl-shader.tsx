'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ShaderMaterial() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const timeRef = useRef(0)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  )

  useFrame((state) => {
    timeRef.current += 0.008
    const material = meshRef.current?.material as THREE.ShaderMaterial
    if (material?.uniforms) {
      material.uniforms.u_time.value = timeRef.current

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      material.uniforms.u_mouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      )
    }
  })

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseRef.current.targetX = (e.clientX / window.innerWidth)
    mouseRef.current.targetY = 1 - (e.clientY / window.innerHeight)
  }

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = /* glsl */ `
    precision highp float;
    
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    
    varying vec2 vUv;
    varying vec3 vPosition;

    // Noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 6; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
      vec2 p = (uv - 0.5) * aspect;
      
      float t = u_time * 0.15;
      
      // Multiple layers of flowing noise
      float n1 = fbm(vec3(p * 2.0 + vec2(t * 0.8, t * 0.6), t * 0.3));
      float n2 = fbm(vec3(p * 3.0 + vec2(-t * 0.5, t * 0.8), t * 0.4 + 10.0));
      float n3 = fbm(vec3(p * 1.5 + vec2(t * 0.3, -t * 0.4), t * 0.2 + 20.0));
      float n4 = fbm(vec3(p * 4.0 + vec2(t * 0.6, -t * 0.7), t * 0.5 + 30.0));
      
      // Combine noise layers
      float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.15 + n4 * 0.05;
      noise = noise * 0.5 + 0.5; // Normalize to 0-1
      
      // Mouse influence
      vec2 mouse = (u_mouse - 0.5) * aspect;
      float distToMouse = length(p - mouse);
      float mouseInfluence = smoothstep(0.8, 0.0, distToMouse) * 0.3;
      
      // Color palette - similar to the 21st.dev shader
      vec3 color1 = vec3(0.05, 0.02, 0.15);  // Dark purple
      vec3 color2 = vec3(0.15, 0.05, 0.25);  // Purple
      vec3 color3 = vec3(0.02, 0.15, 0.25);  // Dark blue
      vec3 color4 = vec3(0.1, 0.05, 0.35);   // Deep violet
      vec3 color5 = vec3(0.08, 0.02, 0.2);   // Very dark purple
      
      // Create flowing gradient
      float gradient1 = sin(noise * 6.28 + t) * 0.5 + 0.5;
      float gradient2 = sin(noise * 4.0 - t * 0.8) * 0.5 + 0.5;
      float gradient3 = cos(noise * 5.0 + t * 0.5) * 0.5 + 0.5;
      
      // Mix colors based on gradients
      vec3 color = mix(color1, color2, gradient1);
      color = mix(color, color3, gradient2 * 0.6);
      color = mix(color, color4, gradient3 * 0.4);
      color = mix(color, color5, (1.0 - gradient1) * 0.3);
      
      // Add subtle highlights
      float highlight = pow(noise, 3.0) * 0.4;
      color += highlight * vec3(0.15, 0.1, 0.25);
      
      // Mouse adds a subtle glow
      color += mouseInfluence * vec3(0.2, 0.15, 0.3);
      
      // Subtle vignette
      float vignette = 1.0 - smoothstep(0.3, 1.2, length(p));
      color *= 0.7 + vignette * 0.3;
      
      // Add very subtle grain
      float grain = snoise(vec3(uv * 500.0, t * 10.0)) * 0.02;
      color += grain;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mouseRef.current.targetX = 0.5
        mouseRef.current.targetY = 0.5
      }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function WebGLShader() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: true, alpha: false }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 1)
      }}
    >
      <ShaderMaterial />
    </Canvas>
  )
}
