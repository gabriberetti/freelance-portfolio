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
  color = '#141414', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  detail = 0,
  speed = 0.1,
  wireframe = true,
  scrollFactor = 1, // How much this shape responds to scrolling
  minScale = 0.5,    // Minimum scale at start
  maxScale = 3.5     // Maximum scale when fully scrolled
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scrollProgress = useScrollProgress();
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate current scale based on scroll progress
    const currentScale = minScale + (maxScale - minScale) * Math.min(scrollProgress * scrollFactor, 1);
    
    // Rotation animation
    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.5 : 1;
    meshRef.current.rotation.x = time * speed * speedMultiplier;
    meshRef.current.rotation.y = time * (speed * 1.3) * speedMultiplier;
    
    // Subtle breathing effect
    const breathingScale = currentScale * (1 + Math.sin(time * 0.5) * 0.03);
    meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
    
    // Move forward as user scrolls (z position becomes smaller)
    const zOffset = initialPositionRef.current[2] - (scrollProgress * scrollFactor * 10);
    meshRef.current.position.set(
      initialPositionRef.current[0],
      initialPositionRef.current[1],
      zOffset
    );
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={minScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Dodecahedron component (12 faces)
const Dodecahedron = ({ 
  color = '#141414', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  detail = 0,
  speed = 0.08,
  wireframe = true,
  scrollFactor = 1, // How much this shape responds to scrolling
  minScale = 0.5,    // Minimum scale at start
  maxScale = 4.0     // Maximum scale when fully scrolled
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scrollProgress = useScrollProgress();
  const initialPositionRef = useRef(position);
  const rotationOffsetRef = useRef({
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI
  });
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate current scale based on scroll progress
    const currentScale = minScale + (maxScale - minScale) * Math.min(scrollProgress * scrollFactor, 1);
    
    // Rotation animation with different axis emphasis
    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.5 : 1;
    
    meshRef.current.rotation.x = rotationOffsetRef.current.x + time * speed * 0.7 * speedMultiplier;
    meshRef.current.rotation.y = rotationOffsetRef.current.y + time * speed * speedMultiplier;
    meshRef.current.rotation.z = rotationOffsetRef.current.z + time * speed * 0.5 * speedMultiplier;
    
    // Subtle pulsing effect
    const pulseScale = currentScale * (1 + Math.sin(time * 0.7) * 0.04);
    meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    
    // Move forward as user scrolls (z position becomes smaller)
    const zOffset = initialPositionRef.current[2] - (scrollProgress * scrollFactor * 10);
    meshRef.current.position.set(
      initialPositionRef.current[0],
      initialPositionRef.current[1],
      zOffset
    );
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={minScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <dodecahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Octahedron component (8 faces)
const Octahedron = ({ 
  color = '#141414', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  detail = 0,
  speed = 0.12,
  wireframe = true,
  scrollFactor = 1, // How much this shape responds to scrolling
  minScale = 0.5,    // Minimum scale at start
  maxScale = 3.0     // Maximum scale when fully scrolled
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scrollProgress = useScrollProgress();
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate current scale based on scroll progress
    const currentScale = minScale + (maxScale - minScale) * Math.min(scrollProgress * scrollFactor, 1);
    
    // Complex rotation pattern
    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.5 : 1;
    
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.5 * speedMultiplier;
    meshRef.current.rotation.y = time * speed * speedMultiplier;
    
    // Floating movement (reduced as scroll increases)
    const floatFactor = Math.max(1 - scrollProgress, 0.2); // Reduce floating as we scroll
    const floatX = initialPositionRef.current[0] + Math.sin(time * 0.3) * 0.5 * floatFactor;
    const floatY = initialPositionRef.current[1] + Math.cos(time * 0.4) * 0.5 * floatFactor;
    
    // Move forward as user scrolls (z position becomes smaller)
    const zOffset = initialPositionRef.current[2] - (scrollProgress * scrollFactor * 10);
    meshRef.current.position.set(floatX, floatY, zOffset);
    
    // Expansion and contraction effect
    const expansionScale = currentScale * (1 + Math.sin(time * 0.8) * 0.05);
    meshRef.current.scale.set(expansionScale, expansionScale, expansionScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={minScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Tetrahedron component (4 faces)
const Tetrahedron = ({ 
  color = '#141414', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  detail = 0,
  speed = 0.15,
  wireframe = true,
  scrollFactor = 1, // How much this shape responds to scrolling
  minScale = 0.5,    // Minimum scale at start
  maxScale = 2.5     // Maximum scale when fully scrolled
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scrollProgress = useScrollProgress();
  const initialPositionRef = useRef(position);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate current scale based on scroll progress
    const currentScale = minScale + (maxScale - minScale) * Math.min(scrollProgress * scrollFactor, 1);
    
    // Rotation with oscillation
    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.5 : 1;
    
    meshRef.current.rotation.x = time * speed * speedMultiplier;
    meshRef.current.rotation.y = Math.cos(time * 0.5) * 2 * speedMultiplier;
    
    // Floating movement in a figure-8 pattern (reduced as scroll increases)
    const floatFactor = Math.max(1 - scrollProgress, 0.2); // Reduce floating as we scroll
    const floatX = initialPositionRef.current[0] + Math.sin(time * 0.5) * 0.7 * floatFactor;
    const floatY = initialPositionRef.current[1] + Math.sin(time * 0.7) * Math.cos(time * 0.7) * 0.7 * floatFactor;
    
    // Move forward as user scrolls (z position becomes smaller)
    const zOffset = initialPositionRef.current[2] - (scrollProgress * scrollFactor * 10);
    meshRef.current.position.set(floatX, floatY, zOffset);
    
    // Subtle scale oscillation
    const oscillationScale = currentScale * (1 + Math.sin(time * 1.2) * 0.03);
    meshRef.current.scale.set(oscillationScale, oscillationScale, oscillationScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={minScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <tetrahedronGeometry args={[1, detail]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe} 
        transparent={true}
        opacity={0.6}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Camera controller to set initial position and handle responsive adjustments
const CameraController = () => {
  const { camera, size } = useThree();
  const scrollProgress = useScrollProgress();
  
  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 30);
    
    // Handle window resize
    const handleResize = () => {
      // Adjust camera based on screen size
      if (size.width < 768) {
        camera.position.z = 40; // Move camera back on smaller screens
      } else {
        camera.position.z = 30;
      }
    };
    
    handleResize(); // Initial call
    
    return () => {
      // Cleanup
    };
  }, [camera, size]);
  
  // Adjust camera FOV based on scroll
  useFrame(() => {
    // Ensure we're working with a PerspectiveCamera that has FOV
    if (camera instanceof THREE.PerspectiveCamera) {
      // Gradually decrease FOV as user scrolls (creates a zoom effect)
      camera.fov = 50 - (scrollProgress * 10);
      camera.updateProjectionMatrix();
    }
  });
  
  return null;
};

// Main component
const PlatonicSolidsBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Calculate scroll progress (0 to 1)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed inset-0 z-[-1]">
      <ScrollContext.Provider value={scrollProgress}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 30], fov: 50 }}>
          <CameraController />
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#ffffff', 20, 40]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.0} />
          
          {/* Main platonic solids with scroll animation */}
          <Icosahedron 
            color="#141414" 
            position={[5, 3, 10]} 
            minScale={0.8}
            maxScale={3.5}
            scrollFactor={1.2}
            speed={0.05}
          />
          <Dodecahedron 
            color="#141414" 
            position={[-5, -3, 15]} 
            minScale={0.7}
            maxScale={4.0}
            scrollFactor={1.0}
            speed={0.08}
          />
          <Octahedron 
            color="#141414" 
            position={[-4, 4, 12]} 
            minScale={0.6}
            maxScale={3.0}
            scrollFactor={1.5}
            speed={0.12}
          />
          <Tetrahedron 
            color="#141414" 
            position={[4, -4, 14]} 
            minScale={0.5}
            maxScale={2.5}
            scrollFactor={1.3}
            speed={0.15}
          />
          
          {/* Additional shapes with different scroll factors */}
          <Icosahedron 
            color="#141414" 
            position={[-2, -5, 18]} 
            minScale={0.4}
            maxScale={2.0}
            scrollFactor={0.8}
            speed={0.2}
          />
          <Dodecahedron 
            color="#141414" 
            position={[7, -1, 20]} 
            minScale={0.3}
            maxScale={2.2}
            scrollFactor={0.7}
            speed={0.15}
          />
          <Octahedron 
            color="#141414" 
            position={[0, 6, 16]} 
            minScale={0.4}
            maxScale={1.8}
            scrollFactor={0.9}
            speed={0.18}
          />
          <Tetrahedron 
            color="#141414" 
            position={[-6, 0, 22]} 
            minScale={0.3}
            maxScale={1.6}
            scrollFactor={0.6}
            speed={0.25}
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            rotateSpeed={0.5}
          />
        </Canvas>
      </ScrollContext.Provider>
    </div>
  );
};

export default PlatonicSolidsBackground; 