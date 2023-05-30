const categoryRepository = require('../repository/category.repository');

const getAllCategories = async () => {
    const categories = await categoryRepository.getAllCategories()
    if (!categories.length) {
        console.log('no courses found')
    }
    return categories
}

const createCategory = async (newCategory) => {
    const category = await categoryRepository.createCategory(newCategory)
    return category
}

module.exports = {
    getAllCategories,
    createCategory,
}