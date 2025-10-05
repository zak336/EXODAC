import { Loader2, Satellite } from 'lucide-react';

interface LoadingScreenProps {
  theme: 'light' | 'dark';
}

export function LoadingScreen({ theme }: LoadingScreenProps) {
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`fixed inset-0 ${bgClass} flex items-center justify-center z-50`}>
      <div className="text-center">
        <div className="relative mb-8">
          <Satellite className="w-20 h-20 mx-auto text-blue-500 animate-pulse" />
          <Loader2 className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 animate-spin" />
        </div>
        <h2 className={`text-2xl font-bold ${textClass} mb-2`}>
          Loading Exoplanet Systems
        </h2>
        <p className="text-gray-500">
          Fetching data from the cosmos...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}
