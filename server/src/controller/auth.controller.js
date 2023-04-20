const User = require('../models/user.model')
const verifyToken = require('../utils/auth.util')
const attachTokenToCookie = require('../utils/cookie.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')
const jwt = require('jsonwebtoken')


// @desc Login
// @route POST /auth/signin
// @access Public

const handleSignIn = async (req, res) => {
    // console.log(req.body)
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details[0].message })
    }

    let userData = await User.findOne({ email: value.email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })

    if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const isPasswordMatch = await comparePasswords(value.password, userData.password)

    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized' })

    userData = userData.toObject()
    delete userData.password


    const accessToken = createAccessToken(userData)
    const refreshToken = createRefreshToken(userData)

    attachTokenToCookie('accessToken', accessToken, res)
    attachTokenToCookie('refreshToken', refreshToken, res)

    await User.updateOne({ _id: userData._id }, { $push: { token: refreshToken } })

    res.status(200).json({ message: 'Login successfull' })
}


// @desc Signup
// @route POST /auth/signup
// @access Public

const handleSignUp = async (req, res) => {
    // console.log(req.body)

    const { error, value } = signUpSchema.validate(req.body)

    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details })
    }

    const { name, password, phone, email } = value

    const isEmailUnique = await User.findOne({ email })
    const isPhoneUnique = await User.findOne({ phone })

    if (isEmailUnique) {
        return res.status(409).json({ message: 'Email already in use' })
    }

    if (isPhoneUnique) {
        return res.status(409).json({ message: 'Phone number already in use' })
    }

    const hashedPassword = await createHashPassword(password)

    const user = new User({
        name,
        email,
        phone,
        password: hashedPassword
    })

    await user.save().catch(error => console.log(error))
    res.status(200).json({ message: 'Account created successfully' })
}


// @desc generate new access token
// @route GET /auth/token
// @access Public

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies['refreshToken']

    if (!refreshToken) {
        return res.status(401).json({ message: 'Provide a access token' })
    }

    const userData = await User.findOne({ token: refreshToken }).select({ email: 1, name: 1, isBlocked: 1 })

    if (!userData) {
        return res.status(401).json({ message: 'Invalid access token please login again' })
    }

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


// @desc Logout
// @route POST /auth/logout
// @access Public

const handleLogout = (req, res) => {
    //delete refresh token from database
    // clear cookie from response
}


module.exports = {
    handleSignIn,
    handleSignUp,
    handleLogout,
    refreshToken
}

