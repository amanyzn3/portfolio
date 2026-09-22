import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CameraRig } from './CameraRig';
import { CloudTunnel } from './CloudTunnel';
import { SurrealLandscape } from './SurrealLandscape';

// Dynamic lighting & atmospheric fog controller linked to scroll progress
function DynamicAtmosphere({ scrollProgress = 0 }) {
  const fogRef = useRef(null);
  const ambientRef = useRef(null);
  const sunLightRef = useRef(null);

  // Color targets
  const darkFogColor = useRef(new THREE.Color('#08080a'));
  const dreamFogColor = useRef(new THREE.Color('#1f1929'));
  const sunsetFogColor = useRef(new THREE.Color('#38222c'));

  const darkAmbientColor = useRef(new THREE.Color('#1c2033'));
  const dreamAmbientColor = useRef(new THREE.Color('#e0a96d'));

  useFrame(() => {
    if (!fogRef.current || !ambientRef.current) return;

    // Phase 1 (0 to 0.3): Dark moody void
    // Phase 2 (0.3 to 0.6): Cloud dive transition into warm dreamscape
    // Phase 3 & 4 (0.6 to 1.0): Deep surreal sunset
    let targetFog = darkFogColor.current;
    let targetAmbient = darkAmbientColor.current;
    let fogNear = 2;
    let fogFar = 22;

    if (scrollProgress > 0.25 && scrollProgress <= 0.65) {
      const t = (scrollProgress - 0.25) / 0.4;
      targetFog = darkFogColor.current.clone().lerp(dreamFogColor.current, t);
      targetAmbient = darkAmbientColor.current.clone().lerp(dreamAmbientColor.current, t);
      fogNear = 3 + t * 4;
      fogFar = 22 + t * 35;
    } else if (scrollProgress > 0.65) {
      const t = (scrollProgress - 0.65) / 0.35;
      targetFog = dreamFogColor.current.clone().lerp(sunsetFogColor.current, t);
      targetAmbient = dreamAmbientColor.current;
      fogNear = 7;
      fogFar = 55;
    }

    fogRef.current.color.lerp(targetFog, 0.08);
    fogRef.current.near = THREE.MathUtils.lerp(fogRef.current.near, fogNear, 0.08);
    fogRef.current.far = THREE.MathUtils.lerp(fogRef.current.far, fogFar, 0.08);

    ambientRef.current.color.lerp(targetAmbient, 0.08);
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={['#08080a', 2, 22]} />
      <ambientLight ref={ambientRef} intensity={0.8} />
      <directionalLight
        ref={sunLightRef}
        position={[15, 25, -20]}
        intensity={1.8}
        color="#fed7aa"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Secondary accent rim light */}
      <directionalLight position={[-15, 12, 10]} intensity={0.4} color="#818cf8" />
    </>
  );
}

export const CanvasScene = ({ scrollProgress = 0, onSelectProject }) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 48, near: 0.1, far: 150 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
        className="pointer-events-auto"
      >
        {/* Dynamic Fog & Lighting */}
        <DynamicAtmosphere scrollProgress={scrollProgress} />

        {/* 3D Spline Camera Rig */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* Procedural Cloud Tunnel */}
        <CloudTunnel scrollProgress={scrollProgress} />

        {/* Surreal Landscape, Dalí Clock, Wanderer, Milestones, and Projects */}
        <SurrealLandscape
          scrollProgress={scrollProgress}
          onSelectProject={onSelectProject}
        />

        {/* Post-Processing Effects (Bloom & Cinematic Vignette) */}
        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom
            luminanceThreshold={0.55}
            luminanceSmoothing={0.3}
            intensity={1.1}
            mipmapBlur
          />
          <Vignette darkness={0.65} offset={0.25} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
