const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //time period 
  max: 20, //max requests 
  message: "Too many requests from this IP, please try again later",
  skipSuccessfulRequests: true,
});

module.exports = authLimiter;