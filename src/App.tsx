import { useState } from 'react';
import { SpaceScene } from './components/SpaceScene';
import { ExoplanetForm } from './components/ExoplanetForm';
import { SystemSelector } from './components/SystemSelector';
import { LoadingAnimation } from './components/LoadingAnimation';
import { PredictionResult } from './components/PredictionResult';
import { ExoplanetData, StarSystem } from './types/exoplanet';
import { predictExoplanet } from './services/api';

function App() {
  const [currentSystem, setCurrentSystem] = useState<StarSystem>('kepler');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<number | null>(null);
  const [detectionResult, setDetectionResult] = useState<'detected' | 'non-exoplanet' | null>(null);

  const handleSystemChange = (system: StarSystem) => {
    setCurrentSystem(system);
    setPredictionResult(null);
    setDetectionResult(null);
  };

  const handleFormSubmit = async (data: ExoplanetData) => {
    setIsLoading(true);
    setPredictionResult(null);
    setDetectionResult(null);

    try {
      const result = await predictExoplanet(data);

      setTimeout(() => {
        setIsLoading(false);
        setPredictionResult(result.prediction);
        setDetectionResult(result.prediction === 2 ? 'detected' : 'non-exoplanet');
      }, 2000);
    } catch (error) {
      console.error('Prediction error:', error);
      setIsLoading(false);
      alert(error instanceof Error ? error.message : 'An error occurred during prediction');
    }
  };

  const handleReset = () => {
    setPredictionResult(null);
    setDetectionResult(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <SpaceScene
        currentSystem={currentSystem}
        isLoading={isLoading}
        detectionResult={detectionResult}
      />

      <SystemSelector
        currentSystem={currentSystem}
        onSystemChange={handleSystemChange}
      />

      <ExoplanetForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />

      {isLoading && <LoadingAnimation />}

      {predictionResult !== null && (
        <PredictionResult
          prediction={predictionResult}
          onReset={handleReset}
        />
      )}

      <div className="fixed bottom-4 left-4 glass-panel rounded-lg px-4 py-2 z-10">
        <p className="text-xs text-gray-400">
          Exoplanet Detection System v1.0
        </p>
      </div>
    </div>
  );
}

export default App;
