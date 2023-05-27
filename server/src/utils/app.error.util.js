const { StatusCodes, ReasonPhrases } =  require('http-status-codes');
const errorCodes =  require('../config/error.codes.js');

/**
 * @desc To throw an error that is not defined
 * @usage throw new AppError (1001,'This is an error message',419)
 * 
 * @desc To throw an error that is defined
 * @usage throw AppError.validation('This is an error message') 
 */

class AppError extends Error {
    constructor(
        appCode = errorCodes.default,
        errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(errorMessage)
        this.appCode = appCode
        this.statusCode = statusCode
    }

    static validation(message = ReasonPhrases.BAD_REQUEST) {
        return new AppError(
            errorCodes.VALIDATION_ERROR,
            message,
            StatusCodes.BAD_REQUEST
        )
    }

    static authentication(message = ReasonPhrases.UNAUTHORIZED) {
        return new AppError(
            errorCodes.AUTHENTICATION_ERROR,
            message,
            StatusCodes.UNAUTHORIZED
        )
    }

    static forbidden(message = ReasonPhrases.FORBIDDEN) {
        return new AppError(errorCodes.FORBIDDEN_ERROR,
            message,
            StatusCodes.FORBIDDEN
        )
    }
}

module.exports = AppError