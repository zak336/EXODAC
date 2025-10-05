import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StarField } from './StarField';
import { Planet } from './Planet';
import { StarSystem } from '../types/exoplanet';
import { starSystemConfigs } from '../data/starSystems';

interface SpaceSceneProps {
  currentSystem: StarSystem;
  isLoading: boolean;
  detectionResult?: 'detected' | 'non-exoplanet' | null;
}

export function SpaceScene({ currentSystem, isLoading, detectionResult }: SpaceSceneProps) {
  const config = starSystemConfigs[currentSystem];

  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 20, 40], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000510']} />

        <ambientLight intensity={0.3} color={config.ambientColor} />
        <pointLight
          position={[0, 0, 0]}
          intensity={config.star.intensity}
          color={config.star.color}
          distance={100}
          decay={2}
        />

        <StarField />

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[config.star.size, 32, 32]} />
          <meshBasicMaterial color={config.star.color} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[config.star.size * 1.5, 32, 32]} />
          <meshBasicMaterial
            color={config.star.color}
            transparent
            opacity={0.3}
          />
        </mesh>

        {config.planets.map((planet, index) => (
          <Planet
            key={index}
            color={planet.color}
            size={planet.size}
            distance={planet.distance}
            speed={isLoading ? planet.speed * 3 : planet.speed}
            glowColor={planet.glowColor}
            detectionResult={index === 1 ? detectionResult : null}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={15}
          maxDistance={80}
          autoRotate={!isLoading}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
