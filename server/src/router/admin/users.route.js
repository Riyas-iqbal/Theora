const router = require('express').Router()
const userController = require('../../controller/user.controller')

router
    .route('/')
    .get(userController.getAllUsers)


router
    .route('/block')
    .post(userController.blockUser)

router
    .route('/unblock')
    .post(userController.unblockUser)

module.exports = router