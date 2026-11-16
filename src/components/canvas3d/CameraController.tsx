import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ViewMode, SeatData } from '../../types';
import { getSeatCameraPosition, ROW_INDEX_MAP } from '../../utils/seating3D';

interface CameraControllerProps {
  viewMode: ViewMode;
  selectedSeat: SeatData | null;
  interactiveLook?: { x: number; y: number };
}

export const CameraController: React.FC<CameraControllerProps> = ({
  viewMode,
  selectedSeat,
  interactiveLook = { x: 0, y: 0 }
}) => {
  const { camera } = useThree();

  const targetCamPos = useRef(new THREE.Vector3(0, 10.5, 4.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 1.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 1.0));

  useEffect(() => {
    if (viewMode === 'map') {
      // Overhead overview of the stadium seating
      targetCamPos.current.set(0, 10.5, 4.5);
      targetLookAt.current.set(0, 1.2, 1.0);
    } else if (viewMode === 'transitioning') {
      // Mid-transition overhead view: camera reveals the stadium seats and glowing selected seat (matches reference video frame_003)
      if (selectedSeat) {
        const [x, , z] = getSeatCameraPosition(selectedSeat.row, selectedSeat.number);
        targetCamPos.current.set(x * 0.4, 8.0, z + 3.8);
        targetLookAt.current.set(x, 1.2, z);
      } else {
        targetCamPos.current.set(0, 8.5, 3.5);
        targetLookAt.current.set(0, 1.2, 0);
      }
    } else if (viewMode === 'view3d') {
      // First-person seat POV (matches reference video frame_004, frame_013, frame_020)
      if (selectedSeat) {
        const [x, y, z] = getSeatCameraPosition(selectedSeat.row, selectedSeat.number);
        targetCamPos.current.set(x, y, z);

        // Unified slope formula so row in front chairs perfectly frame the bottom across all tiers
        const rowIndex = ROW_INDEX_MAP[selectedSeat.row] ?? 4;
        const targetY = 0.85 + (rowIndex / 8) * 0.35;

        targetLookAt.current.set(x * 0.15, targetY, -7.8);
      } else {
        const [x, y, z] = getSeatCameraPosition('E', 7);
        targetCamPos.current.set(x, y, z);
        targetLookAt.current.set(0, 1.05, -7.8);
      }
    }
  }, [viewMode, selectedSeat]);

  useFrame((_, delta) => {
    // Smooth adaptive interpolation factor
    const factor = Math.min(delta * 4.8, 0.20);

    const lookOffset = new THREE.Vector3(0, 0, 0);
    if (viewMode === 'view3d') {
      lookOffset.x = -interactiveLook.x * 1.5;
      lookOffset.y = -interactiveLook.y * 1.0;
    }

    camera.position.lerp(targetCamPos.current, factor);

    const desiredLook = targetLookAt.current.clone().add(lookOffset);
    currentLookAt.current.lerp(desiredLook, factor);

    camera.lookAt(currentLookAt.current);
  });

  return null;
};
