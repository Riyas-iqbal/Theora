const Course = require('../models/course.model')

const getAllCourses = async () => {
    const courses = await Course.find()
    return courses
}

module.exports = {
    getAllCourses
}