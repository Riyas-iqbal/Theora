const { createCourseSchema } = require('../validation/course.validator')
const { bucketService, courseService } = require('../services')
const objectIdSchema = require('../validation/id.validator')
const userService = require('../services/user.service')


const createCourse = async (req, res) => {

    const { value, error } = createCourseSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error?.details[0]?.message })

    const thumbnail = await bucketService.uploadThumbnailToBucket(value, req.file)
    if (!thumbnail) return res.status(500).json({ message: 'error while uploading thumbnail' })

    //contains the file name of thumbnail
    value.thumbnail = thumbnail

    const isCourseCreated = await courseService.createCourse(value, req.tutor._id)
    if (!isCourseCreated) return res.status(400).json({ message: err })

    res.status(200).json({ message: 'course created successfully' })
}

const getAllCourseByTutor = async (req, res) => {
    const courses = await courseService.getAllCourseByTutor(req?.tutor._id)
    return res.status(200).json({
        message: 'coures found',
        data: courses
    })
}

const getAllCourses = async (req, res) => {

    let query = {
        page: parseInt(req.query.page) - 1 || 0,
        limit: parseInt(req.query.limit) || 5,
        search: req.query.search || "",
        difficulty: req.query.difficulty || 'all',
        sort: req.query.sort || "createdAt",
        category: req.query.category || "all",
        reqSort: req.query.sort
    }

    const { courses, total } = await courseService.getAllCourseByQuery(query)

    return res.status(200).json({ message: 'Courses found', total, data: courses })
}

/**
 * Get Course details and enrolled students count for a given course id 
 */

const getSpecificCourse = async (req, res) => {
    const course = await courseService.getCourseDetails(req.params.id)
    const totalStudentsEnrolled = await userService.getEnrolledStudentsCount(req.params.id)
    course.totalStudentsEnrolled = totalStudentsEnrolled
    res.status(200).json({ message: 'course found', data: course })
}

const enrollCourse = async (req, res) => {
    const { error } = await objectIdSchema.validate(req.body.courseId)
    if (error) return res.status(400).json({ message: 'invalid course id' })

    const params = {
        courseId: req.body.courseId,
        userId: req.user._id
    }

    const isEnrolled = await courseService.enrollInCourse(params)

    res.status(200).json({ message: 'student enrolled for course successfully', data: req.body })
}

/**
 * Get Course details 
 *  
 * @returns 
 */

const getEnrolledCourses = async (req, res) => {
    const enrolledCourses = await courseService.getEnrolledCourses(req.user._id)
    return res.status(200).json({ message: 'success', data: enrolledCourses })
}


const updateCourse = (req, res) => {
    res.send('udpateCourse')
}

const deleteCourse = (req, res) => {
    res.send('deleteCourse')
}

module.exports = {
    getAllCourseByTutor,
    getAllCourses,
    getSpecificCourse,
    getEnrolledCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse
}