const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const errorCodes = require('../config/error.codes.js');

/**
 * @desc To throw an error that is not defined
 * @usage ```js
 * throw new AppError (1001,'This is an error message',419)
 * ```
 * 
 * @desc To throw an error that is defined
 * @usage ```js 
 * throw AppError.validation('This is an error message')
 * ``` 
 */

class AppError extends Error {

    /**
     * Constructs an instance of AppError.
     * @param {number} [appCode] - The application-specific error code.
     * @param {string} [message] - The error message.
     * @param {number} [statusCode] - The HTTP status code associated with the error.
     */

    constructor(
        appCode = errorCodes.default,
        errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(errorMessage)
        this.appCode = appCode
        this.statusCode = statusCode
    }

    /**
     * Creates a new instance of AppError with a specific error code and message.
     * @param {string} [message] - The error message.
     * @returns {AppError} - The new AppError instance.
     */

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
        return new AppError(
            errorCodes.FORBIDDEN_ERROR,
            message,
            StatusCodes.FORBIDDEN
        )
    }

    static conflict(message = ReasonPhrases.CONFLICT) {
        return new AppError(
            errorCodes.CONFLICT,
            message,
            StatusCodes.CONFLICT
        )
    }

    static database(message = ReasonPhrases.INTERNAL_SERVER_ERROR) {
        return new AppError(
            errorCodes.DATABASE_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static order(message = 'An unexpected error occured while processing your order') {
        return new AppError(
            errorCodes.ORDER_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static transaction(message = 'An unexpected error occured while processing your transaction') {
        return new AppError(
            errorCodes.TRANSACTION_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static testError(message = 'This is an test error') {
        return new AppError('1000', message, 400)
    }
}

module.exports = AppError