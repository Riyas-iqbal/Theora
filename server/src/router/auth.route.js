const router = require('express').Router()
const authController = require('../controller/auth.controller')
const authTutorController = require('../controller/auth.tutor.controller')
const authAdminController = require('../controller/auth.admin.controller')
/**
* @desc User Authentcion routes
* @route /api/auth/
* @access public
*/

router
    .route('/signin')
    .post(authController.handleSignIn)

router
    .route('/signup')
    .post(authController.handleSignUp)

router
    .route('/signin/firebase/verify')
    .post(authController.firebaseSignInVerify)

router
    .route('/user/restore')
    .get(authController.restoreUserDetails)

router
    .route('/token')
    .get(authController.refreshToken)

router
    .route('/logout')
    .delete(authController.handleLogout)

/**
* @desc tutor Authentcion routes
* @route /api/auth/tutor
* @access public
*/

router
    .route('/tutor/signin')
    .post(authTutorController.handleSignIn)

router
    .route('/tutor/signup')
    .post(authTutorController.handleSignUp)

router
    .route('/tutor/logout')
    .delete(authTutorController.handleLogout)

/**
* @desc admin Authentcion routes
* @route /api/auth/admin
* @access public
*/

router
    .route('/admin/signin')
    .post(authAdminController.handleSignIn)

router
    .route('/admin/logout')
    .delete(authAdminController.handleLogout)


// router.get('/test', (req, res) => {
//     const data = 'Hello world'
//     res.send(data.repeat(100000))
// })

module.exports = router