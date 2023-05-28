const AppError = require("../utils/app.error.util")
const { StatusCodes, ReasonPhrases } = require('http-status-codes')


const errorHandler = (error, req, res, next) => {
    console.log('\nIs Error instance of App Error', error instanceof AppError)

    if (error instanceof AppError) {
        const statusCode = error.statusCode || 500
        console.log('Error Message is -',error.message)
        const responseData = {
            errors: {
                code: error.appCode || StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            }
        }
        return res.status(statusCode).json(responseData)
    }

    console.log('Error is - ', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}

module.exports = errorHandler