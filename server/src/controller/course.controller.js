const { createCourseSchema } = require('../validation/course.validator')
const { bucketService } = require('../services')


const createCourse = async (req, res) => {

    const { value, error } = createCourseSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error?.details[0]?.message })

    const isThumbnailUploaded = await bucketService.uploadThumbnailToBucket(value,req.file)
    if (!isThumbnailUploaded) return res.status(500).json({ message: 'error while uploading thumbnail'})

    

    res.status(200).json({ message: 'course created successfully' })
}

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