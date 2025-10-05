import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../types/exoplanet';

interface InteractivePlanetProps {
  planet: PlanetData;
  distance: number;
  speed: number;
  orbitActive: boolean;
  onSelect: (planet: PlanetData) => void;
}

export function InteractivePlanet({ planet, distance, speed, orbitActive, onSelect }: InteractivePlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const scaledDistance = Math.max(5, distance * 8);
  const scaledSize = Math.max(0.3, planet.koi_prad * 0.4);
  const orbitalSpeed = orbitActive ? speed * 0.01 : 0;

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitalSpeed;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1;
      glowRef.current.scale.setScalar(pulse);
      glowRef.current.material.opacity = hovered ? 0.5 : 0.25;
    }
  });

  const getPlanetColor = () => {
    if (planet.texture) return planet.texture;
    if (planet.koi_teq > 1000) return '#FF4500';
    if (planet.koi_teq > 500) return '#FFA500';
    if (planet.koi_teq > 200) return '#4169E1';
    return '#4682B4';
  };

  return (
    <group ref={orbitRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[scaledDistance, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3B82F6" opacity={0.15} transparent />
      </mesh>

      <group position={[scaledDistance, 0, 0]}>
        <mesh
          ref={planetRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect(planet)}
        >
          <sphereGeometry args={[scaledSize, 32, 32]} />
          <meshStandardMaterial
            color={getPlanetColor()}
            emissive={getPlanetColor()}
            emissiveIntensity={0.2}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        <mesh ref={glowRef}>
          <sphereGeometry args={[scaledSize * 1.3, 32, 32]} />
          <meshBasicMaterial
            color={getPlanetColor()}
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>

        {hovered && (
          <Html distanceFactor={20}>
            <div className="bg-black/80 backdrop-blur-sm border border-blue-400/50 rounded-lg px-3 py-2 pointer-events-none">
              <p className="text-white text-sm font-semibold whitespace-nowrap">
                {planet.name}
              </p>
              <p className="text-blue-300 text-xs whitespace-nowrap">
                {planet.koi_prad.toFixed(2)} Earth Radii
              </p>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
