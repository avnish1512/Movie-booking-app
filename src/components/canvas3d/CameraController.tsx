import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ViewMode, SeatData, CameraPerspective } from '../../types';
import { getSeatCameraPosition, getSeatAuditoriumCameraPosition, ROW_INDEX_MAP } from '../../utils/seating3D';

interface CameraControllerProps {
  viewMode: ViewMode;
  selectedSeat: SeatData | null;
  cameraPerspective?: CameraPerspective;
  interactiveLook?: { x: number; y: number };
}

export const CameraController: React.FC<CameraControllerProps> = ({
  viewMode,
  selectedSeat,
  cameraPerspective = 'pov',
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
      // Stage 1 Transition: Auditorium view behind the glowing selected seat (matches reference video f_0043.jpg and f_0076.jpg)
      if (selectedSeat) {
        const [x, y, z] = getSeatAuditoriumCameraPosition(selectedSeat.row, selectedSeat.number);
        targetCamPos.current.set(x, y, z);
        targetLookAt.current.set(x * 0.15, 1.25, -7.8);
      } else {
        targetCamPos.current.set(0, 4.5, 6.0);
        targetLookAt.current.set(0, 1.5, -7.8);
      }
    } else if (viewMode === 'view3d') {
      if (selectedSeat) {
        if (cameraPerspective === 'auditorium') {
          // Auditorium view from behind the seat: shows the green chair in the foreground and all cascading rows
          const [x, y, z] = getSeatAuditoriumCameraPosition(selectedSeat.row, selectedSeat.number);
          targetCamPos.current.set(x, y, z);
          targetLookAt.current.set(x * 0.15, 1.25, -7.8);
        } else {
          // Seated POV: first-person sightline sitting in the chair (matches reference video f_0046.jpg and f_0080.jpg)
          const [x, y, z] = getSeatCameraPosition(selectedSeat.row, selectedSeat.number);
          targetCamPos.current.set(x, y, z);

          const rowIndex = ROW_INDEX_MAP[selectedSeat.row] ?? 4;
          const targetY = 0.85 + (rowIndex / 8) * 0.35;
          targetLookAt.current.set(x * 0.15, targetY, -7.8);
        }
      } else {
        const [x, y, z] = getSeatCameraPosition('E', 7);
        targetCamPos.current.set(x, y, z);
        targetLookAt.current.set(0, 1.05, -7.8);
      }
    }
  }, [viewMode, selectedSeat, cameraPerspective]);

  useFrame((_, delta) => {
    // Smooth adaptive interpolation factor (approx 60fps)
    const factor = Math.min(delta * 4.6, 0.22);

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

