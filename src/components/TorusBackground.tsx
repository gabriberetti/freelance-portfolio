import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents, useAnimations } from '@react-three/drei';
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
  speed = 0.1,
  isScrolling = false
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  
  // Create frustum for culling
  const frustum = useMemo(() => new THREE.Frustum(), []);
  const projScreenMatrix = useMemo(() => new THREE.Matrix4(), []);
  
  // Throttle raycaster events
  const [lastHoverCheck, setLastHoverCheck] = useState(0);
  const handlePointerOver = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverCheck > 100) { // Only check every 100ms
      setLastHoverCheck(now);
      setHovered(true);
    }
  }, [lastHoverCheck]);
  
  const handlePointerOut = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverCheck > 100) { // Only check every 100ms
      setLastHoverCheck(now);
      setHovered(false);
    }
  }, [lastHoverCheck]);
  
  // Create memoized geometry to prevent recreation
  const geometry = useMemo(() => 
    new THREE.TorusGeometry(thickness, tube, radialSegments, tubularSegments),
    [thickness, tube, radialSegments, tubularSegments]
  );
  
  // Proper cleanup on unmount
  useEffect(() => {
    return () => {
      // Dispose of geometry and materials when component unmounts
      if (geometry) {
        geometry.dispose();
      }
    };
  }, [geometry]);
  
  // Animation loop with consistent speed and effects
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Frustum culling - don't animate if not visible
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);
    
    // Get the bounding sphere of the mesh
    if (!meshRef.current.geometry.boundingSphere) {
      meshRef.current.geometry.computeBoundingSphere();
    }
    
    // Skip update if outside frustum (not visible)
    const boundingSphere = meshRef.current.geometry.boundingSphere!.clone();
    boundingSphere.applyMatrix4(meshRef.current.matrixWorld);
    if (!frustum.intersectsSphere(boundingSphere)) {
      return;
    }
    
    // Maintain consistent animation speed regardless of scrolling
    const scrollMultiplier = 1;
    
    // Slow rotation with slight variation based on hover state
    const speedMultiplier = hovered ? 1.5 : 1;
    
    // Use incremental rotation instead of absolute to prevent stuttering
    rotationRef.current.x += speed * speedMultiplier * scrollMultiplier * 0.01;
    rotationRef.current.y += (speed * 1.5) * speedMultiplier * scrollMultiplier * 0.01;
    
    meshRef.current.rotation.x = rotationRef.current.x;
    meshRef.current.rotation.y = rotationRef.current.y;
    
    // Always apply consistent breathing effect
    const breathingAmount = 0.02;
    const breathingScale = scale * (1 + Math.sin(state.clock.getElapsedTime() * 0.5) * breathingAmount);
    meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
  });
  
  // Memoize material to prevent recreation
  const material = useMemo(() => (
    <meshStandardMaterial 
      color={color} 
      wireframe={true} 
      transparent={true}
      opacity={0.8}
      emissive={color}
      emissiveIntensity={hovered ? 0.5 : 0.2}
      toneMapped={false}
    />
  ), [color, hovered]);
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      geometry={geometry}
      frustumCulled={true} // Enable built-in frustum culling
    >
      {material}
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
      // Always reset camera position on scroll to prevent zooming issues
      camera.position.set(
        initialPositionRef.current[0],
        initialPositionRef.current[1],
        initialPositionRef.current[2]
      );
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Detect scrolling for camera stabilization only
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
    
    // Initial check
    checkMobile();
    
    // Add event listeners
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Memory management - cleanup function
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Clean up Three.js resources
      if (canvasRef.current) {
        const renderer = (canvasRef.current as any).__r3f?.fiber?.renderer;
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement = null as any;
        }
      }
    };
  }, []);
  
  // Use consistent segment counts regardless of scrolling
  const getSegmentCounts = () => {
    return {
      mainRadial: isMobile ? 12 : 16,
      mainTubular: isMobile ? 75 : 100,
      secondaryRadial: isMobile ? 8 : 16,
      secondaryTubular: isMobile ? 50 : 100
    };
  };
  
  const segments = getSegmentCounts();
  
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas 
        ref={canvasRef}
        dpr={[1, isMobile ? 1.5 : 2]} 
        camera={{ position: [0, 0, isMobile ? 40 : 30], fov: 50 }}
        performance={{ min: 0.1, max: 1 }}
        frameloop="always"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
        gl={{ 
          powerPreference: 'high-performance',
          antialias: false, // Disable antialiasing for better performance
          stencil: false,   // Disable stencil buffer if not needed
          depth: true       // Keep depth testing for proper rendering
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <CameraController />
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#ffffff', 20, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        
        {/* Main torus - consistent detail regardless of scrolling */}
        <Torus 
          color="#000000" 
          thickness={10} 
          tube={3} 
          speed={0.05}
          radialSegments={segments.mainRadial}
          tubularSegments={segments.mainTubular}
          isScrolling={isScrolling}
        />
        
        {/* Additional tori - consistent detail regardless of scrolling */}
        <Torus 
          color="#000000" 
          position={[0, 0, -5] as [number, number, number]} 
          scale={1.2} 
          thickness={8} 
          tube={2.5}
          speed={0.08}
          radialSegments={segments.secondaryRadial}
          tubularSegments={segments.secondaryTubular}
          isScrolling={isScrolling}
        />
        
        <Torus 
          color="#000000" 
          position={[0, 0, 5] as [number, number, number]} 
          scale={0.8} 
          thickness={12} 
          tube={2}
          speed={0.12}
          radialSegments={segments.secondaryRadial}
          tubularSegments={segments.secondaryTubular}
          isScrolling={isScrolling}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={isMobile ? 0.15 : 0.3}
          rotateSpeed={0.5}
          minDistance={isMobile ? 40 : 30}
          maxDistance={isMobile ? 40 : 30}
        />
      </Canvas>
    </div>
  );
};

export default TorusBackground; 