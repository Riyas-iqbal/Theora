const router = require('express').Router()
const userController = require('../../controller/user.controller')
const isAuthAdmin = require('../../middlewares/admin.auth')


router
    .route('/')
    .get(isAuthAdmin, userController.getAllUsers)

router
    .route('/block')
    .post(isAuthAdmin, userController.blockUser)

router
    .route('/unblock')
    .post(isAuthAdmin, userController.unblockUser)

module.exports = router