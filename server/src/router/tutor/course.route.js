const router = require('express').Router();
const courseContoller = require('../../controller/course.controller')

/**
* @desc get all courses created by specific tutor
* @route /api/tutor/courses
* @access private
*/

router.route('/')
    .get(courseContoller.getAllCourseByTutor)

/**
* @desc create a course 
* @route /api/tutor/courses/create
* @access private
*/

router.route('/create')
    .post(courseContoller.createCourse)

/**
* @desc get, update and delete course by tutor
* @route /api/tutor/courses/:id
* @access public
*/

router.route('/:id')
    .get(courseContoller.getSpecificCourse)
    .put(courseContoller.updateCourse)
    .delete(courseContoller.deleteCourse)



module.exports = router