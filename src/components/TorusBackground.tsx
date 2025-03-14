import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Optimized Torus component with performance improvements
const Torus = ({ 
  color = '#1F01B9', 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  thickness = 3,
  tube = 3,
  radialSegments = 16,
  tubularSegments = 100,
  speed = 0.1,
  wireframe = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create geometry once with useMemo to avoid recreating it on every render
  const geometry = useMemo(() => 
    new THREE.TorusGeometry(thickness, tube, radialSegments, tubularSegments),
    [thickness, tube, radialSegments, tubularSegments]
  );
  
  // Create material once with useMemo
  const material = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      wireframe,
      transparent: true,
      opacity: 0.8,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.2,
      roughness: 0.4,
      metalness: 0.6
    }),
    [color, wireframe]
  );
  
  // Update material when hover state changes
  useEffect(() => {
    if (material) {
      material.emissiveIntensity = hovered ? 0.5 : 0.2;
    }
  }, [hovered, material]);
  
  // Animation loop with optimized calculations
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth rotation with optimized calculations
    meshRef.current.rotation.x = time * speed * (hovered ? 1.5 : 1);
    meshRef.current.rotation.y = time * (speed * 1.5) * (hovered ? 1.5 : 1);
    
    // Subtle breathing effect with optimized sine calculation
    const breathingScale = scale * (1 + Math.sin(time * 0.5) * 0.03);
    meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
      geometry={geometry}
      material={material}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

// Optimized camera controller with proper cleanup
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
      } else if (size.width < 1024) {
        camera.position.z = 35; // Medium screens
      } else {
        camera.position.z = 30; // Large screens
      }
      
      // Update camera aspect ratio and projection matrix
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
      }
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => {
      // Proper cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, [camera, size]);
  
  return null;
};

// Main component with performance optimizations
const TorusBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 30], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        performance={{ min: 0.5 }}
      >
        <CameraController />
        <color attach="background" args={['transparent']} />
        
        {/* Improved lighting setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        
        {/* Multiple tori with improved parameters and colors */}
        <Torus 
          color="#1F01B9" 
          thickness={10} 
          tube={3} 
          speed={0.05}
          wireframe={true}
          radialSegments={24}
          tubularSegments={128}
        />
        <Torus 
          color="#3730a3" 
          position={[0, 0, -5]} 
          scale={1.2} 
          thickness={8} 
          tube={2.5}
          speed={0.08}
          wireframe={true}
          radialSegments={20}
          tubularSegments={120}
        />
        <Torus 
          color="#4f46e5" 
          position={[0, 0, 5]} 
          scale={0.8} 
          thickness={12} 
          tube={2}
          speed={0.12}
          wireframe={true}
          radialSegments={16}
          tubularSegments={100}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Preload assets for better performance */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default TorusBackground; 