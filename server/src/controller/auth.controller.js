const User = require('../models/user.model')
const userService = require('../services/user.service')
const verifyToken = require('../utils/auth.util')
const attachTokenToCookie = require('../utils/cookie.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')
const { token } = require('morgan')


/**
* @desc User Sign in
* @route POST /auth/signin/
* @access public
*/

const handleSignIn = async (req, res) => {

    const { error, value } = signInSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    let userData = await userService.findUserByEmail(value.email)
    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const isPasswordMatch = await comparePasswords(value.password, userData.password)
    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized' })

    userData = userData.toObject()
    delete userData.password

    const accessToken = createAccessToken(userData)
    const refreshToken = createRefreshToken(userData)

    attachTokenToCookie('accessToken', accessToken, res)
    attachTokenToCookie('refreshToken', refreshToken, res)

    await userService.addRefreshTokenById(userData._id, refreshToken)

    res.status(200).json({ message: 'Login successfull' })
}

/**
* @desc user signup
* @route  POST /auth/signup
* @access public
*/

const handleSignUp = async (req, res) => {
    // console.log(req.body)

    const { error, value } = signUpSchema.validate(req.body)

    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details })
    }

    const { name, password, phone, email } = value

    const isEmailTaken = userService.checkEmailExists(email)
    if (isEmailTaken) return res.status(409).json({ message: 'Email already in use' })

    const isPhoneTaken = userService.checkPhoneExists(phone)
    if (isPhoneTaken) return res.status(409).json({ message: 'Phone number already in use' })

    const hashedPassword = await createHashPassword(password)

    const user = new User({
        name,
        email,
        phone,
        password: hashedPassword
    })

    await user.save().catch(error => res.status(400).json({ message: error}))
    
    res.status(200).json({ message: 'Account created successfully' })
}

/**
* @desc Generate new access token using refresh token
* @route GET /auth/token
* @access public
*/

const refreshToken = async (req, res) => {

    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) return res.status(401).json({ message: 'Provide a refrsh token' })

    const userData = await userService.findUserByToken(token)
    if (!userData) return res.status(401).json({ message: 'Invalid refresh token please login again' })

    try {
        var result = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }

    if (!result) {
        res.status(400).json({ message: 'invalid' })
    }
    const accessToken = createAccessToken(userData)
    attachTokenToCookie('accessToken', accessToken, res)
    res.status(200).json({ message: 'token created successfully' })
}

/**
* @desc User logout
* @route DELETE /auth/logout
* @access public
*/

const handleLogout = async (req, res) => {

    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) console.log('refresh token not present in request')

    //delete refresh token from database
    const isTokenPresent = await userService.checkTokenAndDelete(refreshToken)
    if (!isTokenPresent) console.log('token not present in database');

    // clear cookie from response
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    res.status(200).json({ message: 'logout successful' })
}

module.exports = {
    handleSignIn,
    handleSignUp,
    handleLogout,
    refreshToken
}

