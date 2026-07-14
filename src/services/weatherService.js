import { apiRequest } from './api';

export async function getForecast(city, days = 7) {
  const response = await apiRequest(
    `/weather/forecast?city=${encodeURIComponent(city)}&days=${days}`,
    { auth: true }
  );
  return response.data;
}

export async function getCurrentWeather(city) {
  const response = await apiRequest(
    `/weather/current?city=${encodeURIComponent(city)}`,
    { auth: true }
  );
  return response.data;
}

export async function searchCity(query) {
  const response = await apiRequest(
    `/weather/search?q=${encodeURIComponent(query)}`,
    { auth: true }
  );
  return response.data;
}
