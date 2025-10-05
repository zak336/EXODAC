import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StarField } from './StarField';
import { InteractivePlanet } from './InteractivePlanet';
import { ExoplanetSystem, PlanetData } from '../types/exoplanet';

interface DynamicStarSystemProps {
  system: ExoplanetSystem;
  orbitAnimationActive: boolean;
  onPlanetSelect: (planet: PlanetData) => void;
  theme: 'light' | 'dark';
}

export function DynamicStarSystem({
  system,
  orbitAnimationActive,
  onPlanetSelect,
  theme
}: DynamicStarSystemProps) {
  const starSize = Math.max(1.5, system.star.radius * 1.5);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 25, 50], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[theme === 'dark' ? '#000510' : '#1a1a2e']} />

        <Suspense fallback={null}>
          <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />

          <pointLight
            position={[0, 0, 0]}
            intensity={2.5}
            color={system.star.color}
            distance={150}
            decay={2}
          />

          <spotLight
            position={[0, 20, 0]}
            angle={Math.PI / 4}
            penumbra={0.5}
            intensity={0.5}
            color={system.star.color}
          />

          {theme === 'dark' && <StarField />}

          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[starSize, 64, 64]} />
            <meshBasicMaterial color={system.star.color} />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[starSize * 1.4, 64, 64]} />
            <meshBasicMaterial
              color={system.star.color}
              transparent
              opacity={0.3}
            />
          </mesh>

          {system.planets.map((planet, index) => (
            <InteractivePlanet
              key={planet.id}
              planet={planet}
              distance={planet.koi_sma}
              speed={1 / (planet.koi_sma * 10)}
              orbitActive={orbitAnimationActive}
              onSelect={onPlanetSelect}
            />
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={100}
            autoRotate={!orbitAnimationActive}
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
