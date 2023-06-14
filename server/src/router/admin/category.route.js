const router = require('express').Router()
const categoryController = require('../../controller/category.controller')
const isAuthAdmin = require('../../middlewares/admin.auth')

router
    .route('/')
    .all(isAuthAdmin)
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory)

module.exports = router