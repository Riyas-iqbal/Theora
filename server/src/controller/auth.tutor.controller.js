const Tutor = require('../models/tutor.model')
const tutorService = require('../services/tutor.service')
const verifyToken = require('../utils/auth.util')
const attachTokenToCookie = require('../utils/cookie.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { signInSchema, signUpSchema } = require('../validation/auth.validator')


/**
 * @desc Login
 * @route POST /auth/tutor/signin
 * @access public
 */

const handleSignIn = async (req, res) => {
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details[0].message })
    }

    let tutorData = await tutorService.findTutorByEmail(value.email)
    if (!tutorData) return res.status(401).json({ message: 'Unauthorized' })

    const isPasswordMatch = await comparePasswords(value.password, tutorData.password)
    if (!isPasswordMatch) return res.status(401).json({ message: 'Unauthorized! invalid password' })

    if (tutorData.isBlocked) {
        return res.status(403).json({ message: 'Access denied' })
    }

    tutorData = tutorData.toObject()
    delete tutorData.password

    const accessToken = createAccessToken(tutorData, 'tutor')
    attachTokenToCookie('accessTokenTutor', accessToken, res)

    const refreshToken = createRefreshToken(tutorData)
    attachTokenToCookie('refreshTokenTutor', refreshToken, res)

    await tutorService.addRefreshTokenById(tutorData._id, refreshToken)

    res.status(200).json({ user: tutorData })
}

/**
 * @desc Tutor signup
 * @route POST /auth/tutor/signup
 * @access Public
 */

const handleSignUp = async (req, res) => {

    const { error, value } = signUpSchema.validate(req.body)

    if (error) {
        console.log(error)
        return res.status(400).json({ message: error.details })
    }

    const { name, password, phone, email } = value

    const isEmailTaken = await tutorService.checkEmailExists(email)
    if (isEmailTaken) return res.status(409).json({ message: 'Email already in use' })

    const isPhoneTaken = await tutorService.checkPhoneExists(phone)
    if (isPhoneTaken) return res.status(409).json({ message: 'Phone number already in use' })

    const hashedPassword = await createHashPassword(password)

    const tutor = new Tutor({
        name,
        email,
        phone,
        password: hashedPassword
    })

    console.log('New Tutor has been registered - ', name, ' with email - ', email, ' with phone number', phone)


    await tutor.save().catch(error => console.log(error))
    res.status(200).json({ message: 'Account created successfully' })
}

/**
 * @desc clear tokens from cookie and delete from database
 * @route DELETE /auth/tutor/logout
 * @access public
 */

const handleLogout = async (req, res) => {

    const refreshToken = req.cookies['refreshTokenTutor']
    if (!refreshToken) return res.status(400).json({ message: 'refresh token not found' })

    //delete refresh token from database
    const isTokenPresent = await tutorService.checkTokenAndDelete(refreshToken)

    if (!isTokenPresent) console.log('token not present in database');

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

