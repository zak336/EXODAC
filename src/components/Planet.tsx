import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  color: string;
  size: number;
  distance: number;
  speed: number;
  glowColor: string;
  detectionResult?: 'detected' | 'non-exoplanet' | null;
}

export function Planet({ color, size, distance, speed, glowColor, detectionResult }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += speed * 0.01;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.02;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  const finalColor = detectionResult === 'detected'
    ? '#FCD34D'
    : detectionResult === 'non-exoplanet'
    ? '#3B82F6'
    : color;

  const finalGlow = detectionResult === 'detected'
    ? '#FCD34D'
    : detectionResult === 'non-exoplanet'
    ? '#3B82F6'
    : glowColor;

  return (
    <group ref={orbitRef}>
      <mesh position={[distance, 0, 0]}>
        <torusGeometry args={[distance, 0.02, 16, 100]} />
        <meshBasicMaterial color={glowColor} opacity={0.2} transparent />
      </mesh>

      <group position={[distance, 0, 0]}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={finalColor}
            emissive={finalColor}
            emissiveIntensity={0.3}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.2, 32, 32]} />
          <meshBasicMaterial
            color={finalGlow}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}
