from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# replace this fake data with the actual API that we're using in the github portfolio repo
def generate_mock_weather_data(days=7):
    data = []
    for i in range(days):
        date = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d")
        data.append({
            "date":date,
            "temperature": round(random.uniform(15,30), 1),
            "humidity": round(random.uniform(30,80), 1),
            "windSpeed": round(random.uniform(0,20), 1)
        })
        return data[::-1] # Reverse to get chronological order
    
@app.route('/api/weather')
def get_weather():
    return jsonify(generate_mock_weather_data)

if __name__ == '__main__':
    app.run(debug=True)