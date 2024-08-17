from flask import Flask, jsonify, make_response
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)

# Allow CORS for the specific frontend origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

def generate_mock_weather_data(days=7):
    data = []
    for i in range(days):
        date = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d")
        data.append({
            "date": date,
            "temperature": round(random.uniform(15, 30), 1),
            "humidity": round(random.uniform(30, 80), 1),
            "windSpeed": round(random.uniform(0, 20), 1)
        })
    return data[::-1]  # Reverse to get chronological order

app.route('/api/weather')
def get_weather():
    data = generate_mock_weather_data()
    response = make_response(jsonify(data))
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    return response

@app.route('/api/weather', methods=['OPTIONS'])
def options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    return response


if __name__ == '__main__':
    app.run(debug=True, port=5000)