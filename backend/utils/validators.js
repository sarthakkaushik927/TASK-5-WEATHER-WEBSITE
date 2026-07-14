const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 128;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

export function validateSignup(body) {
  const errors = [];
  const { name, email, password } = body || {};

  if (!name || typeof name !== 'string' || name.trim().length < MIN_NAME_LENGTH) {
    errors.push(`Name must be at least ${MIN_NAME_LENGTH} characters.`);
  }
  if (name && name.trim().length > MAX_NAME_LENGTH) {
    errors.push(`Name cannot exceed ${MAX_NAME_LENGTH} characters.`);
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (password && password.length > MAX_PASSWORD_LENGTH) {
    errors.push(`Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`);
  }

  return { isValid: errors.length === 0, errors };
}

export function validateLogin(body) {
  const errors = [];
  const { email, password } = body || {};

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }
  if (!password) {
    errors.push('Password is required.');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateCity(city) {
  const errors = [];

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    errors.push('City name is required.');
  }
  if (city && city.trim().length > 100) {
    errors.push('City name is too long.');
  }

  return { isValid: errors.length === 0, errors };
}
