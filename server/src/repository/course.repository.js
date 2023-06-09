const Course = require('../models/course.model')

const getAllCourses = async () => {
    const courses = await Course.find()
    return courses
}

const findCourseById = async (courseId) => {
    const course = await Course.findById({ _id: courseId }).select('-__v')
    if (!course) {
        console.log('Course not found -' + course)
        return false
    }
    return course
}

const getAllCoursesByQuery = async (query) => {
    const courses = await Course
        .find({ title: { $regex: query.search.trim(), $options: "i" } })
        .select('-__v') 
        .where('category')
        .in(query.category)
        .where('difficulty')
        .in(query.difficulty)
        .sort(query.sortBy)
        .skip(query.page * query.limit)
        .limit(query.limit)
    return courses
}

const getCountByQuery = async ({ search, category, difficulty }) => {
    const total = await Course.countDocuments({
        category: { $in: [...category] },
        difficulty: { $in: [...difficulty] },
        title: { $regex: search, $options: 'i' }
    })
    return total
}

module.exports = {
    getAllCourses,
    findCourseById,
    getAllCoursesByQuery,
    getCountByQuery
}