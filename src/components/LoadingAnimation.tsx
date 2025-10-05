import { Loader2 } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel rounded-2xl p-12 text-center glow-blue">
        <Loader2 className="w-16 h-16 mx-auto text-blue-400 animate-spin mb-4" />
        <h3 className="text-2xl font-bold text-blue-300 mb-2 text-glow">
          Analyzing Data
        </h3>
        <p className="text-gray-400">
          Processing celestial parameters...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}
