'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, Sky } from '@react-three/drei';
import * as THREE from 'three';

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create terrain geometry with noise-based height
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 64, 64);
    const positions = geo.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Create mountain-like terrain with multiple noise layers
      let z = 0;
      z += Math.sin(x * 0.3) * Math.cos(y * 0.3) * 2;
      z += Math.sin(x * 0.5 + 1) * Math.sin(y * 0.5 + 0.5) * 1.5;
      z += Math.cos(x * 0.2 - y * 0.3) * 1;
      z += Math.sin(x * 0.7) * Math.cos(y * 0.4) * 0.5;
      
      // Create peaks
      const distFromCenter = Math.sqrt(x * x + y * y);
      z *= Math.max(0, 1 - distFromCenter / 20);
      
      positions.setZ(i, z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      rotation={[-Math.PI / 2.2, 0, 0]} 
      position={[0, -3, -5]}
    >
      <meshStandardMaterial
        color="#8B7355"
        flatShading
        side={THREE.DoubleSide}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

function Mountains() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Create multiple mountain peaks
  const mountains = useMemo(() => {
    const peaks = [];
    const positions = [
      { x: -6, z: -8, scale: 1.5, height: 4 },
      { x: 0, z: -12, scale: 2, height: 5 },
      { x: 6, z: -10, scale: 1.8, height: 4.5 },
      { x: -10, z: -15, scale: 1.2, height: 3 },
      { x: 10, z: -14, scale: 1.4, height: 3.5 },
      { x: -3, z: -18, scale: 1.6, height: 4 },
      { x: 5, z: -20, scale: 2.2, height: 5.5 },
    ];
    
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      peaks.push(
        <mesh 
          key={i} 
          position={[pos.x, pos.height / 2 - 2, pos.z]}
          scale={[pos.scale, pos.height, pos.scale]}
        >
          <coneGeometry args={[1, 1, 6]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#6F655C' : '#8B7355'}
            flatShading
            metalness={0.05}
            roughness={0.9}
          />
        </mesh>
      );
    }
    return peaks;
  }, []);

  return <group ref={groupRef}>{mountains}</group>;
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 15 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    
    return [positions];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F5F2EB"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1} 
        castShadow
        color="#FFF5E6"
      />
      <directionalLight 
        position={[-10, 10, -10]} 
        intensity={0.3}
        color="#D4C4B0"
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#E8DFD4', 15, 40]} />
      
      {/* Sky gradient */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
      />
      
      {/* 3D Elements */}
      <Terrain />
      <Mountains />
      <Particles />
      
      {/* Ground plane for fog */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -4, 0]}
      >
        <meshStandardMaterial color="#D4C4B0" />
      </Plane>
    </>
  );
}

interface TerrainSceneProps {
  className?: string;
}

export function TerrainScene({ className = '' }: TerrainSceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 2, 10], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}



