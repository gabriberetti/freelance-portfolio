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
    
    // Subtle breathing effect
    const breathingScale = scale * (1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03);
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
  
  return null;
};

// Main component
const TorusBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 30], fov: 50 }}>
        <CameraController />
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#ffffff', 20, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        
        {/* Multiple tori with different parameters for a more complex look */}
        <Torus 
          color="#1F01B9" 
          thickness={10} 
          tube={3} 
          speed={0.05}
        />
        <Torus 
          color="#1F01B9" 
          position={[0, 0, -5] as [number, number, number]} 
          scale={1.2} 
          thickness={8} 
          tube={2.5}
          speed={0.08}
        />
        <Torus 
          color="#1F01B9" 
          position={[0, 0, 5] as [number, number, number]} 
          scale={0.8} 
          thickness={12} 
          tube={2}
          speed={0.12}
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
    </div>
  );
};

export default TorusBackground; 