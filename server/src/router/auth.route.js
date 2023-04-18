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


router.get('/test',(req,res)=>{
    const data = 'Hello world'
    res.send(data.repeat(100000))
})

module.exports = router