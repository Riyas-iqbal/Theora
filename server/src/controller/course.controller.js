const { createCourseSchema } = require('../validation/course.validator')

const getAllCourseByTutor = (req, res) => {
    res.send('getAllCourseByTutor')
}

const getSpecificCourse = (req, res) => {
    res.send('getSpecificCourse')
}


/**
 * @desc create a new course
 * @route POST /tutor/courses/create
 * @access private
 */

const createCourse = (req, res) => {
    const { value, error} = createCourseSchema.validate(req.body)
    if (error) return res.status(400).json({message: error?.details[0]?.message})

    

    res.json({})
}

const updateCourse = (req, res) => {
    res.send('udpateCourse')
}

const deleteCourse = (req, res) => {
    res.send('deleteCourse')
}

module.exports = {
    getAllCourseByTutor,
    getSpecificCourse,
    createCourse,
    updateCourse,
    deleteCourse
}