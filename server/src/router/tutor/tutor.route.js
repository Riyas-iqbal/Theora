const router = require('express').Router()
const tutorController = require('../../controller/tutor.controller')
router
    .route('/top')
    .get(tutorController.getTopTutors)

module.exports = router