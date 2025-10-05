import { FormField } from '../types/exoplanet';

interface FormInputProps {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
}

export function FormInput({ field, value, onChange }: FormInputProps) {
  return (
    <div className="mb-4 group">
      <label className="block text-blue-300 text-sm font-semibold mb-1 font-['Orbitron']">
        {field.label}
      </label>
      <p className="text-gray-400 text-xs mb-2 font-light">
        {field.description}
      </p>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-4 py-2.5 bg-black/40 border border-blue-500/30 rounded-lg
                   text-white placeholder-gray-500
                   focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30
                   transition-all duration-300 ease-in-out
                   hover:border-blue-400/50 hover:bg-black/60
                   group-hover:glow-blue"
      />
    </div>
  );
}
