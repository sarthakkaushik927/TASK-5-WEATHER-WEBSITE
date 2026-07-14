const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'WeatherVue',
  DEFAULT_CITY: import.meta.env.VITE_DEFAULT_CITY || 'Ghaziabad',
  IS_DEV: import.meta.env.DEV,
};

export default env;
