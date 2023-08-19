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

        .then(async (decodedToken) => {
            
            // if email is null in decoded token then get user details using Firebase User id 
            if (!decodedToken?.email) {
                const firebaseUserData = await getAuth().getUser(decodedToken.uid)
                console.log(`Firebase ${decodedToken?.firebase.sign_in_provider} token verified for user: ${decodedToken.name}, ${firebaseUserData.providerData[0].email}`)
                return { ...decodedToken, email: firebaseUserData.providerData[0].email }
            }
            
            console.log(`Firebase ${decodedToken?.firebase.sign_in_provider} token verified for user: ${decodedToken.name}, ${decodedToken.email}`)
            return decodedToken
        })
        .catch((error) => {
            console.log('error while verify id token firebase ', error)
            throw AppError.validation(error.message)
        });
}

module.exports = {
    verifyToken
}

