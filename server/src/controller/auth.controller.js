const User = require('../models/user.model')
const verifyToken = require('../utils/auth.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')


// @desc Login
// @route POST /auth/signin
// @access Public

const handleSignIn = async (req, res) => {
    console.log(req.body)
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details[0].message })
    }

    const userData = await User.findOne({ email: value.email })

    if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isPasswordMatch = await comparePasswords(value.password, userData.password)

    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = createAccessToken(userData)
    const refreshToken = createRefreshToken(userData)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // signed: false,
        maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // signed: false,
        maxAge: 24 * 60 * 60 * 1000
    })

    const updateData = User.updateOne({ _id : userData._id })

    res.status(200).json({ message: 'Login successfull' })
}


// @desc Signup
// @route POST /auth/signup
// @access Public

const handleSignUp = async (req, res) => {
    console.log(req.body)

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

    await user.save()
        .then((userData) => {
            console.log(userData)
            return userData
        })
        .catch((error) => { console.log(error) })
    console.log(userData, 'hgtfuy')
    res.status(200).json({ message: 'Created successfully' })
}


// @desc generate new access token
// @route GET /auth/token
// @access Public

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies['accessToken']
    if (!refreshToken) {
        return res.status(401).json({ message: 'Provide a access token' })
    }

    const isValidToken = User.findOne({ token: refreshToken })

    if (!isValidToken) {
        return res.status(401).json({ message: 'Invalid access token' })
    }

    try {
        const result = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

    if (result) {
        const accessToken = createAccessToken(isValidToken)
        res.status(200).json(accessToken)
    } else {
        res.status(400).json({ message: 'invalid' })
    }
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

