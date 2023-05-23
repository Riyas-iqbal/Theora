const router = require('express').Router();
const lessonController = require('../../controller/lesson.controller')
const {validateParams} = require('../../middlewares/validate.params')
/**
 * @desc get lesson in a specific course
 * @route GET user/lessons
 * @access private
 */

router
    .route('/:id')
    .get(validateParams, lessonController.getLesson)

module.exports = router;