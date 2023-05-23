const router = require('express').Router()
const courseController = require('../../controller/course.controller')
const { validateParams } = require('../../middlewares/validate.params')


router
    .route('/:id')
    .get(validateParams ,courseController.getSpecificCourse)


router
    .route('/enroll')
    .post(courseController.enrollCourse)


module.exports = router