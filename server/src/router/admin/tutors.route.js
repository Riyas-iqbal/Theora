const router = require('express').Router()
const tutorController = require('../../controller/tutor.controller')

router
    .route('/')
    .get(tutorController.getAllTutors)

router
    .route('/block')
    .post(tutorController.blockTutor)

router
    .route('/unblock')
    .post(tutorController.unblockTutor)

module.exports = router