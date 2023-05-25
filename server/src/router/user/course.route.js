const router = require('express').Router()
const courseController = require('../../controller/course.controller')
const { validateParams } = require('../../middlewares/validate.params')
const isAuth = require('../../middlewares/user.auth')


router
    .route('/')
    .get(courseController.getAllCourses)

router
    .route('/enroll')
    .all(isAuth)
    .get(courseController.getEnrolledCourses)
    .post(courseController.enrollCourse)

router
    .route('/enroll/:id')
    .get(validateParams ,courseController.getSpecificCourse)

module.exports = router