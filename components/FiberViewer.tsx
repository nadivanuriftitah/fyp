import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// FIX: Use named imports from 'three' instead of a namespace import to avoid module resolution issues that were causing type errors.
import { Mesh, Vector2, SplineCurve, LatheGeometry } from 'three';
import { useIntersectionObserver } from '../useIntersectionObserver';

const TaperedFiber = () => {
  // FIX: Use the imported `Mesh` type directly for the ref.
  const meshRef = useRef<Mesh>(null!);

  const geometry = useMemo(() => {
    const length = 10;
    const thickRadius = 0.5;
    const thinRadius = 0.1;
    
    const controlPoints = [
        // FIX: Use the imported `Vector2` class directly, removing the `THREE` namespace.
        new Vector2(thickRadius, -length / 2),
        new Vector2(thickRadius, -length / 4),
        new Vector2(thinRadius, 0),
        new Vector2(thickRadius, length / 4),
        new Vector2(thickRadius, length / 2)
    ];

    // FIX: Use the imported `SplineCurve` class directly.
    const curve = new SplineCurve(controlPoints);
    const profile = curve.getPoints(50);

    // FIX: Use the imported `LatheGeometry` class directly.
    return new LatheGeometry(profile, 32);
  }, []);

  return (
    // FIX: The JSX errors for R3F elements are resolved by fixing the underlying `three` type imports, which allows TypeScript to recognize these custom elements.
    <mesh ref={meshRef} geometry={geometry} rotation={[Math.PI / 6, 0, 0]}>
      <meshPhysicalMaterial
        color="#1EE3CF"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.2}
        transmission={0.95}
        thickness={1.5}
        ior={1.5}
      />
    </mesh>
  );
};

export const FiberViewer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className="w-full h-80 bg-[#1B263B] rounded-2xl cursor-grab active:cursor-grabbing">
      <Canvas
        frameloop={isInView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 45 }}
      >
        {/* FIX: The JSX errors for R3F elements are resolved by fixing the underlying `three` type imports. */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="white" />
        <Suspense fallback={null}>
          <TaperedFiber />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={25}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
