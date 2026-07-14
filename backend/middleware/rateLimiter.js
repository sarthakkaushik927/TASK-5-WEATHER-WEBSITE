import ApiError from '../utils/ApiError.js';

function createRateLimiter({ windowMs = 15 * 60 * 1000, maxRequests = 100 } = {}) {
  const requests = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requests) {
      if (now - value.startTime > windowMs) {
        requests.delete(key);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, startTime: now });
      return next();
    }

    const record = requests.get(ip);

    if (now - record.startTime > windowMs) {
      requests.set(ip, { count: 1, startTime: now });
      return next();
    }

    record.count++;

    if (record.count > maxRequests) {
      return next(ApiError.tooManyRequests());
    }

    next();
  };
}

export const generalLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 100 });
export const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 20 });
export { createRateLimiter };
