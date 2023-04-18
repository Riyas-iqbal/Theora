const compression = require('compression')

// Apply compression only for text-based responses
function customCompression(req, res, next) {

    const shouldCompress = (req, res) => {
        
        // don't compress responses if this request header is present
        if (req.headers['x-no-compression']) {
            return false;
        }

        // fallback to standard compression
        return compression.filter(req, res);
    };

    compression({
        filter: shouldCompress,
        threshold: '1kb'
    })(req, res, next);
}

module.exports = customCompression