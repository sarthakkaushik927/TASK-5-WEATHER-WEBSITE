# Weather Website - Backend API Documentation & Junior Developer Guide

Welcome! This guide provides everything you need to build your HTML, CSS, and Vanilla JavaScript Weather Website using this Node.js / Express backend.

---

## 🚀 1. Base Rules & Requirements

1. **Base URL**:
   - **Local Development**: `http://localhost:3001`
   - **Production (Vercel)**: `https://task-5-weather-website.vercel.app` (or your deployed URL)

2. **JSON Data Format**:
   - For `POST` requests (`signup` & `login`), you **MUST** send `Content-Type: application/json` in headers and format the body with `JSON.stringify(data)`.

3. **JWT Authentication Token**:
   - When a user signs up or logs in, the server returns a JWT `token` inside `response.data.token`.
   - **Store the token** in `localStorage`:
     ```javascript
     localStorage.setItem('token', token);
     ```
   - **Attach the token** to all protected requests (`profile`, `current weather`, `forecast`, `search`):
     ```javascript
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
     ```

4. **CORS is Disabled**:
   - CORS restrictions have been disabled on the backend. You can call these APIs directly from your static HTML files opened in a browser (`file://`), standard VS Code Live Server (`http://127.0.0.1:5500`), or any local server.

---

## 📋 2. Summary of API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check (verifies if backend is running) |
| `POST` | `/api/auth/signup` | No | Register a new user account |
| `POST` | `/api/auth/login` | No | Login existing user and get JWT token |
| `GET` | `/api/auth/profile` | **Yes** | Fetch current logged-in user's profile |
| `GET` | `/api/weather/current?city={cityName}` | **Yes** | Fetch current weather data for a city |
| `GET` | `/api/weather/forecast?city={cityName}&days=7` | **Yes** | Fetch weather forecast (1 to 10 days) |
| `GET` | `/api/weather/search?q={query}` | **Yes** | Search city names for autocomplete |

---

## 📡 3. Detailed Endpoint Specifications

### A. Health Check
- **Endpoint**: `GET /api/health`
- **Headers**: None
- **Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Weather API is running.",
    "timestamp": "2026-09-02T12:00:00.000Z",
    "environment": "development"
  }
  ```

---

### B. User Signup
- **Endpoint**: `POST /api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```
- **Validation Rules**:
  - `name`: String, minimum 2 characters, max 50.
  - `email`: Valid email format (e.g. `user@domain.com`).
  - `password`: String, minimum 6 characters.
- **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Account created successfully.",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2026-09-02T12:00:00.000Z",
        "updatedAt": "2026-09-02T12:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    }
  }
  ```
- **Error Response (400 Bad Request / 409 Conflict)**:
  ```json
  {
    "status": "fail",
    "message": "An account with this email already exists."
  }
  ```

---

### C. User Login
- **Endpoint**: `POST /api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Logged in successfully.",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    }
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  {
    "status": "fail",
    "message": "Invalid email or password."
  }
  ```

---

### D. Get Profile (Protected)
- **Endpoint**: `GET /api/auth/profile`
- **Headers**: `Authorization: Bearer <YOUR_STORED_JWT_TOKEN>`
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  }
  ```

---

### E. Current Weather (Protected)
- **Endpoint**: `GET /api/weather/current?city=London`
- **Query Params**:
  - `city` (required): City name (e.g. `London`, `Tokyo`, `New York`)
- **Headers**: `Authorization: Bearer <YOUR_STORED_JWT_TOKEN>`
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "localtime": "2026-09-02 12:00"
      },
      "current": {
        "temp_c": 18.5,
        "temp_f": 65.3,
        "is_day": 1,
        "condition": {
          "text": "Partly cloudy",
          "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
        },
        "wind_kph": 15.1,
        "humidity": 68,
        "feelslike_c": 18.5,
        "uv": 4.0
      }
    }
  }
  ```

---

### F. Weather Forecast (Protected)
- **Endpoint**: `GET /api/weather/forecast?city=London&days=7`
- **Query Params**:
  - `city` (required): City name
  - `days` (optional): Number of forecast days (1 to 10, default is 7)
- **Headers**: `Authorization: Bearer <YOUR_STORED_JWT_TOKEN>`
- **Success Response (200 OK)**:
  Contains current weather data + `forecast.forecastday` array with daily stats (`maxtemp_c`, `mintemp_c`, `avgtemp_c`, `chance_of_rain`, `hour` array for hourly breakdown).

---

### G. City Search / Autocomplete (Protected)
- **Endpoint**: `GET /api/weather/search?q=Lon`
- **Query Params**: `q` (required, minimum 2 characters)
- **Headers**: `Authorization: Bearer <YOUR_STORED_JWT_TOKEN>`
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 2801268,
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11
      }
    ]
  }
  ```

---

## 💻 4. Vanilla JavaScript Code Examples

Here are complete `fetch()` examples you can copy and use directly in your `app.js` file:

### 1. Centralized API Fetch Helper (`api.js`)
```javascript
const BASE_URL = 'http://localhost:3001/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}
```

### 2. User Signup Handler
```javascript
async function handleSignup(name, email, password) {
  try {
    const result = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    // Save token and user details
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));

    alert('Signup successful!');
    window.location.href = 'dashboard.html'; // Redirect to main weather page
  } catch (error) {
    alert(`Signup Error: ${error.message}`);
  }
}
```

### 3. User Login Handler
```javascript
async function handleLogin(email, password) {
  try {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Save token and user details
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));

    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert(`Login Error: ${error.message}`);
  }
}
```

### 4. Fetch Current Weather & Forecast
```javascript
async function loadWeatherData(cityName) {
  try {
    // 1. Fetch current weather
    const currentWeather = await apiRequest(`/weather/current?city=${encodeURIComponent(cityName)}`);
    console.log('Current Weather:', currentWeather.data);

    // 2. Fetch 7-day forecast
    const forecast = await apiRequest(`/weather/forecast?city=${encodeURIComponent(cityName)}&days=7`);
    console.log('Forecast Data:', forecast.data);

    // Render data into HTML elements
    document.getElementById('cityName').textContent = currentWeather.data.location.name;
    document.getElementById('temp').textContent = `${currentWeather.data.current.temp_c}°C`;
    document.getElementById('conditionText').textContent = currentWeather.data.current.condition.text;
    document.getElementById('conditionIcon').src = `https:${currentWeather.data.current.condition.icon}`;

  } catch (error) {
    console.error('Weather error:', error.message);
    alert(`Could not load weather: ${error.message}`);
  }
}
```

### 5. Check Logged-in User State & Logout
```javascript
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    // User is not logged in, redirect to login page
    window.location.href = 'login.html';
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
```

---

## 🛠️ 5. How to Run the Backend Server Locally

If you need to run the backend server on your machine during development:

1. Open terminal in project directory:
   ```bash
   cd TASK-5-WEATHER-WEBSITE/backend
   ```
2. Make sure dependencies are installed:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Or:
   ```bash
   node --env-file=../.env index.js
   ```
4. Server will run at: `http://localhost:3001`
5. Test health endpoint in browser: `http://localhost:3001/api/health`

---
Happy Coding! If you encounter any API issues, notify your team lead.
