const Tutor = require('../models/tutor.model')
const verifyToken = require('../utils/auth.util')
const attachTokenToCookie = require('../utils/cookie.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')


// @desc Login
// @route POST /auth/tutor/signin
// @access Public

const handleSignIn = async (req, res) => {
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details[0].message })
    }
    
    let tutorData = await Tutor.findOne({ email: value.email }).select({ email: 1, name: 1, isBlocked: 1, password: 1 })

    if (!tutorData) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const isPasswordMatch = await comparePasswords(value.password, tutorData.password)

    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized' })

    tutorData = tutorData.toObject()
    delete tutorData.password

    console.log(tutorData)

    const accessToken = createAccessToken(tutorData)
    const refreshToken = createRefreshToken(tutorData)

    attachTokenToCookie('accessTokenTutor', accessToken, res)
    attachTokenToCookie('refreshTokenTutor', refreshToken, res)

    await Tutor.updateOne({ _id: tutorData._id }, { $push: { token: refreshToken } })

    res.status(200).json({ message: 'Login successfull' })
}



// @desc Signup
// @route POST /auth/tutor/signup
// @access Public

const handleSignUp = async (req, res) => {

    const { error, value } = signUpSchema.validate(req.body)

    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details })
    }

    const { name, password, phone, email } = value

    const isEmailUnique = await Tutor.findOne({ email })
    const isPhoneUnique = await Tutor.findOne({ phone })

    if (isEmailUnique) {
        return res.status(409).json({ message: 'Email already in use' })
    }

    if (isPhoneUnique) {
        return res.status(409).json({ message: 'Phone number already in use' })
    }

    const hashedPassword = await createHashPassword(password)

    const tutor = new Tutor({
        name,
        email,
        phone,
        password: hashedPassword
    })

    await tutor.save().catch(error => console.log(error))
    res.status(200).json({ message: 'Account created successfully' })
}

/**
 * @desc To clear tokens from cookie and delete from database
 * @route DELETE /auth/tutor/logout
 * @access public
 */

const handleLogout = async (req, res) => {

    const refreshToken = req.cookies['refreshTokenTutor']
    if (!refreshToken) return res.status(400).json({ message: 'refresh token not found' })

    //delete refresh token from database
    const isTokenPresentInDB = await Tutor.findOneAndUpdate({ token: refreshToken }, { $pull: { token: refreshToken } })

    if(!isTokenPresentInDB) console.log('token not present in database');

    // clear cookie from response
    res.clearCookie('refreshTokenTutor')
    res.clearCookie('accessTokenTutor')

    res.status(200).json({ message: 'logout successful' })
}



module.exports = {
    handleSignIn,
    handleSignUp,
    handleLogout
}

