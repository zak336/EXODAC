export interface ExoplanetData {
  koi_score: number;
  koi_time0: number;
  koi_depth: number;
  koi_slogg: number;
  koi_tce_plnt_num: number;
  koi_steff: number;
  koi_model_snr: number;
  koi_teq: number;
  ra: number;
  dec: number;
  koi_srho: number;
  koi_duration: number;
  koi_sma: number;
  koi_impact: number;
  koi_time0bk: number;
  koi_srad: number;
  koi_dor: number;
  koi_kepmag: number;
  koi_insol: number;
  koi_prad: number;
}

export interface ExoplanetSystem {
  id: string;
  name: string;
  star: StarData;
  planets: PlanetData[];
  discoveryMethod?: string;
}

export interface StarData {
  name: string;
  temperature: number;
  radius: number;
  mass?: number;
  spectralType?: string;
  color: string;
}

export interface PlanetData extends ExoplanetData {
  id: string;
  name: string;
  koiNumber?: string;
  type?: 'terrestrial' | 'super-earth' | 'neptune' | 'gas-giant';
  discoveryMethod?: string;
  texture?: string;
}

export interface FormField {
  name: keyof ExoplanetData;
  label: string;
  description: string;
  placeholder: string;
}

export interface PredictionResult {
  prediction: number;
  confidence?: number;
}

export type FilterType = 'all' | 'terrestrial' | 'super-earth' | 'neptune' | 'gas-giant';

export type ThemeMode = 'light' | 'dark';

export const PARAMETER_LABELS: Record<keyof ExoplanetData, string> = {
  koi_score: 'Disposition Score',
  koi_time0: 'Transit Epoch [BJD]',
  koi_depth: 'Transit Depth [ppm]',
  koi_slogg: 'Stellar Surface Gravity [log₁₀(cm/s²)]',
  koi_tce_plnt_num: 'TCE Planet Number',
  koi_steff: 'Stellar Effective Temperature [K]',
  koi_model_snr: 'Transit Signal-to-Noise Ratio',
  koi_teq: 'Equilibrium Temperature [K]',
  ra: 'Right Ascension [°]',
  dec: 'Declination [°]',
  koi_srho: 'Fitted Stellar Density [g/cm³]',
  koi_duration: 'Transit Duration [hrs]',
  koi_sma: 'Orbit Semi-Major Axis [au]',
  koi_impact: 'Impact Parameter',
  koi_time0bk: 'Transit Epoch [BKJD]',
  koi_srad: 'Stellar Radius [Solar Radii]',
  koi_dor: 'Planet–Star Distance / Star Radius',
  koi_kepmag: 'Kepler-band Magnitude [mag]',
  koi_insol: 'Insolation Flux [Earth Flux]',
  koi_prad: 'Planetary Radius [Earth Radii]'
};
