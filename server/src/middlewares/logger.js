const logger = require('morgan')
const fs = require('fs');
const path = require('path');

// All HTTP Request will be logged to access.log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' })

// New token for Indian time 
logger.token('indian-time', () => {
    const date = new Date();
    const indianTime = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    return indianTime;
});

// New log format
const localLogFormat = '[:indian-time] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

// Custom log middleware for logging (console and local)
function customLog(req, res, next) {

    const loggerDev = logger(process.env.NODE_ENV === 'production' ? 'dev' : 'dev');
    const loggerCombined = logger(localLogFormat, { stream: accessLogStream });

    loggerDev(req, res, (err) => {
        process.env.NODE_ENV === 'production' && console.log('Users ip is - ',req.headers['X-Forwarded-For'])
        if (err) return next(err);
        loggerCombined(req, res, next);
    });
}

module.exports = customLog