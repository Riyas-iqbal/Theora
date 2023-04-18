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

router.get('/test',async (req,res)=>{
    console.log(new Date().toLocaleString("en-US", "Asia/Delhi"))
    const data = new Promise((resolve, reject)=>{
        res.send()
    })
    res.send(data)
    console.log(new Date().toLocaleString("en-US", "Asia/Delhi"))
})



router.get('/test1',(req,res)=>{
    console.log(new Date().toLocaleString("en-US", "Asia/Delhi"))
    const data = 'hey it worked!'
    res.send(data.repeat(10000))
})

module.exports = router