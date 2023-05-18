const router = require('express').Router();
const lessonController = require('../../controller/lesson.controller')

router
    .route('/')
    .post(lessonController.addLessonToCourse)

 

module.exports = router