import axios from 'axios';
import { ExoplanetData, PredictionResult } from '../types/exoplanet';

const API_BASE_URL = 'http://localhost:5000';

export async function predictExoplanet(data: ExoplanetData): Promise<PredictionResult> {
  try {
    const response = await axios.post<PredictionResult>(`${API_BASE_URL}/api/predict`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to connect to prediction service. Please ensure the backend is running.');
  }
}
