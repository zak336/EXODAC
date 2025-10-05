import { Search, Filter, Globe2, Play, Pause, Moon, Sun } from 'lucide-react';
import { FilterType, ThemeMode, ExoplanetSystem } from '../types/exoplanet';

interface SidebarProps {
  systems: ExoplanetSystem[];
  selectedSystemId: string | null;
  onSystemSelect: (systemId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: FilterType;
  onFilterChange: (filter: FilterType) => void;
  discoveryMethods: string[];
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  orbitAnimationActive: boolean;
  onToggleAnimation: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export function Sidebar({
  systems,
  selectedSystemId,
  onSystemSelect,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  discoveryMethods,
  selectedMethod,
  onMethodChange,
  orbitAnimationActive,
  onToggleAnimation,
  theme,
  onThemeToggle
}: SidebarProps) {
  const bgClass = theme === 'dark' ? 'bg-black/70' : 'bg-white/90';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderClass = theme === 'dark' ? 'border-blue-500/30' : 'border-gray-300';
  const inputBgClass = theme === 'dark' ? 'bg-black/40' : 'bg-gray-100';

  const planetTypeFilters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'terrestrial', label: 'Terrestrial' },
    { value: 'super-earth', label: 'Super-Earth' },
    { value: 'neptune', label: 'Neptune-like' },
    { value: 'gas-giant', label: 'Gas Giant' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-80 ${bgClass} backdrop-blur-xl border-r ${borderClass} shadow-2xl z-20 overflow-hidden flex flex-col`}>
      <div className="p-6 border-b border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-xl font-bold ${textClass}`}>
            Exoplanet Systems
          </h1>
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg ${inputBgClass} hover:bg-blue-500/20 transition-colors`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>

        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${secondaryTextClass}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or KOI..."
            className={`w-full pl-10 pr-4 py-2 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          />
        </div>
      </div>

      <div className="p-4 border-b border-blue-500/20">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-4 h-4 text-blue-400" />
          <span className={`text-sm font-semibold ${textClass}`}>Planet Type</span>
        </div>
        <div className="space-y-2">
          {planetTypeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === filter.value
                  ? 'bg-blue-500 text-white'
                  : `${inputBgClass} ${secondaryTextClass} hover:bg-blue-500/20`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-blue-500/20">
        <div className="flex items-center space-x-2 mb-3">
          <Globe2 className="w-4 h-4 text-blue-400" />
          <span className={`text-sm font-semibold ${textClass}`}>Discovery Method</span>
        </div>
        <select
          value={selectedMethod}
          onChange={(e) => onMethodChange(e.target.value)}
          className={`w-full px-3 py-2 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
        >
          <option value="all">All Methods</option>
          {discoveryMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 border-b border-blue-500/20">
        <button
          onClick={onToggleAnimation}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
            orbitAnimationActive
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          {orbitAnimationActive ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause Orbits</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Play Orbits</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {systems.map((system) => (
            <button
              key={system.id}
              onClick={() => onSystemSelect(system.id)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedSystemId === system.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : `${inputBgClass} ${textClass} hover:bg-blue-500/20`
              }`}
            >
              <div className="font-semibold text-sm mb-1">{system.name}</div>
              <div className={`text-xs ${selectedSystemId === system.id ? 'text-blue-100' : secondaryTextClass}`}>
                {system.planets.length} planet{system.planets.length !== 1 ? 's' : ''}
              </div>
              <div className={`text-xs mt-1 ${selectedSystemId === system.id ? 'text-blue-200' : secondaryTextClass}`}>
                {system.star.temperature}K • {system.star.spectralType}-type
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
