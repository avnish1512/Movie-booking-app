import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface CinemaScreenProps {
  movieStillUrl?: string;
  movieVideoUrl?: string;
}

export const CinemaScreen: React.FC<CinemaScreenProps> = ({
  movieStillUrl = '/assets/movie-still.jpg',
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Parabolic curved IMAX screen
  const geometry = useMemo(() => {
    const width = 14.5;
    const height = 5.8;
    const segmentsX = 40;
    const segmentsY = 1;
    const geom = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    const pos = geom.attributes.position;
    const halfWidth = width / 2;
    const curveDepth = 1.25;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const nx = x / halfWidth; // -1 to 1
      const zOffset = (nx * nx) * curveDepth;
      pos.setZ(i, zOffset);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const screenMaterial = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const stillTex = loader.load(movieStillUrl);
    stillTex.colorSpace = THREE.SRGBColorSpace;
    stillTex.generateMipmaps = true;

    return new THREE.MeshBasicMaterial({
      map: stillTex,
      side: THREE.FrontSide,
    });
  }, [movieStillUrl]);

  return (
    <group position={[0, 4.15, -7.8]}>
      {/* Curved Screen Display */}
      <mesh ref={meshRef} geometry={geometry} material={screenMaterial} />

      {/* Screen Sleek Matte Black Bezel / Frame */}
      <mesh position={[0, 0, -0.04]} geometry={geometry}>
        <meshBasicMaterial color="#050507" side={THREE.BackSide} />
      </mesh>

      {/* Warm Ambient Projector Light casting on auditorium */}
      <pointLight position={[0, 0, 1.2]} color="#deb887" intensity={2.5} distance={16} decay={1.8} />
      <spotLight
        position={[0, 3.0, 0]}
        target-position={[0, 0, 10]}
        color="#d8aa7a"
        intensity={2.2}
        distance={20}
        angle={0.8}
        penumbra={0.9}
        decay={1.8}
      />
    </group>
  );
};
