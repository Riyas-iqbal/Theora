const User = require('../models/users.model')
const verifyToken = require('../utils/auth.util')
const { createAccessToken, createRefreshToken } = require('../utils/generateTokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')


// @desc Login
// @route POST /auth/signin
// @access Public

const handleSignIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const userData = await User.findOne({ email })

    if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isPasswordMatch = await comparePasswords(password, userData.password)

    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = createAccessToken(userData)
    const refreshToken = createRefreshToken(userData)

    res.status(200).json({ refreshToken, accessToken })
}


// @desc Signup
// @route POST /auth/signup
// @access Public

const handleSignUp = async (req, res) => {
    console.log(req.body)
    const { email, name, password, phone } = req.body


    if (!email || !name || !password || !phone) {
        console.log(email,name,password,phone)
        return res.status(400).json({ message: 'All fields are required' })
    }

    const isEmailUnique = await User.findOne({ email })
    const isPhoneUnique = await User.findOne({ phone })

    if (isEmailUnique) {
        return res.status(409).json({ message: 'Email already in use' })
    }

    if (isPhoneUnique) {
        return res.status(409).json({ message: 'Phone number already in use' })
    }

    const hashedPassword = await createHashPassword(password)

    console.log(hashedPassword)

    const user = new User({
        name,
        email,
        phone,
        password: hashedPassword
    })

    user.save()
        .then((userData)=> userData)
        .catch((error)=>{console.log(error)})
    console.log(userData)
    res.status(200).json({ message : 'Created successfully'})
}


// @desc generate new access token
// @route POST /auth/refresh
// @access Public

const refreshToken = (req,res) => { 
    const refreshToken = req.body.refreshToken
    if (!refreshToken){
        return res.status(401).json({ message: 'Provide a access token' })
    }

    const isValidToken = User.findOne({ token: refreshToken })

    if (!isValidToken) {
        return res.status(401).json({ message: 'Invalid access token' })
    }

    const result = verifyToken(refreshToken)

    if (result) {
        const accessToken = createAccessToken( isValidToken )
        res.status(200).json( accessToken )
    } else {
        res.status(400).json({ message : 'inavlid' })
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

