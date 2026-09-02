import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import env from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import ApiError from './utils/ApiError.js';

const app = express();

// CORS disabled / wide open for developer access from any origin (HTML/CSS/JS, Live Server, file://, etc.)
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(ApiError.internal('Database connection failed.'));
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Weather API is running.',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

app.use('/api', (req, res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found.`));
});

app.use(errorHandler);

if (process.env.VERCEL !== '1') {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📋 Health check: http://localhost:${env.PORT}/api/health`);
  });
}

export default app;
