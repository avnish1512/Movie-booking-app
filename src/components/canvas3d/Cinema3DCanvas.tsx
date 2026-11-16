import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { CinemaAuditorium } from './CinemaAuditorium';
import { CameraController } from './CameraController';
import { SeatData, ViewMode } from '../../types';

interface Cinema3DCanvasProps {
  seats: SeatData[];
  selectedSeat: SeatData | null;
  viewMode: ViewMode;
  onSeatSelect: (seat: SeatData) => void;
}

export const Cinema3DCanvas: React.FC<Cinema3DCanvasProps> = ({
  seats,
  selectedSeat,
  viewMode,
  onSeatSelect,
}) => {
  const [interactiveLook, setInteractiveLook] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (viewMode !== 'view3d') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [viewMode]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || viewMode !== 'view3d') return;
    const deltaX = (e.clientX - dragStart.x) / 300;
    const deltaY = (e.clientY - dragStart.y) / 300;

    setInteractiveLook({
      x: Math.max(-1, Math.min(1, deltaX)),
      y: Math.max(-0.6, Math.min(0.6, deltaY)),
    });
  }, [isDragging, dragStart, viewMode]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setInteractiveLook({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 10.5, 4.5], fov: 64, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050608']} />

        {/* Ambient base lighting illuminating chairs in the dark theater */}
        <ambientLight intensity={1.2} color="#ffffff" />

        {/* Overhead Auditorium Light */}
        <directionalLight position={[0, 8, 4]} intensity={1.4} color="#ffffff" />

        {/* Light illuminating the seat backs facing the audience */}
        <directionalLight position={[0, 4, 9]} intensity={1.6} color="#ffffff" />

        {/* Soft Warm Side Wall Lights */}
        <directionalLight position={[-6, 6, 2]} intensity={0.8} color="#ffd8b3" />
        <directionalLight position={[6, 6, 2]} intensity={0.8} color="#ffd8b3" />

        {/* Camera Controller handles view transition & seat POV */}
        <CameraController
          viewMode={viewMode}
          selectedSeat={selectedSeat}
          interactiveLook={interactiveLook}
        />

        {/* Complete 3D Auditorium Environment */}
        <CinemaAuditorium
          seats={seats}
          selectedSeatId={selectedSeat?.id ?? null}
          viewMode={viewMode}
          onSeatSelect={onSeatSelect}
        />
      </Canvas>
    </div>
  );
};
