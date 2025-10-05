import { useState, useEffect, useMemo } from 'react';
import { DynamicStarSystem } from './components/DynamicStarSystem';
import { Sidebar } from './components/Sidebar';
import { PlanetDetailModal } from './components/PlanetDetailModal';
import { LoadingScreen } from './components/LoadingScreen';
import { ExoplanetSystem, PlanetData, FilterType, ThemeMode } from './types/exoplanet';
import { fetchExoplanetSystems } from './services/exoplanetApi';

function App() {
  const [systems, setSystems] = useState<ExoplanetSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [orbitAnimationActive, setOrbitAnimationActive] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    loadSystems();
  }, []);

  const loadSystems = async () => {
    setLoading(true);
    try {
      const data = await fetchExoplanetSystems();
      setSystems(data);
      if (data.length > 0) {
        setSelectedSystemId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load systems:', error);
    } finally {
      setLoading(false);
    }
  };

  const discoveryMethods = useMemo(() => {
    const methods = new Set<string>();
    systems.forEach(system => {
      if (system.discoveryMethod) {
        methods.add(system.discoveryMethod);
      }
    });
    return Array.from(methods);
  }, [systems]);

  const filteredSystems = useMemo(() => {
    return systems.filter(system => {
      const matchesSearch = searchQuery === '' ||
        system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        system.planets.some(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.koiNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesMethod = selectedMethod === 'all' ||
        system.discoveryMethod === selectedMethod;

      const matchesType = filterType === 'all' ||
        system.planets.some(p => p.type === filterType);

      return matchesSearch && matchesMethod && matchesType;
    });
  }, [systems, searchQuery, selectedMethod, filterType]);

  const selectedSystem = useMemo(() => {
    return filteredSystems.find(s => s.id === selectedSystemId) || filteredSystems[0];
  }, [filteredSystems, selectedSystemId]);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return <LoadingScreen theme={theme} />;
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <Sidebar
        systems={filteredSystems}
        selectedSystemId={selectedSystemId}
        onSystemSelect={setSelectedSystemId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onFilterChange={setFilterType}
        discoveryMethods={discoveryMethods}
        selectedMethod={selectedMethod}
        onMethodChange={setSelectedMethod}
        orbitAnimationActive={orbitAnimationActive}
        onToggleAnimation={() => setOrbitAnimationActive(!orbitAnimationActive)}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      <div className="absolute left-80 right-0 top-0 bottom-0">
        {selectedSystem && (
          <DynamicStarSystem
            system={selectedSystem}
            orbitAnimationActive={orbitAnimationActive}
            onPlanetSelect={handlePlanetSelect}
            theme={theme}
          />
        )}
      </div>

      {selectedPlanet && (
        <PlanetDetailModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
          theme={theme}
        />
      )}

      <div className={`fixed bottom-4 right-4 ${theme === 'dark' ? 'glass-panel' : 'bg-white border border-gray-300'} rounded-lg px-4 py-2 z-10`}>
        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Exoplanet Visualization Dashboard • {systems.length} Systems Loaded
        </p>
      </div>
    </div>
  );
}

export default App;
