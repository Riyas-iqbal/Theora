const AppError = require("../utils/app.error.util")
const asyncHandler = require("../utils/async.handler.util")
const { createCategorySchema } = require('../validation/category.validator')
const categoryService = require('../services/category.service')


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories()
    return res.status(200).json({ message: 'Categories found', categories })
})

const createCategory = asyncHandler(async (req, res) => {
    const { value, error } = createCategorySchema.validate(req.body)
    if (error) {
        throw AppError.validation(error.details[0].message)
    }
    const category = await categoryService.createCategory(value)
    return res.status(201).json({ message: 'Category created successfully' })
})

module.exports = {
    getAllCategories,
    createCategory
}