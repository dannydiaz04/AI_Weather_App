from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta
import random

# Create your views here.
def generate_mock_weather_data(days=7):
    data = []
    for i in range(days):
        date = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d")
        data.append({
            "date": date,
            "temperature" : round(random.uniform(50,100), 1),
            "humidity" : round(random.uniform(30,80), 1),
            "windSpeed" : round(random.uniform(0,20), 1)
        })
    return data[::-1] # Reverse to get chronological order

def get_weather(request):
    if request.method == 'GET':
        data = generate_mock_weather_data()
        return JsonResponse(data, safe=False)