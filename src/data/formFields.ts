import { FormField } from '../types/exoplanet';

export const formFields: FormField[] = [
  {
    name: 'koi_score',
    label: 'koi_score',
    description: 'Disposition Score',
    placeholder: '0.0 - 1.0'
  },
  {
    name: 'koi_time0',
    label: 'koi_time0',
    description: 'Transit Epoch [BJD]',
    placeholder: 'e.g., 2454833.0'
  },
  {
    name: 'koi_depth',
    label: 'koi_depth',
    description: 'Transit Depth [ppm]',
    placeholder: 'e.g., 500'
  },
  {
    name: 'koi_slogg',
    label: 'koi_slogg',
    description: 'Stellar Surface Gravity [log10(cm/s²)]',
    placeholder: 'e.g., 4.5'
  },
  {
    name: 'koi_tce_plnt_num',
    label: 'koi_tce_plnt_num',
    description: 'TCE Planet Number',
    placeholder: 'e.g., 1'
  },
  {
    name: 'koi_steff',
    label: 'koi_steff',
    description: 'Stellar Effective Temperature [K]',
    placeholder: 'e.g., 5778'
  },
  {
    name: 'koi_model_snr',
    label: 'koi_model_snr',
    description: 'Transit Signal-to-Noise Ratio',
    placeholder: 'e.g., 15.5'
  },
  {
    name: 'koi_teq',
    label: 'koi_teq',
    description: 'Equilibrium Temperature [K]',
    placeholder: 'e.g., 300'
  },
  {
    name: 'ra',
    label: 'ra',
    description: 'Right Ascension [°]',
    placeholder: '0 - 360'
  },
  {
    name: 'dec',
    label: 'dec',
    description: 'Declination [°]',
    placeholder: '-90 to 90'
  },
  {
    name: 'koi_srho',
    label: 'koi_srho',
    description: 'Fitted Stellar Density [g/cm³]',
    placeholder: 'e.g., 1.4'
  },
  {
    name: 'koi_duration',
    label: 'koi_duration',
    description: 'Transit Duration [hrs]',
    placeholder: 'e.g., 3.5'
  },
  {
    name: 'koi_sma',
    label: 'koi_sma',
    description: 'Orbit Semi-Major Axis [au]',
    placeholder: 'e.g., 1.0'
  },
  {
    name: 'koi_impact',
    label: 'koi_impact',
    description: 'Impact Parameter',
    placeholder: '0.0 - 1.0'
  },
  {
    name: 'koi_time0bk',
    label: 'koi_time0bk',
    description: 'Transit Epoch [BKJD]',
    placeholder: 'e.g., 133.0'
  },
  {
    name: 'koi_srad',
    label: 'koi_srad',
    description: 'Stellar Radius [Solar radii]',
    placeholder: 'e.g., 1.0'
  },
  {
    name: 'koi_dor',
    label: 'koi_dor',
    description: 'Planet-Star Distance / Star Radius',
    placeholder: 'e.g., 15.0'
  },
  {
    name: 'koi_kepmag',
    label: 'koi_kepmag',
    description: 'Kepler-band Magnitude [mag]',
    placeholder: 'e.g., 12.5'
  },
  {
    name: 'koi_insol',
    label: 'koi_insol',
    description: 'Insolation Flux [Earth flux]',
    placeholder: 'e.g., 1.0'
  },
  {
    name: 'koi_prad',
    label: 'koi_prad',
    description: 'Planetary Radius [Earth radii]',
    placeholder: 'e.g., 1.0'
  }
];
