import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

// Scroll progress context to share scroll position with all components
const ScrollContext = React.createContext(0);

// Custom hook to use scroll progress
const useScrollProgress = () => {
  return React.useContext(ScrollContext);
};

// Icosahedron component (20 faces)
const Icosahedron = ({ 
  color = '#ffffff', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 2.5,
  detail = 0,
  speed = 0.1,
  wireframe = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation animation
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * (speed * 1.3);
    
    // Subtle breathing effect
    const breathingScale = scale * (1 + Math.sin(time * 0.5) * 0.03);
    meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
    >
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Dodecahedron component (12 faces)
const Dodecahedron = ({ 
  color = '#ffffff', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 3.0,
  detail = 0,
  speed = 0.08,
  wireframe = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPositionRef = useRef(position);
  const rotationOffsetRef = useRef({
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI
  });
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation animation with different axis emphasis
    const time = state.clock.getElapsedTime();
    
    meshRef.current.rotation.x = rotationOffsetRef.current.x + time * speed * 0.7;
    meshRef.current.rotation.y = rotationOffsetRef.current.y + time * speed;
    meshRef.current.rotation.z = rotationOffsetRef.current.z + time * speed * 0.5;
    
    // Subtle pulsing effect
    const pulseScale = scale * (1 + Math.sin(time * 0.7) * 0.04);
    meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
    >
      <dodecahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Octahedron component (8 faces)
const Octahedron = ({ 
  color = '#ffffff', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 2.2,
  detail = 0,
  speed = 0.12,
  wireframe = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation animation
    const time = state.clock.getElapsedTime();
    
    // Complex rotation pattern
    meshRef.current.rotation.x = time * speed * 1.2;
    meshRef.current.rotation.y = time * speed;
    meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.2;
    
    // Subtle floating motion
    const floatX = initialPositionRef.current[0] + Math.sin(time * 0.3) * 0.3;
    const floatY = initialPositionRef.current[1] + Math.cos(time * 0.2) * 0.3;
    meshRef.current.position.set(floatX, floatY, initialPositionRef.current[2]);
    
    // Expansion and contraction effect
    const expansionScale = scale * (1 + Math.sin(time * 0.8) * 0.05);
    meshRef.current.scale.set(expansionScale, expansionScale, expansionScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
    >
      <octahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Tetrahedron component (4 faces)
const Tetrahedron = ({ 
  color = '#ffffff', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1.8,
  detail = 0,
  speed = 0.15,
  wireframe = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation with oscillation
    const time = state.clock.getElapsedTime();
    
    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * speed * 0.8;
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.3;
    
    // Subtle floating motion
    const floatX = initialPositionRef.current[0] + Math.sin(time * 0.4) * 0.4;
    const floatY = initialPositionRef.current[1] + Math.cos(time * 0.3) * 0.4;
    meshRef.current.position.set(floatX, floatY, initialPositionRef.current[2]);
    
    // Subtle scale oscillation
    const oscillationScale = scale * (1 + Math.sin(time * 1.2) * 0.03);
    meshRef.current.scale.set(oscillationScale, oscillationScale, oscillationScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
    >
      <tetrahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Camera controller for responsive adjustments
const CameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Adjust camera position based on screen size
    const handleResize = () => {
      if (camera instanceof THREE.PerspectiveCamera) {
        // For smaller screens, move camera back to see more
        if (size.width < 768) {
          camera.position.z = 40;
          camera.fov = 60;
        } else {
          camera.position.z = 30;
          camera.fov = 50;
        }
        camera.updateProjectionMatrix();
      }
    };
    
    handleResize(); // Initial call
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup
    };
  }, [camera, size]);
  
  return null;
};

// Main component
const AboutPlatonicBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas className="pointer-events-none" dpr={[1, 2]} camera={{ position: [0, 0, 30], fov: 50 }}>
        <CameraController />
        <color attach="background" args={['#141414']} />
        <fog attach="fog" args={['#141414', 20, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        
        {/* Main platonic solids with fixed scales */}
        <Icosahedron 
          color="#ffffff" 
          position={[5, 3, 10]} 
          scale={2.5}
          speed={0.05}
        />
        <Dodecahedron 
          color="#ffffff" 
          position={[-5, -3, 15]} 
          scale={3.0}
          speed={0.08}
        />
        <Octahedron 
          color="#ffffff" 
          position={[-4, 4, 12]} 
          scale={2.2}
          speed={0.12}
        />
        <Tetrahedron 
          color="#ffffff" 
          position={[4, -4, 14]} 
          scale={1.8}
          speed={0.15}
        />
        
        {/* Additional shapes */}
        <Icosahedron 
          color="#ffffff" 
          position={[-2, -5, 18]} 
          scale={1.5}
          speed={0.2}
        />
        <Dodecahedron 
          color="#ffffff" 
          position={[2, 5, 20]} 
          scale={1.2}
          speed={0.1}
        />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default AboutPlatonicBackground; 