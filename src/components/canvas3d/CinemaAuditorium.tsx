import React, { useMemo } from 'react';
import * as THREE from 'three';
import { SeatData, CameraPerspective } from '../../types';
import { ROWS } from '../../data/cinemaData';
import { AuditoriumSeat } from './AuditoriumSeat';
import { CinemaScreen } from './CinemaScreen';
import { getSeat3DPosition } from '../../utils/seating3D';

interface CinemaAuditoriumProps {
  seats: SeatData[];
  selectedSeatId: string | null;
  viewMode: 'map' | 'transitioning' | 'view3d' | 'booking';
  cameraPerspective?: CameraPerspective;
  onSeatSelect: (seat: SeatData) => void;
}

export const CinemaAuditorium: React.FC<CinemaAuditoriumProps> = ({
  seats,
  selectedSeatId,
  viewMode,
  cameraPerspective = 'pov',
  onSeatSelect,
}) => {
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0d0e12'),
      roughness: 0.85,
      metalness: 0.1,
    });
  }, []);

  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#07080b'),
      roughness: 0.9,
      metalness: 0.05,
    });
  }, []);

  const aisleLightMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#3ddc97'),
    });
  }, []);

  return (
    <group>
      {/* Curved Screen */}
      <CinemaScreen />

      {/* Auditorium Floor Risers / Tier Steps */}
      {ROWS.map((row, idx) => {
        const y = idx * 0.40 - 0.20;
        const z = -2.8 + idx * 1.40;
        return (
          <group key={`tier-${row}`}>
            {/* Step platform for this row */}
            <mesh position={[0, y, z]} material={floorMaterial} receiveShadow>
              <boxGeometry args={[13.0, 0.40, 1.40]} />
            </mesh>

            {/* Aisle guide lights on the step edges */}
            <mesh position={[-2.35, y + 0.20, z + 0.69]} material={aisleLightMaterial}>
              <boxGeometry args={[0.04, 0.02, 0.1]} />
            </mesh>
            <mesh position={[2.35, y + 0.20, z + 0.69]} material={aisleLightMaterial}>
              <boxGeometry args={[0.04, 0.02, 0.1]} />
            </mesh>
          </group>
        );
      })}

      {/* Front Floor / Stage area between Row A and Screen */}
      <mesh position={[0, -0.2, -5.5]} material={floorMaterial} receiveShadow>
        <boxGeometry args={[15.0, 0.4, 5.0]} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4.5, 10.5]} material={wallMaterial}>
        <boxGeometry args={[15.0, 10.0, 0.5]} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-7.0, 4.5, 0]} material={wallMaterial}>
        <boxGeometry args={[0.5, 10.0, 22.0]} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[7.0, 4.5, 0]} material={wallMaterial}>
        <boxGeometry args={[0.5, 10.0, 22.0]} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 9.5, 0]} material={wallMaterial}>
        <boxGeometry args={[15.0, 0.5, 22.0]} />
      </mesh>

      {/* Subtle warm wall sconce lights */}
      {[-2, 2, 6].map((zPos, i) => (
        <group key={`sconce-${i}`}>
          <pointLight position={[-6.7, 4.5, zPos]} color="#ff9944" intensity={0.5} distance={7} decay={2} />
          <pointLight position={[6.7, 4.5, zPos]} color="#ff9944" intensity={0.5} distance={7} decay={2} />
        </group>
      ))}

      {/* Render all auditorium seats */}
      {seats.map((seat) => {
        const position = getSeat3DPosition(seat.row, seat.number);
        const isSelected = seat.id === selectedSeatId;
        const isTaken = seat.status === 'taken';
        const isRecliner = seat.type === 'recliner';

        const hideBackrest = isSelected && viewMode === 'view3d' && cameraPerspective === 'pov';

        return (
          <AuditoriumSeat
            key={seat.id}
            position={position}
            isSelected={isSelected}
            isTaken={isTaken}
            isRecliner={isRecliner}
            hideBackrest={hideBackrest}
            onClick={() => {
              if (!isTaken) {
                onSeatSelect(seat);
              }
            }}
          />
        );
      })}
    </group>
  );
};
