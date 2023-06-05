const router = require('express').Router();
const { validateParams } = require('../../middlewares/validate.params')
const isAuthOptional = require('../../middlewares/auth.optional')
const isAuth = require('../../middlewares/user.auth')
const userController = require('../../controller/user.controller')

router
    .route('/')
    .all(isAuth)
    .get(userController.getUserDetails)
    .post(userController.updateUserDetails)

router
    .route('/enrolled/:id/check')
    .get(validateParams, isAuthOptional, userController.checkCourseEnrolled)

module.exports = router