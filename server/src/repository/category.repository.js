const Category = require('../models/category.model')
const AppError = require('../utils/app.error.util')

const getAllCategories = async () => {
    const categories = await Category
        .find({},'-__v')
        .catch(err=>{
            console.log(err)
            throw AppError.database(err.message)
        })
    console.log('total categories found -',categories.length)
    return categories
}

const getAllCategoriesTitle = async () => {
    const categories = await getAllCategories()
    const categoriesTitle = categories.map(category=>{
        return category.title
    })
    return categoriesTitle
}

const createCategory = async (newCategory) => {
    const category = new Category(newCategory)
    const response = await category
        .save()
        .catch(err => {
            console.log(err)
            throw AppError.database(err.message)
        })
    console.log('category created succesfully -',response.title)
    return response
}

module.exports = {
    getAllCategories,
    getAllCategoriesTitle,
    createCategory
}