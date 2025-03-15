import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Torus component that will be rendered in the Canvas
const Torus = ({ 
  color = '#000000', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  thickness = 3,
  tube = 3,
  radialSegments = 16,
  tubularSegments = 100,
  speed = 0.1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow rotation with slight variation based on hover state
    const speedMultiplier = hovered ? 1.5 : 1;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * speedMultiplier;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * (speed * 1.5) * speedMultiplier;
    
    // Subtle breathing effect - simplified for better performance
    const breathingScale = scale * (1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02);
    meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[thickness, tube, radialSegments, tubularSegments]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={true} 
        transparent={true}
        opacity={0.8}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Camera controller to set initial position and handle responsive adjustments
const CameraController = () => {
  const { camera, size } = useThree();
  const initialPositionRef = useRef([0, 0, 30]);
  
  useEffect(() => {
    // Set initial camera position based on screen size
    if (size.width < 768) {
      initialPositionRef.current = [0, 0, 40]; // Further back on mobile
    } else {
      initialPositionRef.current = [0, 0, 30];
    }
    
    camera.position.set(
      initialPositionRef.current[0],
      initialPositionRef.current[1],
      initialPositionRef.current[2]
    );
    
    // Handle window resize
    const handleResize = () => {
      // Adjust camera based on screen size
      if (size.width < 768) {
        initialPositionRef.current = [0, 0, 40];
      } else {
        initialPositionRef.current = [0, 0, 30];
      }
      
      camera.position.set(
        initialPositionRef.current[0],
        initialPositionRef.current[1],
        initialPositionRef.current[2]
      );
    };
    
    // Handle scroll to maintain fixed camera position
    const handleScroll = () => {
      if (size.width < 768) {
        // Reset camera position if it has changed
        if (
          camera.position.z !== initialPositionRef.current[2] ||
          camera.position.x !== initialPositionRef.current[0] ||
          camera.position.y !== initialPositionRef.current[1]
        ) {
          camera.position.set(
            initialPositionRef.current[0],
            initialPositionRef.current[1],
            initialPositionRef.current[2]
          );
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera, size]);
  
  return null;
};

// Main component
const TorusBackground = () => {
  // Use a state to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas 
        dpr={isMobile ? 1 : 2} 
        camera={{ position: [0, 0, isMobile ? 40 : 30], fov: 50 }}
        performance={{ min: 0.1 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
      >
        <CameraController />
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#ffffff', 20, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        
        {/* Main torus - simplified on mobile */}
        <Torus 
          color="#000000" 
          thickness={10} 
          tube={3} 
          speed={0.05}
          radialSegments={isMobile ? 12 : 16}
          tubularSegments={isMobile ? 75 : 100}
        />
        
        {/* Additional tori - simplified on mobile */}
        <Torus 
          color="#000000" 
          position={[0, 0, -5] as [number, number, number]} 
          scale={1.2} 
          thickness={8} 
          tube={2.5}
          speed={0.08}
          radialSegments={isMobile ? 8 : 16}
          tubularSegments={isMobile ? 50 : 100}
        />
        
        <Torus 
          color="#000000" 
          position={[0, 0, 5] as [number, number, number]} 
          scale={0.8} 
          thickness={12} 
          tube={2}
          speed={0.12}
          radialSegments={isMobile ? 8 : 16}
          tubularSegments={isMobile ? 50 : 100}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={isMobile ? 0.15 : 0.3} // Slower rotation on mobile
          rotateSpeed={0.5}
          minDistance={isMobile ? 40 : 30}
          maxDistance={isMobile ? 40 : 30}
        />
      </Canvas>
    </div>
  );
};

export default TorusBackground; 