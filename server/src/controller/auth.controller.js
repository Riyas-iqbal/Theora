const userService = require('../services/user.service')
const attachTokenToCookie = require('../utils/cookie.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')
const asyncHandler = require('../utils/async.handler.util')
const AppError = require('../utils/app.error.util')

/**
* @desc User Sign in
* @route POST /auth/signin/
* @access public
*
* @body 
* {
*   "email": "user@gmail.com",
*   "password": "password123"
* }
*/

const handleSignIn = asyncHandler(async (req, res) => {
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error.details[0].message)
        throw AppError.validation(error.details[0].message)
    }

    const {
        user,
        accessToken,
        refreshToken
    } = await userService.handleSignIn(value)

    attachTokenToCookie('accessToken', accessToken, res)
    attachTokenToCookie('refreshToken', refreshToken, res)

    console.log('user login successful. user is ', user.name)

    res.status(200).json({ message: 'Login successfull', user })
})

/**
* @desc user signup
* @route  POST /auth/signup
* @access public
*/

const handleSignUp = asyncHandler(async (req, res) => {
    const { error, value } = signUpSchema.validate(req.body)
    if (error) {
        throw AppError.validation(error.details[0].message)
    }
    const user = await userService.handleSignUp(value)

    console.log('New User has been registered - ', value.name, ' with email - ', value.email, ' with phone number', value.phone)

    return res.status(200).json({ message: 'Account created successfully' })
})

/**
 * @desc get user details from token present in access token
 * @route GET /auth/user/restore
 * @access public
 */
const restoreUserDetails = asyncHandler(async (req, res) => {
    if (!req.cookies['accessToken']) {
        return res.status(200).json({ message: 'access token not found', userData: null })
    }

    const userData = await userService.getUserFromToken(req.cookies['accessToken'])

    if (!userData) {
        // clear cookie from response
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
    }

    return res.status(200).json({ message: userData ? 'user details found' : 'user not found', userData })
})


/**
 * @desc verify id token received from client and handle sign in for google authentication
 * @route GET /auth/signin/google/signin
 * @access public
 */
const firebaseSignInVerify = asyncHandler(async (req, res) => {
    const { token } = req.body

    const {
        user,
        accessToken,
        refreshToken
    } = await userService.handleFirebaseSignIn(token)

    attachTokenToCookie('accessToken', accessToken, res)
    attachTokenToCookie('refreshToken', refreshToken, res)

    console.log('user login successful. user is ', user.name)

    res.status(200).json({ message: 'Login successfull', user })
})

/**
* @desc Generate new access token using refresh token
* @route GET /auth/token
* @access public
*/

const refreshToken = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) {
        throw AppError.authentication('provide a refresh token')
    }

    const accessToken = await userService.getAccessTokenByRefreshToken(refreshToken)
    attachTokenToCookie('accessToken', accessToken, res)

    res.status(200).json({ message: 'token created successfully' })
})

/**
* handle user logout
* @route DELETE /auth/logout
* @access public
*/

const handleLogout = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) console.log('refresh token not present in request')

    //delete refresh token from database
    const isTokenPresent = await userService.checkTokenAndDelete(refreshToken)
    if (!isTokenPresent) console.log('token not present in database');

    // clear cookie from response
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    res.status(200).json({ message: 'logout successful' })
})

module.exports = {
    handleSignIn,
    handleSignUp,
    handleLogout,
    refreshToken,
    restoreUserDetails,
    firebaseSignInVerify
}

