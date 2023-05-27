const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        return next(error)
    }
}

module.exports = asyncHandler