const router = require('express').Router();
const lessonController = require('../../controller/lesson.controller')

/**
 * @desc get lesson in a specific course
 * @route GET user/lessons
 * @access private
 */

router
    .route('/:id')
    .get(lessonController.getLesson)

module.exports = router;