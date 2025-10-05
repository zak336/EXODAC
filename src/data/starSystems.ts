import { StarSystem } from '../types/exoplanet';

export interface SystemConfig {
  name: string;
  star: {
    color: string;
    size: number;
    intensity: number;
  };
  planets: {
    color: string;
    size: number;
    distance: number;
    speed: number;
    glowColor: string;
  }[];
  ambientColor: string;
}

export const starSystemConfigs: Record<StarSystem, SystemConfig> = {
  kepler: {
    name: 'Kepler System',
    star: {
      color: '#FFA500',
      size: 2.5,
      intensity: 2
    },
    planets: [
      { color: '#8B4513', size: 0.4, distance: 8, speed: 0.5, glowColor: '#FF6B35' },
      { color: '#4169E1', size: 0.6, distance: 12, speed: 0.3, glowColor: '#3B82F6' },
      { color: '#32CD32', size: 0.5, distance: 16, speed: 0.2, glowColor: '#10B981' },
      { color: '#FFD700', size: 0.7, distance: 20, speed: 0.15, glowColor: '#FCD34D' }
    ],
    ambientColor: '#FF8C00'
  },
  trappist: {
    name: 'TRAPPIST-1',
    star: {
      color: '#DC143C',
      size: 1.8,
      intensity: 1.5
    },
    planets: [
      { color: '#CD5C5C', size: 0.35, distance: 6, speed: 0.8, glowColor: '#EF4444' },
      { color: '#F08080', size: 0.38, distance: 8, speed: 0.6, glowColor: '#F87171' },
      { color: '#4682B4', size: 0.36, distance: 10, speed: 0.5, glowColor: '#3B82F6' },
      { color: '#5F9EA0', size: 0.37, distance: 12, speed: 0.4, glowColor: '#06B6D4' },
      { color: '#8B4513', size: 0.34, distance: 14, speed: 0.35, glowColor: '#F59E0B' },
      { color: '#A0522D', size: 0.33, distance: 16, speed: 0.3, glowColor: '#D97706' },
      { color: '#BC8F8F', size: 0.32, distance: 18, speed: 0.25, glowColor: '#FB923C' }
    ],
    ambientColor: '#DC143C'
  },
  solar: {
    name: 'Solar System',
    star: {
      color: '#FDB813',
      size: 3,
      intensity: 2.5
    },
    planets: [
      { color: '#B87333', size: 0.35, distance: 7, speed: 0.7, glowColor: '#F59E0B' },
      { color: '#FFA500', size: 0.55, distance: 10, speed: 0.5, glowColor: '#FBBF24' },
      { color: '#4169E1', size: 0.6, distance: 13, speed: 0.4, glowColor: '#3B82F6' },
      { color: '#DC143C', size: 0.5, distance: 16, speed: 0.35, glowColor: '#EF4444' },
      { color: '#DEB887', size: 1.2, distance: 22, speed: 0.2, glowColor: '#F59E0B' },
      { color: '#F4A460', size: 1, distance: 28, speed: 0.15, glowColor: '#FBBF24' }
    ],
    ambientColor: '#FDB813'
  }
};
