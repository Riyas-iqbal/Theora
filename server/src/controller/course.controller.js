const { createCourseSchema } = require('../validation/course.validator')
const { bucketService, courseService } = require('../services')


const createCourse = async (req, res) => {

    console.log(req.tutor)

    const { value, error } = createCourseSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error?.details[0]?.message })

    const isThumbnailUploaded = await bucketService.uploadThumbnailToBucket(value, req.file)
    if (!isThumbnailUploaded) return res.status(500).json({ message: 'error while uploading thumbnail' })

    //contains the file name of thumbnail
    value.thumbnail = isThumbnailUploaded

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

const getSpecificCourse = async (req, res) => {
    const course = await courseService.getCourseDetails(req.params.id)
    console.log(course)
    res.status(200).json({message:'course found',data: course})
}


/**
 * @desc create a new course
 * @route POST /tutor/courses/create
 * @access private
 */


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