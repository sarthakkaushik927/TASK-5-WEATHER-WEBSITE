import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

class WeatherService {
  constructor() {
    this.baseUrl = env.WEATHER_API_BASE_URL;
    this.apiKey = env.WEATHER_API_KEY;
  }

  async getForecast(city, days = 7) {
    if (!this.apiKey) {
      throw ApiError.internal('Weather API key is not configured.');
    }

    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(city)}&days=${days}&aqi=no&alerts=no`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 400) {
          throw ApiError.badRequest(errorData?.error?.message || 'City not found. Please try again.');
        }
        if (response.status === 403) {
          throw ApiError.internal('Weather API key is invalid or expired.');
        }
        throw ApiError.internal('Failed to fetch weather data.');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw ApiError.internal(`Weather service unavailable: ${error.message}`);
    }
  }

  async getCurrent(city) {
    if (!this.apiKey) {
      throw ApiError.internal('Weather API key is not configured.');
    }

    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 400) {
          throw ApiError.badRequest(errorData?.error?.message || 'City not found.');
        }
        throw ApiError.internal('Failed to fetch current weather.');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw ApiError.internal(`Weather service unavailable: ${error.message}`);
    }
  }

  async searchCity(query) {
    if (!this.apiKey) {
      throw ApiError.internal('Weather API key is not configured.');
    }

    const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw ApiError.internal('City search failed.');
      }
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw ApiError.internal(`Weather service unavailable: ${error.message}`);
    }
  }
}

export default new WeatherService();
