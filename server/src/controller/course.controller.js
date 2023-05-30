const { createCourseSchema } = require('../validation/course.validator')
const { bucketService, courseService } = require('../services')
const objectIdSchema = require('../validation/id.validator')
const courseModel = require('../models/course.model')


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

    console.log(req.query)

    let query = {
        page: parseInt(req.query.page) - 1 || 0,
        limit: parseInt(req.query.limit) || 5,
        search: req.query.search || "",
        sort: req.query.sort || "rating",
        category: req.query.category || "all",
        reqSort: req.query.sort
    }

    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ""
    let sort = req.query.sort || "rating"
    let category = req.query.category || "all"

    let allCategory = ["Advanced Flutter",
        "Thriller",
        "Sci-fi",
        "Music"]

    category = category === 'all' ?
        [...allCategory]
        :
        req.query.category.split(",")

    sort = req.query.sort ? req.query.sort.split(",") : [sort]



    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }

    console.log('name -', search, '-')
    console.log('where - ', 'category')
    console.log('sort - ', sortBy)
    console.log('in - ', category)
    console.log('skip - ', page * limit)
    console.log('limit - ', limit)

    await courseService.getAllCourseByQuery(query)

    return res.status(200).json({ message: 'hi' })


    const data = await courseModel
        .find({ title: { $regex: search.trim(), $options: "i" } })
        // .select('title price createdAt') 
        // .where('category')
        // .in(category)
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)

    const total = await courseModel.countDocuments({
        // category: {$in: [...category]},
        title: { $regex: search, $options: 'i' }
    })

    console.log('total', total)

    console.log(req.query)

    res.json({ data, total })

    // const courses = await courseService.getAllCourses()
    // return res.status(200).json({
    //     message: 'course found',
    //     data: courses
    // })
}

const getSpecificCourse = async (req, res) => {
    const course = await courseService.getCourseDetails(req.params.id)
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