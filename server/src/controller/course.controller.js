const { createCourseSchema } = require('../validation/course.validator')
const { bucketService, courseService } = require('../services')
const objectIdSchema = require('../validation/id.validator')


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

const getAllCourses = async (req,res) => {
    const courses = await courseService.getAllCourses()
    return res.status(200).json({
        message: 'course found',
        data: courses
    })
}

const getSpecificCourse = async (req, res) => {
    const course = await courseService.getCourseDetails(req.params.id)
    res.status(200).json({ message: 'course found', data: course })
}

const enrollCourse = async (req, res) => {
    const { error } = await objectIdSchema.validate(req.body.courseId)
    if (error) return res.status(400).json({ message: 'invalid course id'})
    
    console.log(req.user)

    // const isEnrolled = await courseService.enrollCourseById()
    res.status(200).json({ message: 'student enrolled for course successfully', data: req.body })
}

const getEnrolledCourses = async (req,res) => {
    return res.status(200).json({ message: 'success'})
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