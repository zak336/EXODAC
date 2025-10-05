import { X } from 'lucide-react';
import { PlanetData, PARAMETER_LABELS } from '../types/exoplanet';

interface PlanetDetailModalProps {
  planet: PlanetData;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function PlanetDetailModal({ planet, onClose, theme }: PlanetDetailModalProps) {
  const bgClass = theme === 'dark' ? 'bg-black/90' : 'bg-white/95';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderClass = theme === 'dark' ? 'border-blue-500/30' : 'border-gray-300';

  const parameters: Array<{ key: keyof typeof PARAMETER_LABELS; value: number }> = [
    { key: 'koi_score', value: planet.koi_score },
    { key: 'koi_time0', value: planet.koi_time0 },
    { key: 'koi_depth', value: planet.koi_depth },
    { key: 'koi_slogg', value: planet.koi_slogg },
    { key: 'koi_tce_plnt_num', value: planet.koi_tce_plnt_num },
    { key: 'koi_steff', value: planet.koi_steff },
    { key: 'koi_model_snr', value: planet.koi_model_snr },
    { key: 'koi_teq', value: planet.koi_teq },
    { key: 'ra', value: planet.ra },
    { key: 'dec', value: planet.dec },
    { key: 'koi_srho', value: planet.koi_srho },
    { key: 'koi_duration', value: planet.koi_duration },
    { key: 'koi_sma', value: planet.koi_sma },
    { key: 'koi_impact', value: planet.koi_impact },
    { key: 'koi_time0bk', value: planet.koi_time0bk },
    { key: 'koi_srad', value: planet.koi_srad },
    { key: 'koi_dor', value: planet.koi_dor },
    { key: 'koi_kepmag', value: planet.koi_kepmag },
    { key: 'koi_insol', value: planet.koi_insol },
    { key: 'koi_prad', value: planet.koi_prad }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
         onClick={onClose}>
      <div className={`${bgClass} backdrop-blur-xl border ${borderClass} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden`}
           onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {planet.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {planet.koiNumber && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    {planet.koiNumber}
                  </span>
                )}
                {planet.type && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize">
                    {planet.type.replace('-', ' ')}
                  </span>
                )}
                {planet.discoveryMethod && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    {planet.discoveryMethod}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          <h3 className={`text-lg font-semibold ${textClass} mb-4`}>
            Scientific Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parameters.map(({ key, value }) => (
              <div key={key} className={`p-4 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-gray-100'} rounded-lg border ${borderClass}`}>
                <div className={`text-xs ${secondaryTextClass} mb-1`}>
                  {PARAMETER_LABELS[key]}
                </div>
                <div className={`text-lg font-semibold ${textClass}`}>
                  {typeof value === 'number' ? value.toFixed(4) : value}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50'} border ${theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-300'} rounded-lg`}>
            <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-800'} mb-2`}>
              Quick Facts
            </h4>
            <ul className={`text-sm ${secondaryTextClass} space-y-1`}>
              <li>Radius: {planet.koi_prad.toFixed(2)} Earth radii</li>
              <li>Orbital Distance: {planet.koi_sma.toFixed(3)} AU</li>
              <li>Temperature: {planet.koi_teq.toFixed(0)} K</li>
              <li>Transit Duration: {planet.koi_duration.toFixed(2)} hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
