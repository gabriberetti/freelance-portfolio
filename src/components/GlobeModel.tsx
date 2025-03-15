import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

// The actual 3D shape component
const Shape = ({ isHovered, isScrolling }: { isHovered: boolean, isScrolling: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // Approximate check for mobile
  
  // Determine detail level based on device and scrolling state
  const detailLevel = isMobile ? (isScrolling ? 0 : 1) : 1;
  
  // Animation loop with performance optimizations
  useFrame(() => {
    if (meshRef.current && wireframeRef.current) {
      // Reduce animation complexity during scrolling
      const speedMultiplier = isScrolling ? 0.5 : 1;
      
      // Rotate the shape continuously, faster when hovered
      const rotationX = 0.005 * (isHovered ? 2 : 1) * speedMultiplier;
      const rotationY = 0.008 * (isHovered ? 2 : 1) * speedMultiplier;
      
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
        args={[0.95, detailLevel]} // Adjust detail level based on device and scrolling
      >
        <MeshDistortMaterial
          color="#B4E33D"
          distort={isScrolling ? 0.1 : 0.2} // Reduce distortion during scrolling
          speed={isHovered ? 3 : 1} // Animation speed of the distortion
          roughness={0.2} 
          metalness={0.3} 
          emissive="#B4E33D" 
          emissiveIntensity={0.5}
          toneMapped={false} // Better color accuracy
        />
      </Icosahedron>
      
      {/* Wireframe outline */}
      <Icosahedron
        ref={wireframeRef}
        args={[1, detailLevel]} // Adjust detail level based on device and scrolling
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect scrolling to optimize rendering
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]} // Limit max pixel ratio for better performance
      frameloop={isScrolling ? "demand" : "always"} // Only render when needed during scrolling
      performance={{ min: 0.5 }} // Allow performance scaling
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B4E33D" />
      <Shape isHovered={isHovered} isScrolling={isScrolling} />
    </Canvas>
  );
};

export default GlobeModel; 