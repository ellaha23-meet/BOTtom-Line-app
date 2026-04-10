import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Edges, 
  Grid, 
  ContactShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

function SplineObject({ parts, position, rotation, floatSpeed = 1, floatIntensity = 1, color, scale = 1 }: any) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = hovered ? scale * 1.08 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={floatIntensity} floatIntensity={floatIntensity} position={position}>
      <group 
        ref={groupRef}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        {parts.map((part: any, index: number) => (
          <group key={index} position={part.position || [0, 0, 0]} rotation={part.rotation || [0, 0, 0]}>
            {/* Dark Core */}
            <mesh castShadow receiveShadow>
              {part.geometry}
              <meshStandardMaterial 
                color="#0a0a0a"
                roughness={0.4}
                metalness={0.8}
              />
              <Edges threshold={15} color={color} scale={1.01} />
            </mesh>
            
            {/* Vibrant Glass/Glow Shell */}
            <mesh scale={1.12}>
              {part.geometry}
              <meshPhysicalMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={hovered ? 0.8 : 0.2}
                roughness={0.15}
                metalness={0.2}
                transmission={0.95}
                thickness={2}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        ))}
        
        {/* Inner Glow Light */}
        <pointLight color={color} intensity={hovered ? 2.5 : 1} distance={8} />
      </group>
    </Float>
  );
}

function Scene() {
  const { viewport, gl } = useThree();
  const isMobile = viewport.aspect < 1;
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ isDragging: false, previousX: 0, previousY: 0, velocityX: 0, velocityY: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    // CRITICAL: This tells the mobile browser to handle vertical scrolling natively,
    // while allowing us to capture horizontal swipes for rotation.
    canvas.style.touchAction = 'pan-y'; 

    const onPointerDown = (e: PointerEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.previousX = e.clientX;
      dragRef.current.previousY = e.clientY;
      dragRef.current.velocityX = 0;
      dragRef.current.velocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (dragRef.current.isDragging) {
        const deltaX = e.clientX - dragRef.current.previousX;
        const deltaY = e.clientY - dragRef.current.previousY;
        
        dragRef.current.velocityX = deltaX * 0.005;
        dragRef.current.velocityY = deltaY * 0.005;
        
        rotationRef.current.y += dragRef.current.velocityX;
        rotationRef.current.x += dragRef.current.velocityY;
        
        dragRef.current.previousX = e.clientX;
        dragRef.current.previousY = e.clientY;
      }
    };

    const onPointerUpOrCancel = () => {
      dragRef.current.isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUpOrCancel);
    window.addEventListener('pointercancel', onPointerUpOrCancel);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUpOrCancel);
      window.removeEventListener('pointercancel', onPointerUpOrCancel);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Apply inertia when not dragging
      if (!dragRef.current.isDragging) {
        rotationRef.current.y += dragRef.current.velocityX;
        rotationRef.current.x += dragRef.current.velocityY;
        dragRef.current.velocityX *= 0.95; // Friction
        dragRef.current.velocityY *= 0.95; // Friction
        
        // Constant slow drift
        rotationRef.current.y += delta * 0.1;
      }

      // Scroll-linked rotation
      const scrollY = window.scrollY;
      const targetScrollRotX = scrollY * 0.0002;
      
      // Combine manual rotation and scroll rotation
      groupRef.current.rotation.y = rotationRef.current.y;
      groupRef.current.rotation.x = rotationRef.current.x + targetScrollRotX;
    }
  });

  const getPos = (x: number, y: number, z: number): [number, number, number] => {
    if (isMobile) {
      return [x * 0.35, y * 1.1, z];
    }
    return [x, y, z];
  };

  const getScale = (s: number) => isMobile ? s * 0.65 : s;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#a855f7" />
      <spotLight position={[0, 10, 10]} intensity={1.5} color="#3b82f6" penumbra={1} />

      {/* ================= LEFT SIDE ================= */}
      <SplineObject 
        color="#3b82f6" position={getPos(-10, -3, -4)} rotation={[0.4, 0.6, 0.2]} scale={getScale(2)} floatSpeed={1.5} floatIntensity={2}
        parts={[{ geometry: <boxGeometry args={[1.5, 1.5, 1.5]} /> }]} 
      />

      <SplineObject 
        color="#10b981" position={getPos(-8, 4, -5)} rotation={[0.4, 0.4, 0]} scale={getScale(1.2)} floatSpeed={2} floatIntensity={1.5}
        parts={[
          { geometry: <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />, position: [0, -0.8, 0] },
          { geometry: <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />, position: [0, 0, 0] },
          { geometry: <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />, position: [0, 0.8, 0] }
        ]} 
      />

      <SplineObject 
        color="#eab308" position={getPos(-11, 1, -2)} rotation={[0, 0, 0]} scale={getScale(1)} floatSpeed={2.5} floatIntensity={2}
        parts={[{ geometry: <sphereGeometry args={[1.2, 64, 64]} /> }]} 
      />

      <SplineObject 
        color="#ec4899" position={getPos(-5, -5, -1)} rotation={[0.2, 0.4, 0.1]} scale={getScale(1)} floatSpeed={1.8} floatIntensity={2}
        parts={[
          { geometry: <boxGeometry args={[0.6, 1, 0.6]} />, position: [-0.8, -0.5, 0] },
          { geometry: <boxGeometry args={[0.6, 2, 0.6]} />, position: [0, 0, 0] },
          { geometry: <boxGeometry args={[0.6, 3, 0.6]} />, position: [0.8, 0.5, 0] }
        ]} 
      />

      <SplineObject 
        color="#ec4899" position={getPos(-12, 6, -6)} rotation={[0.2, -0.4, 0.5]} scale={getScale(1.5)} floatSpeed={1.2} floatIntensity={1}
        parts={[{ geometry: <capsuleGeometry args={[0.8, 1.5, 32, 32]} /> }]} 
      />

      {/* ================= RIGHT SIDE ================= */}
      <SplineObject 
        color="#10b981" position={getPos(10, -2, -4)} rotation={[-0.2, -0.5, 0.3]} scale={getScale(2.5)} floatSpeed={1.5} floatIntensity={2}
        parts={[{ geometry: <icosahedronGeometry args={[1.2, 1]} /> }]} 
      />

      <SplineObject 
        color="#3b82f6" position={getPos(8, 5, -5)} rotation={[0.2, -0.3, 0.5]} scale={getScale(1.2)} floatSpeed={2} floatIntensity={2}
        parts={[
          { geometry: <torusGeometry args={[1, 0.2, 16, 64]} /> },
          { geometry: <cylinderGeometry args={[0.2, 0.2, 2, 32]} />, position: [1.3, -1.3, 0], rotation: [0, 0, Math.PI / 4] }
        ]} 
      />

      <SplineObject 
        color="#8b5cf6" position={getPos(12, 2, -2)} rotation={[-0.5, 0.5, -0.5]} scale={getScale(1.2)} floatSpeed={2.5} floatIntensity={3}
        parts={[{ geometry: <torusGeometry args={[1, 0.4, 32, 64]} /> }]} 
      />

      <SplineObject 
        color="#f59e0b" position={getPos(5, -4, 0)} rotation={[0.5, -0.2, -0.5]} scale={getScale(1)} floatSpeed={3} floatIntensity={2}
        parts={[
          { geometry: <cylinderGeometry args={[0.3, 0.3, 2, 6]} /> },
          { geometry: <cylinderGeometry args={[0.3, 0.01, 0.8, 6]} />, position: [0, 1.4, 0] },
          { geometry: <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />, position: [0, -1.2, 0] }
        ]} 
      />

      <SplineObject 
        color="#3b82f6" position={getPos(13, -5, -6)} rotation={[0.6, 0.2, -0.4]} scale={getScale(1.5)} floatSpeed={1.5} floatIntensity={1.5}
        parts={[{ geometry: <boxGeometry args={[1.5, 1.5, 1.5]} /> }]} 
      />

      {/* ================= ENVIRONMENT ================= */}
      <Grid 
        position={[0, -8, 0]} 
        args={[100, 100]} 
        cellSize={1.5} 
        cellThickness={1} 
        cellColor="#222" 
        sectionSize={7.5} 
        sectionThickness={1.5} 
        sectionColor="#333" 
        fadeDistance={50} 
        fadeStrength={1} 
      />

      <ContactShadows position={[0, -7.99, 0]} opacity={0.5} scale={40} blur={2.5} far={6} />
      <Environment preset="city" />
    </group>
  );
}

export function Background3D() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto" style={{ height: '100%', minHeight: '600px' }}>
      <div className="absolute inset-0 bg-[#000000] z-[-1]" />
      <Canvas 
        camera={{ position: [0, 0, 16], fov: 45 }} 
        shadows 
        style={{ touchAction: 'pan-y' }}
      >
        <Scene />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
    </div>
  );
}
