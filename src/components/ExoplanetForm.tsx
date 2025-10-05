import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { FormInput } from './FormInput';
import { ExoplanetData } from '../types/exoplanet';
import { formFields } from '../data/formFields';

interface ExoplanetFormProps {
  onSubmit: (data: ExoplanetData) => void;
  isLoading: boolean;
}

export function ExoplanetForm({ onSubmit, isLoading }: ExoplanetFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ExoplanetData = {} as ExoplanetData;
    formFields.forEach(field => {
      data[field.name] = parseFloat(formData[field.name] || '0');
    });

    onSubmit(data);
  };

  const isFormValid = formFields.every(field => formData[field.name] && formData[field.name] !== '');

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 w-full max-w-md z-10
                    max-h-[90vh] overflow-hidden">
      <div className="glass-panel rounded-2xl p-6 shadow-2xl glow-blue">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-300 text-glow">
            Exoplanet Detection
          </h1>
          <Rocket className="w-8 h-8 text-yellow-400" />
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2 custom-scrollbar">
          {formFields.map((field) => (
            <FormInput
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
            />
          ))}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all duration-300
                       ${isFormValid && !isLoading
                         ? 'bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white glow-gold transform hover:scale-105'
                         : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                       `}
          >
            {isLoading ? 'Analyzing...' : 'Predict Exoplanet'}
          </button>
        </form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
