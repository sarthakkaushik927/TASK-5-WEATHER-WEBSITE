import authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { validateSignup, validateLogin } from '../utils/validators.js';

export const signup = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateSignup(req.body);
  if (!isValid) {
    throw ApiError.badRequest(errors.join(' '));
  }

  const { user, token } = await authService.signup(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Account created successfully.',
    data: { user, token },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateLogin(req.body);
  if (!isValid) {
    throw ApiError.badRequest(errors.join(' '));
  }

  const { user, token } = await authService.login(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully.',
    data: { user, token },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
