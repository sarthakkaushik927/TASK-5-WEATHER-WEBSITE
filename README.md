# WeatherVue — Weather Dashboard

A full-stack weather application with user authentication and real-time weather data. Built with React + Vite (frontend) and Express (backend), deployed on Vercel using serverless functions.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite 7, Tailwind CSS 4, Framer Motion |
| Backend  | Express.js (Vercel Serverless)      |
| Database | MongoDB Atlas (Mongoose)            |
| Auth     | JWT (JSON Web Tokens), bcryptjs     |
| API      | WeatherAPI.com (proxied via backend)|

## Project Structure

```
├── backend/                    # Backend (Vercel Serverless)
│   ├── index.js                # Express entry point
│   ├── package.json            # Backend dependencies
│   ├── config/
│   │   ├── env.js              # Environment config
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   └── User.js             # User schema
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── errorHandler.js     # Global error handler
│   │   └── rateLimiter.js      # Rate limiting
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── weatherRoutes.js    # Weather endpoints
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── weatherController.js# Weather logic
│   ├── services/
│   │   ├── authService.js      # Auth business logic
│   │   └── weatherService.js   # Weather API proxy
│   └── utils/
│       ├── ApiError.js         # Custom error class
│       ├── asyncHandler.js     # Async wrapper
│       └── validators.js       # Input validation
├── src/                        # Frontend (React + Vite)
│   ├── config/
│   │   └── env.js              # Frontend env config
│   ├── services/
│   │   ├── api.js              # Fetch wrapper + token mgmt
│   │   ├── authService.js      # Auth API calls
│   │   └── weatherService.js   # Weather API calls
│   ├── hooks/
│   │   └── useWeather.js       # Weather data hook
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state provider
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── weather/
│   │   │   ├── WeatherDashboard.jsx
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── Highlights.jsx
│   │   │   ├── HighlightCard.jsx
│   │   │   ├── HourlyForecast.jsx
│   │   │   └── DailyForecast.jsx
│   │   └── ui/
│   │       ├── BackgroundBubbles.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── ErrorAlert.jsx
│   │       ├── SuccessAlert.jsx
│   │       └── InputField.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── pnpm-workspace.yaml         # Monorepo configuration
├── vercel.json                 # Vercel deployment config
├── .env.example
└── package.json                # Frontend dependencies
```

## API Endpoints

| Method | Endpoint              | Auth | Description              |
|--------|-----------------------|------|--------------------------|
| POST   | `/api/auth/signup`    | No   | Register a new user      |
| POST   | `/api/auth/login`     | No   | Login and get JWT        |
| GET    | `/api/auth/profile`   | Yes  | Get user profile         |
| GET    | `/api/weather/forecast` | Yes | Get forecast (query: `city`, `days`) |
| GET    | `/api/weather/current`  | Yes | Get current weather (query: `city`) |
| GET    | `/api/weather/search`   | Yes | Search cities (query: `q`) |
| GET    | `/api/health`         | No   | Health check             |

## Local Development

### 1. Clone and install

```bash
git clone <your-repo-url>
cd TASK-5-WEATHER-WEBSITE
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — a strong random string
- `WEATHER_API_KEY` — get one free at [weatherapi.com](https://www.weatherapi.com/)

### 3. Run the backend

```bash
cd backend
pnpm run dev
```

The Express server starts on `http://localhost:3001`.

### 4. Run the frontend (in a separate terminal)

```bash
# From the root directory
pnpm run dev
```

Vite dev server starts on `http://localhost:5173` and proxies `/api/*` requests to the backend.

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Full stack weather app"
git push origin main
```

### Step 2: Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your GitHub repo
3. Vercel auto-detects the `vercel.json` config and `pnpm-workspace.yaml`

### Step 3: Add Environment Variables

In the Vercel dashboard, go to **Settings → Environment Variables** and add:

| Variable         | Value                              |
|------------------|------------------------------------|
| `MONGODB_URI`    | Your MongoDB Atlas connection URI  |
| `JWT_SECRET`     | A strong random secret string      |
| `WEATHER_API_KEY`| Your WeatherAPI.com key            |
| `NODE_ENV`       | `production`                       |

### Step 4: Deploy

Click **Deploy**. Vercel will:
- Build the Vite frontend into `dist/`
- Deploy `backend/index.js` as a serverless function
- Route `/api/*` to the function and everything else to the static build

### Step 5: Redeploy after env changes

If you update environment variables, trigger a redeploy:
**Deployments → ⋯ → Redeploy**

## Getting a Weather API Key

1. Go to [weatherapi.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it as `WEATHER_API_KEY` in your `.env` and Vercel env vars
