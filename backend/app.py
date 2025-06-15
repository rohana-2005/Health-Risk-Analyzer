from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)


with open('model.pkl', 'rb') as f:
    models, most_accurate_model, kmeans, scaler = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    X = np.array([data[f] for f in data['features']]).reshape(1, -1)
    
    X_scaled = scaler.transform(X)
    
    best_model = models[most_accurate_model]
    pred = bool(best_model.predict(X_scaled)[0])
    result = "At Risk" if pred else "Not At Risk"
    
    cluster = int(kmeans.predict(X_scaled)[0])
    
    return jsonify({
        'result': result,
        'model': most_accurate_model,
        'cluster': cluster
    })

if __name__ == '__main__':
    app.run(debug=True)