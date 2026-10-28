import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Scroll-Reactive 3D Architectural Sculpture & Ambient Geometry
 * Features a 3D TorusKnot + Floating Geometric Satellites lit by studio lights
 * that smoothly rotate, shift position, and tilt in 3D space as the user scrolls.
 */
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio Lighting for 3D Depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xf97316, 3.5, 60);
    warmLight.position.set(14, 12, 16);
    scene.add(warmLight);

    const indigoLight = new THREE.PointLight(0x6366f1, 3.2, 60);
    indigoLight.position.set(-14, -10, 14);
    scene.add(indigoLight);

    // Main 3D Stage Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // 1. Primary 3D Architectural TorusKnot (Subtle Wireframe + Shaded Core)
    const knotGeo = new THREE.TorusKnotGeometry(5.5, 1.35, 140, 20, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(8, 1, -4);
    stageGroup.add(knotMesh);

    // 2. Floating 3D Geometric Satellites (Respond to scroll)
    const satellites = [];
    const satGeo1 = new THREE.OctahedronGeometry(1.4, 0);
    const satGeo2 = new THREE.IcosahedronGeometry(1.1, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const satPositions = [
      [-11, 6, -5],
      [12, -7, -6],
      [-9, -8, -3],
      [10, 8, -8],
    ];

    satPositions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(idx % 2 === 0 ? satGeo1 : satGeo2, satMat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      stageGroup.add(mesh);
      satellites.push(mesh);
    });

    // 3. Subtle Floating Dust Motes
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 90 : 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xa1a1aa,
      size: 0.11,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(partGeo, partMat);
    stageGroup.add(particles);

    // Scroll & Mouse Tracking
    let scrollY = window.scrollY;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothScroll = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const mobile = window.innerWidth < 768;
      knotMesh.position.x = mobile ? 0 : 7.5;
      knotMesh.scale.setScalar(mobile ? 0.72 : 1);
    };

    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smoothly interpolate scroll & cursor
      smoothScroll += (scrollY - smoothScroll) * 0.06;
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;

      const scrollProgress = smoothScroll * 0.0015;

      // 3D Scroll-Driven Sculpture Rotation & Position Shift
      knotMesh.rotation.x = t * 0.15 + scrollProgress * 1.8;
      knotMesh.rotation.y = t * 0.22 + scrollProgress * 2.4;
      knotMesh.position.y = Math.sin(scrollProgress) * 3.5;

      // Orbit satellites based on scroll + time
      satellites.forEach((sat, i) => {
        sat.rotation.x = t * 0.3 + i + scrollProgress * 2;
        sat.rotation.y = t * 0.25 + scrollProgress * 1.5;
        sat.position.y += Math.sin(t + i) * 0.005;
      });

      // Stage parallax from cursor & scroll
      stageGroup.rotation.y = smoothMouseX * 0.22 + Math.sin(scrollProgress * 0.5) * 0.25;
      stageGroup.rotation.x = -smoothMouseY * 0.16;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      satGeo1.dispose();
      satGeo2.dispose();
      satMat.dispose();
      partGeo.dispose();
      partMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
