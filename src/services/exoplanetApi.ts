import axios from 'axios';
import { ExoplanetSystem, PlanetData, StarData } from '../types/exoplanet';

const API_BASE_URL = import.meta.env.VITE_VERCEL_BACKEND_URL || 'https://your-vercel-backend-url.vercel.app';

function determineSpectralColor(temperature: number): string {
  if (temperature >= 30000) return '#9BB0FF';
  if (temperature >= 10000) return '#AABFFF';
  if (temperature >= 7500) return '#CAD7FF';
  if (temperature >= 6000) return '#F8F7FF';
  if (temperature >= 5200) return '#FFF4EA';
  if (temperature >= 3700) return '#FFD2A1';
  if (temperature >= 2400) return '#FFCC6F';
  return '#FF8C42';
}

function determinePlanetType(radius: number): 'terrestrial' | 'super-earth' | 'neptune' | 'gas-giant' {
  if (radius < 1.5) return 'terrestrial';
  if (radius < 2.5) return 'super-earth';
  if (radius < 6) return 'neptune';
  return 'gas-giant';
}

function getPlanetTexture(type: string): string {
  const textures = {
    'terrestrial': '#8B4513',
    'super-earth': '#4169E1',
    'neptune': '#4682B4',
    'gas-giant': '#DAA520'
  };
  return textures[type as keyof typeof textures] || '#888888';
}

export async function fetchExoplanetSystems(): Promise<ExoplanetSystem[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/exoplanets`, {
      timeout: 10000
    });

    const rawData = response.data;

    if (!Array.isArray(rawData)) {
      throw new Error('Invalid API response format');
    }

    const systemsMap = new Map<string, ExoplanetSystem>();

    rawData.forEach((planet: any, index: number) => {
      const systemId = planet.systemName || `system-${Math.floor(index / 3)}`;
      const starTemp = planet.koi_steff || 5778;
      const starRadius = planet.koi_srad || 1.0;

      if (!systemsMap.has(systemId)) {
        const star: StarData = {
          name: systemId,
          temperature: starTemp,
          radius: starRadius,
          color: determineSpectralColor(starTemp),
          spectralType: getSpectralType(starTemp)
        };

        systemsMap.set(systemId, {
          id: systemId,
          name: systemId,
          star,
          planets: [],
          discoveryMethod: planet.discoveryMethod || 'Transit'
        });
      }

      const system = systemsMap.get(systemId)!;
      const planetRadius = planet.koi_prad || 1.0;
      const planetType = determinePlanetType(planetRadius);

      const planetData: PlanetData = {
        id: planet.id || `planet-${index}`,
        name: planet.name || `Planet ${system.planets.length + 1}`,
        koiNumber: planet.koiNumber,
        type: planetType,
        texture: getPlanetTexture(planetType),
        discoveryMethod: planet.discoveryMethod,
        koi_score: planet.koi_score || 0,
        koi_time0: planet.koi_time0 || 0,
        koi_depth: planet.koi_depth || 0,
        koi_slogg: planet.koi_slogg || 0,
        koi_tce_plnt_num: planet.koi_tce_plnt_num || 0,
        koi_steff: planet.koi_steff || 0,
        koi_model_snr: planet.koi_model_snr || 0,
        koi_teq: planet.koi_teq || 0,
        ra: planet.ra || 0,
        dec: planet.dec || 0,
        koi_srho: planet.koi_srho || 0,
        koi_duration: planet.koi_duration || 0,
        koi_sma: planet.koi_sma || 1.0,
        koi_impact: planet.koi_impact || 0,
        koi_time0bk: planet.koi_time0bk || 0,
        koi_srad: planet.koi_srad || 0,
        koi_dor: planet.koi_dor || 0,
        koi_kepmag: planet.koi_kepmag || 0,
        koi_insol: planet.koi_insol || 0,
        koi_prad: planet.koi_prad || 1.0
      };

      system.planets.push(planetData);
    });

    return Array.from(systemsMap.values());
  } catch (error) {
    console.error('Error fetching exoplanet data:', error);
    return getMockData();
  }
}

function getSpectralType(temperature: number): string {
  if (temperature >= 30000) return 'O';
  if (temperature >= 10000) return 'B';
  if (temperature >= 7500) return 'A';
  if (temperature >= 6000) return 'F';
  if (temperature >= 5200) return 'G';
  if (temperature >= 3700) return 'K';
  return 'M';
}

function getMockData(): ExoplanetSystem[] {
  return [
    {
      id: 'kepler-90',
      name: 'Kepler-90',
      star: {
        name: 'Kepler-90',
        temperature: 5933,
        radius: 1.2,
        color: '#FFF4EA',
        spectralType: 'G'
      },
      planets: [
        {
          id: 'kepler-90-b',
          name: 'Kepler-90 b',
          koiNumber: 'K00351.01',
          type: 'terrestrial',
          texture: '#8B4513',
          discoveryMethod: 'Transit',
          koi_score: 1.0,
          koi_time0: 2454954.62,
          koi_depth: 302,
          koi_slogg: 4.5,
          koi_tce_plnt_num: 1,
          koi_steff: 5933,
          koi_model_snr: 25.3,
          koi_teq: 709,
          ra: 292.63,
          dec: 48.14,
          koi_srho: 1.4,
          koi_duration: 2.98,
          koi_sma: 0.074,
          koi_impact: 0.2,
          koi_time0bk: 133.62,
          koi_srad: 1.2,
          koi_dor: 5.1,
          koi_kepmag: 13.8,
          koi_insol: 180.1,
          koi_prad: 1.31
        },
        {
          id: 'kepler-90-c',
          name: 'Kepler-90 c',
          koiNumber: 'K00351.02',
          type: 'terrestrial',
          texture: '#CD853F',
          discoveryMethod: 'Transit',
          koi_score: 0.996,
          koi_time0: 2454966.04,
          koi_depth: 195,
          koi_slogg: 4.5,
          koi_tce_plnt_num: 2,
          koi_steff: 5933,
          koi_model_snr: 18.7,
          koi_teq: 582,
          ra: 292.63,
          dec: 48.14,
          koi_srho: 1.4,
          koi_duration: 3.42,
          koi_sma: 0.089,
          koi_impact: 0.15,
          koi_time0bk: 145.04,
          koi_srad: 1.2,
          koi_dor: 6.2,
          koi_kepmag: 13.8,
          koi_insol: 124.5,
          koi_prad: 1.19
        },
        {
          id: 'kepler-90-d',
          name: 'Kepler-90 d',
          koiNumber: 'K00351.03',
          type: 'super-earth',
          texture: '#4169E1',
          discoveryMethod: 'Transit',
          koi_score: 1.0,
          koi_time0: 2454971.37,
          koi_depth: 428,
          koi_slogg: 4.5,
          koi_tce_plnt_num: 3,
          koi_steff: 5933,
          koi_model_snr: 31.2,
          koi_teq: 501,
          ra: 292.63,
          dec: 48.14,
          koi_srho: 1.4,
          koi_duration: 4.18,
          koi_sma: 0.107,
          koi_impact: 0.18,
          koi_time0bk: 150.37,
          koi_srad: 1.2,
          koi_dor: 7.4,
          koi_kepmag: 13.8,
          koi_insol: 86.2,
          koi_prad: 2.87
        }
      ],
      discoveryMethod: 'Transit'
    },
    {
      id: 'trappist-1',
      name: 'TRAPPIST-1',
      star: {
        name: 'TRAPPIST-1',
        temperature: 2559,
        radius: 0.117,
        color: '#FF8C42',
        spectralType: 'M'
      },
      planets: [
        {
          id: 'trappist-1-e',
          name: 'TRAPPIST-1 e',
          type: 'terrestrial',
          texture: '#4682B4',
          discoveryMethod: 'Transit',
          koi_score: 0.98,
          koi_time0: 2457000.0,
          koi_depth: 520,
          koi_slogg: 5.2,
          koi_tce_plnt_num: 5,
          koi_steff: 2559,
          koi_model_snr: 22.1,
          koi_teq: 251,
          ra: 346.62,
          dec: -5.04,
          koi_srho: 51.8,
          koi_duration: 0.9,
          koi_sma: 0.028,
          koi_impact: 0.38,
          koi_time0bk: 6179.0,
          koi_srad: 0.117,
          koi_dor: 18.2,
          koi_kepmag: 18.8,
          koi_insol: 0.66,
          koi_prad: 0.92
        },
        {
          id: 'trappist-1-f',
          name: 'TRAPPIST-1 f',
          type: 'terrestrial',
          texture: '#5F9EA0',
          discoveryMethod: 'Transit',
          koi_score: 0.95,
          koi_time0: 2457004.1,
          koi_depth: 485,
          koi_slogg: 5.2,
          koi_tce_plnt_num: 6,
          koi_steff: 2559,
          koi_model_snr: 19.8,
          koi_teq: 219,
          ra: 346.62,
          dec: -5.04,
          koi_srho: 51.8,
          koi_duration: 1.05,
          koi_sma: 0.037,
          koi_impact: 0.42,
          koi_time0bk: 6183.1,
          koi_srad: 0.117,
          koi_dor: 24.1,
          koi_kepmag: 18.8,
          koi_insol: 0.38,
          koi_prad: 1.045
        }
      ],
      discoveryMethod: 'Transit'
    }
  ];
}
