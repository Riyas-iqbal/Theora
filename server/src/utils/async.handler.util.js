const AppError = require("./app.error.util")

/**
 * Middleware that wraps an asynchronous controller function, providing access to req, res, and next arguments.
 * The wrapped function is executed within a try-catch block to handle any errors.
 *
 * @param {function(req, res, next): Promise<void>} fn - The asynchronous controller function to be wrapped.
 * @returns {function(req, res, next): Promise<void>} - The middleware function.
 */


const asyncHandler = fn => async (req, res, next) => {
    try {
        console.log('\nreq passed through async handler')
        await fn(req, res, next)
    } catch (error) {
        if (!(error instanceof AppError)) {
            console.log(error)
        }
        return next(error)
    }
}

module.exports = asyncHandler