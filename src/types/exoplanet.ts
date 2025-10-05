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

export type StarSystem = 'kepler' | 'trappist' | 'solar';
