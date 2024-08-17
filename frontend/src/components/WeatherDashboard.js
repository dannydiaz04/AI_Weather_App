import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch weather data from the Flask backend
        fetch('http://localhost:8000/api/weather/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch weather data ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data);
                setWeatherData(data); // Update if wrapping JSON as suggested earlier
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setError(error);
            });
    }, []);

    return (
        <div className="p-4 bg-background text-foreground min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-primary">Weather Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-primary">Temperature Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={weatherData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
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
                                <p>Temperature: {weatherData[weatherData.length - 1].temperature}F</p>
                                <p>Humidity: {weatherData[weatherData.length - 1].humidity}%</p>
                                <p>Wind Speed: {weatherData[weatherData.length - 1].windSpeed}MPH/h</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherDashboard;