const router = require('express').Router()
const courseController =  require('../../controller/course.controller')


router
    .route('/')
    .get(courseController.getAllCoursesNV)

module.exports = router