# Weather Website - Backend API Documentation & Junior Developer Guide

Welcome! This guide provides everything you need to build your HTML, CSS, and Vanilla JavaScript Weather Website using this Node.js / Express backend.

---

## 🌐 Base URL (API Server)

- **Production (Vercel) [USE THIS FOR YOUR APP]**:
  ```http
  https://task-5-weather-website.vercel.app/api
  ```

- **Local Development (If running backend locally on your machine)**:
  ```http
  http://localhost:3001/api
  ```

---

## 🚀 1. Base Rules & Core Concepts

1. **Headers & JSON Data**:
   - For `POST` requests (`signup` & `login`), you **MUST** send the header `'Content-Type': 'application/json'`.
   - Pass the request body using `JSON.stringify({...})`.

2. **JWT Authentication Token**:
   - When a user signs up (`/api/auth/signup`) or logs in (`/api/auth/login`), the backend returns a JWT `token` in `response.data.token`.
   - **Save token in browser storage**:
     ```javascript
     localStorage.setItem('token', data.token);
     ```
   - **Send token for protected endpoints** (`profile`, `current weather`, `forecast`, `search`):
     ```javascript
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
     ```

3. **CORS is Disabled**:
   - You can call these endpoints directly from any origin: VS Code Live Server (`http://127.0.0.1:5500`), double-clicking static `index.html` (`file://`), or any custom server.

---

## 📋 2. Summary of API Endpoints

| Endpoint Name | Method | Auth Required? | Production Full URL |
|---|---|---|---|
| **Health Check** | `GET` | No | `https://task-5-weather-website.vercel.app/api/health` |
| **Signup** | `POST` | No | `https://task-5-weather-website.vercel.app/api/auth/signup` |
| **Login** | `POST` | No | `https://task-5-weather-website.vercel.app/api/auth/login` |
| **User Profile** | `GET` | **Yes** | `https://task-5-weather-website.vercel.app/api/auth/profile` |
| **Current Weather** | `GET` | **Yes** | `https://task-5-weather-website.vercel.app/api/weather/current?city={cityName}` |
| **Weather Forecast** | `GET` | **Yes** | `https://task-5-weather-website.vercel.app/api/weather/forecast?city={cityName}&days=7` |
| **City Search** | `GET` | **Yes** | `https://task-5-weather-website.vercel.app/api/weather/search?q={query}` |

---

## 📡 3. How to Call Each Endpoint (With Full Examples)

### A. Health Check (`GET /api/health`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/health`
- **Auth Required**: No

```javascript
fetch('https://task-5-weather-website.vercel.app/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend Status:', data))
  .catch(err => console.error(err));
```

---

### B. User Signup (`POST /api/auth/signup`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/auth/signup`
- **Auth Required**: No
- **Headers**: `'Content-Type': 'application/json'`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```

#### How to Call in JavaScript:
```javascript
async function registerUser(name, email, password) {
  try {
    const response = await fetch('https://task-5-weather-website.vercel.app/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`Signup Failed: ${result.message}`);
      return;
    }

    // Save token & user
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));

    alert('Account created successfully!');
    window.location.href = 'weather.html'; // Go to main weather page
  } catch (error) {
    console.error('Error during signup:', error);
  }
}
```

---

### C. User Login (`POST /api/auth/login`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/auth/login`
- **Auth Required**: No
- **Headers**: `'Content-Type': 'application/json'`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```

#### How to Call in JavaScript:
```javascript
async function loginUser(email, password) {
  try {
    const response = await fetch('https://task-5-weather-website.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`Login Failed: ${result.message}`);
      return;
    }

    // Save token & user
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));

    alert('Login successful!');
    window.location.href = 'weather.html';
  } catch (error) {
    console.error('Error during login:', error);
  }
}
```

---

### D. User Profile (`GET /api/auth/profile`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/auth/profile`
- **Auth Required**: **Yes** (`Authorization: Bearer <token>`)

#### How to Call in JavaScript:
```javascript
async function getProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('https://task-5-weather-website.vercel.app/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (response.ok) {
      console.log('User Profile:', result.data.user);
    }
  } catch (error) {
    console.error('Failed to get profile:', error);
  }
}
```

---

### E. Current Weather (`GET /api/weather/current`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/weather/current?city=London`
- **Query Parameter**: `city` (e.g. `London`, `Delhi`, `New York`)
- **Auth Required**: **Yes** (`Authorization: Bearer <token>`)

#### How to Call in JavaScript:
```javascript
async function getCurrentWeather(cityName) {
  const token = localStorage.getItem('token');

  try {
    const url = `https://task-5-weather-website.vercel.app/api/weather/current?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`Weather error: ${result.message}`);
      return;
    }

    const weatherData = result.data;
    console.log('Location:', weatherData.location.name, weatherData.location.country);
    console.log('Temp:', weatherData.current.temp_c, '°C');
    console.log('Condition:', weatherData.current.condition.text);

    // Update HTML Elements
    document.getElementById('city').textContent = weatherData.location.name;
    document.getElementById('temp').textContent = `${weatherData.current.temp_c}°C`;
    document.getElementById('icon').src = `https:${weatherData.current.condition.icon}`;
  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
}
```

---

### F. Weather Forecast (`GET /api/weather/forecast`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/weather/forecast?city=London&days=7`
- **Query Parameters**:
  - `city` (required): City name
  - `days` (optional): Number of forecast days (1 to 10, default is 7)
- **Auth Required**: **Yes** (`Authorization: Bearer <token>`)

#### How to Call in JavaScript:
```javascript
async function getWeatherForecast(cityName, days = 7) {
  const token = localStorage.getItem('token');

  try {
    const url = `https://task-5-weather-website.vercel.app/api/weather/forecast?city=${encodeURIComponent(cityName)}&days=${days}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      const forecastDays = result.data.forecast.forecastday;
      console.log('Forecast Days:', forecastDays);
      
      forecastDays.forEach(day => {
        console.log(`Date: ${day.date} | Max Temp: ${day.day.maxtemp_c}°C | Min Temp: ${day.day.mintemp_c}°C`);
      });
    }
  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
}
```

---

### G. City Search / Autocomplete (`GET /api/weather/search`)
- **Full URL**: `https://task-5-weather-website.vercel.app/api/weather/search?q=Lon`
- **Query Parameter**: `q` (minimum 2 characters)
- **Auth Required**: **Yes** (`Authorization: Bearer <token>`)

#### How to Call in JavaScript:
```javascript
async function searchCities(searchQuery) {
  if (searchQuery.length < 2) return;
  const token = localStorage.getItem('token');

  try {
    const url = `https://task-5-weather-website.vercel.app/api/weather/search?q=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Matching Cities:', result.data);
      // Returns array of objects: [{ id, name, region, country, lat, lon }, ...]
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
}
```

---

## 💻 4. Complete HTML + CSS + JS Quickstart Template

Here is a minimal HTML file for your junior developers to test immediately:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weather App Test</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
    input, button { width: 100%; padding: 10px; margin: 5px 0; box-sizing: border-box; }
    .card { background: #f4f4f9; padding: 15px; border-radius: 8px; margin-top: 20px; }
  </style>
</head>
<body>
  <h2>1. Login Form</h2>
  <input type="email" id="email" placeholder="Email" value="john@example.com">
  <input type="password" id="password" placeholder="Password" value="Password123!">
  <button onclick="handleLogin()">Login</button>
  <button onclick="handleSignup()">Signup</button>

  <h2>2. Fetch Weather</h2>
  <input type="text" id="cityInput" placeholder="Enter City (e.g. London)" value="London">
  <button onclick="fetchWeather()">Get Weather</button>

  <div id="result" class="card">Results will appear here...</div>

  <script>
    const API_BASE = 'https://task-5-weather-website.vercel.app/api';

    async function handleSignup() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Demo User', email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.data.token);
        alert('Signup success! Token saved.');
      } else {
        alert(data.message);
      }
    }

    async function handleLogin() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.data.token);
        alert('Login success! Token saved.');
      } else {
        alert(data.message);
      }
    }

    async function fetchWeather() {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login or signup first!');

      const city = document.getElementById('cityInput').value;
      const res = await fetch(`${API_BASE}/weather/current?city=${encodeURIComponent(city)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        const w = data.data;
        document.getElementById('result').innerHTML = `
          <h3>${w.location.name}, ${w.location.country}</h3>
          <p>Temperature: <strong>${w.current.temp_c}°C</strong></p>
          <p>Condition: ${w.current.condition.text}</p>
          <img src="https:${w.current.condition.icon}" />
        `;
      } else {
        alert(data.message);
      }
    }
  </script>
</body>
</html>
```

---
Happy Coding! Your junior developer can copy this entire guide or the HTML template to get started instantly.
