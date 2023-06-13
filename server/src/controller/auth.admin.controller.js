const AppError = require("../utils/app.error.util");
const asyncHandler = require("../utils/async.handler.util");
const { createAccessTokenAdmin } = require("../utils/generate.tokens.util");
const attachTokenToCookie = require('../utils/cookie.util')

/**
 * @desc Admin Sign in
 * @route POST /auth/admin/signin/
 * @access public
 */


const handleSignIn = asyncHandler(async (req, res) => {
    const email = process.env.ADMIN_MAIL
    const password = process.env.ADMIN_PASSWORD

    if (req.body.email !== email || req.body.password !== password) {
        throw AppError.validation('Invalid email or password')
    }

    const adminAccessToken = createAccessTokenAdmin()

    attachTokenToCookie('adminToken', adminAccessToken, res)

    console.log('admin login successful ', new Date().toLocaleString())
    res.status(200).json({ message: 'admin login successful', isAuth: true })
})

const handleLogout = asyncHandler(async (req, res) => {
    const adminAccessToken = req.cookies['adminAccessToken']
    if (!adminAccessToken) {
        console.log('admin access token not found')
    }

    res.clearCookie('adminToken')
    res.status(200).json({ message: 'admin log out successful'})
})

module.exports = {
    handleSignIn,
    handleLogout
}