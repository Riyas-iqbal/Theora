const Course = require('../models/course.model')

const getAllCourses = async () => {
    const courses = await Course.find()
    return courses
}

const findCourseById = async (courseId) => {
    const course = await Course.findById({ _id: courseId })
    if (!course) {
        console.log('Course not found -' + course)
        return false
    }
    return course
}

const getAllCoursesByQuery = async (query) => {
    const courses = await Course
        .find({ title: { $regex: query.search.trim(), $options: "i" } })
        // .select('title price createdAt') 
        .where('category')
        .in(query.category)
        .sort(query.sortBy)
        .skip(query.page * query.limit)
        .limit(query.limit)
    return courses
}

const getCountByQuery = async ({ search, category }) => {
    const total = await Course.countDocuments({
        // category: {$in: [...category]},
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