const router = require('express').Router();
const { validateParams } = require('../../middlewares/validate.params')
const isAuth = require('../../middlewares/auth.optional')
const userController = require('../../controller/user.controller')

router
    .route('/enrolled/:id/check')
    .get(validateParams, isAuth, userController.checkCourseEnrolled)

module.exports = router