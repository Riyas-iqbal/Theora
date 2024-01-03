const Course = require('../models/course.model')

const getAllCourses = async ({ filter }) => {
    const queryfilter = () => {
        if (filter === 'all') {
            return {}
        } else if (filter === 'unverified') {
            return { isVerified: false }
        } else {
            return { isVerified: true }
        }
    }
    console.log(queryfilter)
    const courses = await Course.find(queryfilter())
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
        .find({ title: { $regex: query.search.trim(), $options: "i" }, isVerified: true })
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
        title: { $regex: search, $options: 'i' },
        isVerified: true
    })
    return total
}

module.exports = {
    getAllCourses,
    findCourseById,
    getAllCoursesByQuery,
    getCountByQuery
}