const Course = require('../models/course.model')

const getAllCourses = async () => {
    const courses = await Course.find()
    return courses
}

const findCourseById = async (courseId) => {
    const course = await Course.findById({ _id: courseId })
    if (!course) {
        console.log('Course not found -'+course )
        return false
    }
    return course
}

module.exports = {
    getAllCourses,
    findCourseById
}