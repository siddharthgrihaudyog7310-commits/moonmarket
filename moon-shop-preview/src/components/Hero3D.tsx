import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PresentationControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#1B3022"
          clearcoat={1}
          clearcoatRoughness={0.15}
          metalness={0.3}
          roughness={0.25}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Local lights only (no external environment map fetch) so this
            never depends on a third-party CDN being reachable. */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, -4, 6]} intensity={0.8} color="#C18F58" />
        <pointLight position={[0, -8, -6]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[4, 6, 8]} intensity={0.8} />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.5, 0.5]}
          snap
        >
          <AnimatedSphere />
        </PresentationControls>

        <Sparkles count={200} scale={15} size={3} speed={0.3} opacity={0.8} color="#C18F58" />
      </Canvas>
    </div>
  );
}
