import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// The actual 3D shape component
const Shape = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  
  // Animation loop
  useFrame(() => {
    if (meshRef.current && wireframeRef.current) {
      // Rotate the shape continuously, faster when hovered
      const rotationX = 0.005 * (isHovered ? 2 : 1);
      const rotationY = 0.008 * (isHovered ? 2 : 1);
      
      meshRef.current.rotation.x += rotationX;
      meshRef.current.rotation.y += rotationY;
      
      // Keep wireframe in sync with the main mesh
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    }
  });

  return (
    <>
      {/* Main colored shape */}
      <Icosahedron 
        ref={meshRef} 
        args={[0.95, 1]} // Slightly smaller to fit inside the wireframe
      >
        <MeshDistortMaterial
          color="#B4E33D"
          distort={0.2} // Reduced distortion
          speed={isHovered ? 3 : 1} // Animation speed of the distortion
          roughness={0.2} // Reduced roughness for more shine
          metalness={0.3} // Reduced metalness to show more of the actual color
          emissive="#B4E33D" // Add emission of the same color
          emissiveIntensity={0.5} // Control emission strength
        />
      </Icosahedron>
      
      {/* Wireframe outline */}
      <Icosahedron
        ref={wireframeRef}
        args={[1, 1]} // Standard size for the wireframe
      >
        <meshBasicMaterial
          color="#000000"
          wireframe={true}
          transparent={true}
          opacity={1}
        />
      </Icosahedron>
    </>
  );
};

// The wrapper component with Canvas
const GlobeModel = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <ambientLight intensity={1.0} /> {/* Increased ambient light */}
      <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Increased point light */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B4E33D" /> {/* Added backlight */}
      <Shape isHovered={isHovered} />
    </Canvas>
  );
};

export default GlobeModel; 