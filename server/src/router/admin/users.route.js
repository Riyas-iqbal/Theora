const router = require('express').Router()
const userController = require('../../controller/user.controller')

router
    .route('/')
    .get(userController.getAllUsers)

module.exports = router