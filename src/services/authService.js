import { apiRequest, setToken } from './api';

export async function signup({ name, email, password }) {
  const response = await apiRequest('/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });

  if (response.data?.token) {
    setToken(response.data.token);
  }

  return response.data;
}

export async function login({ email, password }) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  if (response.data?.token) {
    setToken(response.data.token);
  }

  return response.data;
}

export async function getProfile() {
  const response = await apiRequest('/auth/profile', { auth: true });
  return response.data;
}
