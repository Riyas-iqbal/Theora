const router = require('express').Router();
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const lessonController = require('../../controller/lesson.controller')
const isAuthTutor = require('../../middlewares/tutor.auth');


router
    .route('/')
    .post(isAuthTutor, upload.single('lesson'), lessonController.addLessonToCourse)



 

module.exports = router