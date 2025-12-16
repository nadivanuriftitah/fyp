
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const FiberViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.minPolarAngle = Math.PI / 4; // Prevent looking from top/bottom
    controls.maxPolarAngle = (3 * Math.PI) / 4;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Fiber Geometry (using LatheGeometry for the taper)
    const points = [];
    const fiberLength = 20;
    const fiberRadius = 0.5;
    const taperLength = 2;
    const taperMinRadius = 0.1;

    points.push(new THREE.Vector2(fiberRadius, fiberLength / 2));
    points.push(new THREE.Vector2(fiberRadius, taperLength / 2));
    points.push(new THREE.Vector2(taperMinRadius, 0));
    points.push(new THREE.Vector2(fiberRadius, -taperLength / 2));
    points.push(new THREE.Vector2(fiberRadius, -fiberLength / 2));
    
    const geometry = new THREE.LatheGeometry(points, 32);
    
    // Fiber Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x1ee3cf,
      metalness: 0.2,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9,
    });

    const fiber = new THREE.Mesh(geometry, material);
    fiber.rotation.x = Math.PI / 2; // Rotate to be horizontal
    scene.add(fiber);

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 bg-[#0D1B2A] rounded-lg cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 pointer-events-none">
        Drag to rotate
      </p>
    </div>
  );
};
