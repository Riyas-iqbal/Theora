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

    const loggerDev = logger('dev');
    const loggerCombined = logger(localLogFormat, { stream: accessLogStream });
    
    loggerDev(req, res, (err) => {
        if (err) return next(err);
        loggerCombined(req, res, next);
    });
}

module.exports = customLog