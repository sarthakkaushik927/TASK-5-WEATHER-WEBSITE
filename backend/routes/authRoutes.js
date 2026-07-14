import { Router } from 'express';
import { signup, login, getProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/profile', authMiddleware, getProfile);

export default router;
