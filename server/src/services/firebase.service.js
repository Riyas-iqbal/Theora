const admin = require('../config/firebase')
const { getAuth } = require('firebase-admin/auth');
const AppError = require('../utils/app.error.util');

/**
 * Uses the Firebase Admin SDK to validate the ID token and obtain user information.
 * If the token is valid, it returns a decoded token object with user information.
 *
 * @async
 * @param {string} token - The Firebase ID token received from the client.
 * @returns {Promise<Object>} - A Promise that resolves to the decoded token object containing user information.
 *
 */
const verifyToken = async (token) => {
    return getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            console.log(`Firebase google token verified for user: ${decodedToken.name}, ${decodedToken.email}`)
            return decodedToken
        })
        .catch((error) => {
            console.log('error while verify id token firebase ',error)
            throw AppError.validation(error.message)
        });
}

module.exports = {
    verifyToken
}

