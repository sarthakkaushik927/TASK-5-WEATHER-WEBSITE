import { Router } from 'express';
import { getForecast, getCurrent, searchCity } from '../controllers/weatherController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { generalLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.use(authMiddleware);
router.use(generalLimiter);

router.get('/forecast', getForecast);
router.get('/current', getCurrent);
router.get('/search', searchCity);

export default router;
