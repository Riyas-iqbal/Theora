const router = require('express').Router()
const tutorController = require('../../controller/tutor.controller')
const isAuthAdmin = require('../../middlewares/admin.auth')

router
    .route('/')
    .get(isAuthAdmin, tutorController.getAllTutors)

router
    .route('/block')
    .post(isAuthAdmin, tutorController.blockTutor)

router
    .route('/unblock')
    .post(isAuthAdmin, tutorController.unblockTutor)

module.exports = router