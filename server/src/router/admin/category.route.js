const router = require('express').Router()
const categoryController = require('../../controller/category.controller')

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory)

module.exports = router