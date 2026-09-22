import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural soft cloud texture generator via HTML5 Canvas
function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.3, 'rgba(240, 245, 255, 0.45)');
  grad.addColorStop(0.7, 'rgba(220, 230, 255, 0.15)');
  grad.addColorStop(1, 'rgba(200, 220, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const CloudTunnel = ({ scrollProgress = 0 }) => {
  const groupRef = useRef(null);
  const cloudTexture = useMemo(() => createCloudTexture(), []);

  // Generate cloud puff positions along the path (Z between 2 and -20)
  const clouds = useMemo(() => {
    const arr = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const z = 3 - (i / count) * 26; // spans from z=+3 down to z=-23
      const angle = (i * 0.7);
      const radius = 1.2 + Math.random() * 2.5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
      const y = Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 1.2;
      const scale = 2.5 + Math.random() * 4.0;
      const rotationSpeed = (Math.random() - 0.5) * 0.003;
      arr.push({ x, y, z, scale, rotationSpeed, initialRot: Math.random() * Math.PI * 2 });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.userData.rotationSpeed) {
        child.rotation.z += child.userData.rotationSpeed;
      }
    }
  });

  return (
    <group ref={groupRef} name="CloudTunnel">
      {clouds.map((c, i) => (
        <mesh
          key={i}
          position={[c.x, c.y, c.z]}
          rotation={[0, 0, c.initialRot]}
          userData={{ rotationSpeed: c.rotationSpeed }}
        >
          <planeGeometry args={[c.scale, c.scale]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.NormalBlending}
            roughness={1}
            metalness={0}
            color={
              // Shift from dark blue-grey at start to golden cloud mist towards dreamscape
              c.z > -5 ? '#7b89a8' : c.z > -14 ? '#e0d8cc' : '#ffd199'
            }
          />
        </mesh>
      ))}
    </group>
  );
};
