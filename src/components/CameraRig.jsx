import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CameraRig = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 1.5, 6));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.3, 0));

  // 1. Camera Position Spline Curve (Smooth ascent alongside the Celestial Staircase)
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.5, 6),         // 0.00: Standing before the threshold door
      new THREE.Vector3(0, 1.35, 2),        // 0.15: Approaching the doorway
      new THREE.Vector3(0, 1.15, -2),       // 0.28: Gliding through the portal into cloud tunnel
      new THREE.Vector3(0.3, 1.6, -10),     // 0.38: Rising through the dream mist
      new THREE.Vector3(0.5, 2.2, -18),     // 0.45: Breaking out above clouds, staircase reveals
      new THREE.Vector3(0.6, 2.8, -26),     // 0.52: Tracking Platform 01 (B.Sc. Computer Science)
      new THREE.Vector3(1.8, 4.1, -31),     // 0.60: Tracking Platform 02 (SyncHub Platform & Copilot)
      new THREE.Vector3(1.3, 5.6, -36),     // 0.70: Tracking Platform 03 (Power BI Analytics)
      new THREE.Vector3(-0.6, 7.1, -41),    // 0.80: Tracking Platform 04 (NinoCare Healthcare AI)
      new THREE.Vector3(-1.7, 8.4, -46),    // 0.88: Tracking Platform 05 (SyncHub Habits Arena)
      new THREE.Vector3(-0.9, 9.8, -51),    // 0.95: Tracking Platform 06 (Python Elite Certification)
      new THREE.Vector3(-0.1, 10.8, -55),   // 1.00: Arriving at the Summit & Infinite Horizon
    ]);
  }, []);

  // 2. Camera Target (LookAt) Spline Curve (Clean focus on each active step and card)
  const targetPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.3, 0),         // 0.00: Looking at the door center
      new THREE.Vector3(0, 1.2, -3),        // 0.15: Looking into glowing aperture
      new THREE.Vector3(0, 1.2, -8),        // 0.28: Looking forward into the cloud tunnel
      new THREE.Vector3(0.8, 1.5, -20),     // 0.38: Looking toward the emerging mountain landscape
      new THREE.Vector3(1.5, 2.0, -28),     // 0.45: Looking ahead toward the ascending staircase
      new THREE.Vector3(2.2, 2.8, -32.5),   // 0.52: Focusing on Platform 01 & Card (Education)
      new THREE.Vector3(3.8, 4.2, -37.5),   // 0.60: Focusing on Platform 02 & Card (SyncHub)
      new THREE.Vector3(2.8, 5.7, -42.5),   // 0.70: Focusing on Platform 03 & Card (Power BI)
      new THREE.Vector3(0.8, 7.2, -47.5),   // 0.80: Focusing on Platform 04 & Card (NinoCare)
      new THREE.Vector3(-0.4, 8.5, -52.5),  // 0.88: Focusing on Platform 05 & Card (Habits Hub)
      new THREE.Vector3(0.2, 9.9, -57.5),   // 0.95: Focusing on Platform 06 & Card (Python IIT)
      new THREE.Vector3(0.8, 10.6, -65.0),  // 1.00: Gazing at Summit & Twilight Horizon
    ]);
  }, []);

  useFrame((state, delta) => {
    // Clamp normalized progress between 0 and 1
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Sample target position along splines
    const targetCamPos = cameraPath.getPointAt(p);
    const targetCamLook = targetPath.getPointAt(p);

    // Smooth lerping with delta compensation for buttery 60+ FPS motion
    const lerpFactor = Math.min(1, delta * 3.5);
    currentPos.current.lerp(targetCamPos, lerpFactor);
    currentLookAt.current.lerp(targetCamLook, lerpFactor);

    // Subtle breathing / cursor parallax when idle
    const pointer = state.pointer;
    const parallaxX = pointer.x * 0.15;
    const parallaxY = pointer.y * 0.1;

    camera.position.set(
      currentPos.current.x + parallaxX,
      currentPos.current.y + parallaxY,
      currentPos.current.z
    );
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
