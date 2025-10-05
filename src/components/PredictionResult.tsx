import { Sparkles, Star } from 'lucide-react';

interface PredictionResultProps {
  prediction: number;
  onReset: () => void;
}

export function PredictionResult({ prediction, onReset }: PredictionResultProps) {
  const isExoplanet = prediction === 2;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm
                    animate-[fadeIn_0.5s_ease-in]">
      <div className={`glass-panel rounded-2xl p-8 max-w-md mx-4 text-center
                      ${isExoplanet ? 'glow-gold' : 'glow-blue'}
                      animate-[scaleIn_0.5s_ease-out]`}>
        <div className="mb-6">
          {isExoplanet ? (
            <Sparkles className="w-20 h-20 mx-auto text-yellow-400 animate-pulse" />
          ) : (
            <Star className="w-20 h-20 mx-auto text-blue-400 animate-pulse" />
          )}
        </div>

        <h2 className={`text-3xl font-bold mb-4 text-glow
                       ${isExoplanet ? 'text-yellow-400' : 'text-blue-400'}`}>
          {isExoplanet ? '🌍 Exoplanet Detected!' : '⭐ Non-Exoplanet Star'}
        </h2>

        <p className="text-gray-300 mb-6 text-lg">
          {isExoplanet
            ? 'Congratulations! The system shows strong indicators of an exoplanet presence.'
            : 'Analysis complete. The celestial body shows characteristics of a non-planetary star.'}
        </p>

        <button
          onClick={onReset}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300
                     ${isExoplanet
                       ? 'bg-yellow-500 hover:bg-yellow-600 hover:glow-gold'
                       : 'bg-blue-500 hover:bg-blue-600 hover:glow-blue'}
                     transform hover:scale-105`}
        >
          New Analysis
        </button>
      </div>
    </div>
  );
}
