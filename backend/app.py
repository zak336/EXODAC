from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
ENCODER_PATH = os.path.join(MODEL_DIR, 'encoder.pkl')

model = None
scaler = None
encoder = None

def load_models():
    global model, scaler, encoder
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            print("Model loaded successfully")

        if os.path.exists(SCALER_PATH):
            with open(SCALER_PATH, 'rb') as f:
                scaler = pickle.load(f)
            print("Scaler loaded successfully")

        if os.path.exists(ENCODER_PATH):
            with open(ENCODER_PATH, 'rb') as f:
                encoder = pickle.load(f)
            print("Encoder loaded successfully")
    except Exception as e:
        print(f"Error loading models: {e}")

load_models()

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({
                'error': 'Model not loaded. Please upload model.pkl to backend/model/'
            }), 503

        data = request.get_json()

        features = [
            float(data.get('koi_score', 0)),
            float(data.get('koi_time0', 0)),
            float(data.get('koi_depth', 0)),
            float(data.get('koi_slogg', 0)),
            float(data.get('koi_tce_plnt_num', 0)),
            float(data.get('koi_steff', 0)),
            float(data.get('koi_model_snr', 0)),
            float(data.get('koi_teq', 0)),
            float(data.get('ra', 0)),
            float(data.get('dec', 0)),
            float(data.get('koi_srho', 0)),
            float(data.get('koi_duration', 0)),
            float(data.get('koi_sma', 0)),
            float(data.get('koi_impact', 0)),
            float(data.get('koi_time0bk', 0)),
            float(data.get('koi_srad', 0)),
            float(data.get('koi_dor', 0)),
            float(data.get('koi_kepmag', 0)),
            float(data.get('koi_insol', 0)),
            float(data.get('koi_prad', 0))
        ]

        features_array = np.array([features])

        if scaler is not None:
            features_array = scaler.transform(features_array)

        prediction = model.predict(features_array)

        prediction_proba = None
        if hasattr(model, 'predict_proba'):
            prediction_proba = model.predict_proba(features_array)
            confidence = float(np.max(prediction_proba))
        else:
            confidence = None

        return jsonify({
            'prediction': int(prediction[0]),
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None,
        'encoder_loaded': encoder is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
