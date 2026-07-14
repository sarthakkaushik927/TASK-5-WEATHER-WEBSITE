import weatherService from '../services/weatherService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { validateCity } from '../utils/validators.js';

export const getForecast = asyncHandler(async (req, res) => {
  const { city, days } = req.query;

  const { isValid, errors } = validateCity(city);
  if (!isValid) {
    throw ApiError.badRequest(errors.join(' '));
  }

  const parsedDays = Math.min(Math.max(parseInt(days, 10) || 7, 1), 10);
  const data = await weatherService.getForecast(city.trim(), parsedDays);

  res.status(200).json({
    status: 'success',
    data,
  });
});

export const getCurrent = asyncHandler(async (req, res) => {
  const { city } = req.query;

  const { isValid, errors } = validateCity(city);
  if (!isValid) {
    throw ApiError.badRequest(errors.join(' '));
  }

  const data = await weatherService.getCurrent(city.trim());

  res.status(200).json({
    status: 'success',
    data,
  });
});

export const searchCity = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    throw ApiError.badRequest('Search query must be at least 2 characters.');
  }

  const data = await weatherService.searchCity(q.trim());

  res.status(200).json({
    status: 'success',
    data,
  });
});
