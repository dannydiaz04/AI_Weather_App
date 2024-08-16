import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData ] = useState([]);

    useEffect(() => {
        // Fetch weather data from the flask backend (need to set this up from the API that I'm using in Portfolio Project)
        fetch('api/weather')
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Temperature Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={weatherData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Current Weather</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {weatherData.length > 0 && (
                            <div>
                                <p>Temperature: {weatherData[weatherData.length -1].temperature}C</p>
                                <p>Humidity: {weatherData[weatherData.length -1].humidity}%</p>
                                <p>Wind Speed: {weatherData[weatherData.length -1].windSpeed}km/h</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherDashboard;