const router = require('express').Router()
const authController = require('../controller/auth.controller')

router
    .route('/signin')
    .post(
        authController.handleSignIn
    )

router
    .route('/signup')
    .post(
        authController.handleSignUp
    )

router
    .route('/token')
    .get(
        authController.refreshToken
    )

router
    .route('/logout')
    .delete(
        authController.handleLogout
    )

module.exports = router