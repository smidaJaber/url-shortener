import rateLimit from 'express-rate-limit';
const config = require('../config/config.json');

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  handler: (req, res) => { 
    res.status(429).json({ error: config.rateLimit.message });
  },
});

export default limiter;