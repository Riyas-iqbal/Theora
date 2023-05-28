const AppError = require("./app.error.util")

const asyncHandler = fn => async (req, res, next) => {
    try {
        console.log('\nreq passed through async handler')
        await fn(req, res, next)
    } catch (error) {
        if(!(error instanceof AppError)) {
            console.log(error)
        }
        return next(error)
    }
}

module.exports = asyncHandler