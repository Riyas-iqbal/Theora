const router = require('express').Router()
const categoryController = require('../../controller/category.controller')
const isAuthAdmin = require('../../middlewares/admin.auth')

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(isAuthAdmin, categoryController.createCategory)

module.exports = router