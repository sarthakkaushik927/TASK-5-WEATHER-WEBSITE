import { useState, useEffect, useCallback } from 'react';
import { getForecast } from '../services/weatherService';
import env from '../config/env';

export function useWeather(initialCity = env.DEFAULT_CITY) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(initialCity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (targetCity) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getForecast(targetCity);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);

  const refetch = useCallback(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    city,
    setCity,
    refetch,
  };
}
