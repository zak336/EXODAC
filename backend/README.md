# Exoplanet Detection Backend

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Upload your trained model files to the `model/` directory:
   - `model.pkl` - Your trained machine learning model
   - `scaler.pkl` - Feature scaler (optional)
   - `encoder.pkl` - Label encoder (optional)

3. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### POST /api/predict
Predicts whether the input parameters indicate an exoplanet.

**Request Body:**
```json
{
  "koi_score": 0.5,
  "koi_time0": 2454833.0,
  "koi_depth": 500.0,
  ...
}
```

**Response:**
```json
{
  "prediction": 2,
  "confidence": 0.95
}
```

Prediction values:
- `1` = Non-Exoplanet Star
- `2` = Exoplanet Detected

### GET /api/health
Health check endpoint to verify model loading status.
