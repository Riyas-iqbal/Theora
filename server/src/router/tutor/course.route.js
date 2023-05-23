const router = require('express').Router();
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const courseContoller = require('../../controller/course.controller');
const isAuthTutor = require('../../middlewares/tutor.auth');

/**
* @desc get all courses created by specific tutor
* @route /api/tutor/courses
* @access private
*/

router.route('/').get(isAuthTutor, courseContoller.getAllCourseByTutor)

/**
* @desc create a course 
* @route /api/tutor/courses/create
* @access private
*/

router.route('/create')
    .post(isAuthTutor, upload.single('thumbnail'), courseContoller.createCourse)

/**
* @desc get, update and delete course by tutor
* @route /api/tutor/courses/:id
* @access private
*/

router
    .route('/:id')
    .all(isAuthTutor)
    .get(courseContoller.getSpecificCourse)

    // .put(courseContoller.updateCourse)
    // .delete(courseContoller.deleteCourse)



module.exports = router