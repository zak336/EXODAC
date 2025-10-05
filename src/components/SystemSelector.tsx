import { Globe } from 'lucide-react';
import { StarSystem } from '../types/exoplanet';
import { starSystemConfigs } from '../data/starSystems';

interface SystemSelectorProps {
  currentSystem: StarSystem;
  onSystemChange: (system: StarSystem) => void;
}

export function SystemSelector({ currentSystem, onSystemChange }: SystemSelectorProps) {
  const systems: StarSystem[] = ['kepler', 'trappist', 'solar'];

  return (
    <div className="fixed top-8 right-8 z-20">
      <div className="glass-panel rounded-xl p-4 glow-blue">
        <div className="flex items-center space-x-3 mb-3">
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">Star System</span>
        </div>

        <div className="space-y-2">
          {systems.map((system) => (
            <button
              key={system}
              onClick={() => onSystemChange(system)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                         ${currentSystem === system
                           ? 'bg-blue-500 text-white glow-blue'
                           : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-blue-300'}
                         transform hover:scale-105`}
            >
              {starSystemConfigs[system].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
