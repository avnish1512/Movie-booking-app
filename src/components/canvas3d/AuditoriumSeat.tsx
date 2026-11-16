import React, { useMemo } from 'react';
import * as THREE from 'three';

interface AuditoriumSeatProps {
  position: [number, number, number];
  isSelected: boolean;
  isTaken: boolean;
  isRecliner: boolean;
  hideBackrest?: boolean;
  onClick?: () => void;
}

export const AuditoriumSeat: React.FC<AuditoriumSeatProps> = ({
  position,
  isSelected,
  isRecliner,
  hideBackrest = false,
  onClick
}) => {
  const seatMaterial = useMemo(() => {
    // Selected seat glows vibrant mint green
    if (isSelected) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3ddc97'),
        emissive: new THREE.Color('#3ddc97'),
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.1,
      });
    }

    // Recliner rows (H & I) - luxury burgundy velvet
    if (isRecliner) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8b293d'),
        emissive: new THREE.Color('#4d101e'),
        emissiveIntensity: 0.45,
        roughness: 0.55,
        metalness: 0.05,
      });
    }

    // Standard rows (A to G) - classic cinema red velvet (all chairs in 3D are red like real cinema)
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c8162b'),
      emissive: new THREE.Color('#6e0c18'),
      emissiveIntensity: 0.45,
      roughness: 0.55,
      metalness: 0.05,
    });
  }, [isSelected, isRecliner]);

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121318'),
      roughness: 0.8,
      metalness: 0.2,
    });
  }, []);

  const armrestMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1b22'),
      roughness: 0.45,
      metalness: 0.2,
    });
  }, []);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      {/* Plush Backrest (hidden only for currently occupied seat to prevent camera clipping) */}
      {!hideBackrest && (
        <>
          <mesh position={[0, 0.74, -0.15]} rotation={[-0.05, 0, 0]} material={seatMaterial} castShadow receiveShadow>
            <boxGeometry args={[0.56, 0.65, 0.12]} />
          </mesh>

          {/* Rounded Headrest */}
          <mesh position={[0, 1.12, -0.18]} rotation={[-0.05, 0, 0]} material={seatMaterial} castShadow>
            <boxGeometry args={[0.50, 0.22, 0.11]} />
          </mesh>
        </>
      )}

      {/* Seat Cushion */}
      <mesh position={[0, 0.42, 0.08]} material={seatMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.14, 0.46]} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-0.30, 0.58, 0.04]} material={armrestMaterial} castShadow>
        <boxGeometry args={[0.07, 0.08, 0.44]} />
      </mesh>
      {/* Left Armrest Leg */}
      <mesh position={[-0.30, 0.29, 0.04]} material={frameMaterial}>
        <boxGeometry args={[0.04, 0.54, 0.06]} />
      </mesh>

      {/* Right Armrest */}
      <mesh position={[0.30, 0.58, 0.04]} material={armrestMaterial} castShadow>
        <boxGeometry args={[0.07, 0.08, 0.44]} />
      </mesh>
      {/* Right Armrest Leg */}
      <mesh position={[0.30, 0.29, 0.04]} material={frameMaterial}>
        <boxGeometry args={[0.04, 0.54, 0.06]} />
      </mesh>

      {/* Center Pedestal Leg */}
      <mesh position={[0, 0.20, -0.02]} material={frameMaterial}>
        <boxGeometry args={[0.10, 0.40, 0.24]} />
      </mesh>

      {/* Recliner Footrest */}
      {isRecliner && (
        <mesh position={[0, 0.26, 0.36]} material={seatMaterial} castShadow>
          <boxGeometry args={[0.52, 0.08, 0.14]} />
        </mesh>
      )}
    </group>
  );
};
