const Course = require('../models/course.model')
const bucketService = require('./bucket.service')
const courseRepository = require('../repository/course.repository')
const userRepository = require('../repository/user.repository')
const categoryRepository = require('../repository/category.repository')


const createCourse = async (courseData, tutorId) => {
    const course = new Course({
        title: courseData.title,
        about: courseData.about,
        tutor: tutorId,
        category: courseData.category,
        difficulty: courseData.difficulty,
        tagline: courseData.tagline,
        thumbnail: courseData.thumbnail,
        price: courseData.price,
    })

    await course.save()
        .catch(err => {
            console.log(err)
            return false
        })

    console.log('course created successfully')
    return true
}

const addLessonToCourse = async (lessonId, courseId) => {
    await Course.findOneAndUpdate({ _id: courseId }, { $push: { lessons: lessonId } })
    return true
}

const getAllCourseByTutor = async (couresId) => {
    const courses = await Course.find({ tutor: couresId, isVerified: true }).catch(err => { console.log(err) });

    // code refractor needed
    for (let i = 0; i < courses.length; i++) {
        courses[i] = courses[i].toObject()
        courses[i].thumbnailURL = await bucketService.getThumbnailURL(courses[i].thumbnail)
    }

    return courses
}

const getAllCourses = async (args) => {

    const courses = await courseRepository.getAllCourses(args)

    // code refractor needed
    for (let i = 0; i < courses.length; i++) {
        courses[i] = courses[i].toObject()
        courses[i].thumbnailURL = await bucketService.getThumbnailURL(courses[i].thumbnail)
    }

    return courses
}

/**
 * Retrieves a list of courses based on the specified query parameters.
 *
 * @param {Object} query - The query parameters for filtering and sorting courses.
 * @param {string} query.difficulty - The difficulty level of the courses ('all', 'beginner', 'intermediate', 'advanced', 'expert').
 * @param {string} query.category - The category of the courses ('all' or an array of category titles).
 * @param {string} query.reqSort - The requested sorting criteria for courses as a comma-separated string.
 * @param {string} query.sort - The actual sorting criteria for courses as a comma-separated string or a single value.
 *
 * @returns {Promise<{total: number, courses: Object[]}>} An object containing the total number of courses and the list of courses with attached thumbnail URLs.
 */
const getAllCourseByQuery = async (query) => {

    query.difficulty = query.difficulty === 'all' ? ['beginner', 'intermediate', 'advanced', 'expert'] : query.difficulty.split(",")
    query.category = query.category === 'all' ? await categoryRepository.getAllCategoriesTitle() : query.category.split(",")
    query.sort = query.reqSort ? query.reqSort.split(",") : [query.sort]
    query.sortBy = {};
    if (query.sort[1]) {
        query.sortBy[query.sort[0]] = query.sort[1];
    } else {
        query.sortBy[query.sort[0]] = "asc";
    }

    const total = await courseRepository.getCountByQuery(query)
    const courses = await courseRepository.getAllCoursesByQuery(query)

    const coursesWithURL = await bucketService.attachThumbnailURLToCourses(courses)

    return { total, courses: coursesWithURL }
}

const getCourseDetails = async (courseId) => {
    let course = await Course
        .findOne({ _id: courseId })
        .populate('lessons')
        .populate('tutor', 'name')
        .catch(err => { console.log(err) });

    course = course.toObject()
    course.thumbnailURL = await bucketService.getThumbnailURL(course.thumbnail);
    return course
}


const enrollInCourse = async ({ courseId, userId }) => {

    const isValidCourse = await courseRepository.findCourseById(courseId)
    if (!isValidCourse) {
        console.log('inavlid course received for enrollment')
        return false
    }

    const isEnrolled = await userRepository.enrollInCourseById({ courseId, userId });
    return isEnrolled
}

const getEnrolledCourses = async (userId) => {
    const coursesEnrolled = await userRepository.getCoursesEnrolled(userId)

    // code refractor needed
    for (let i = 0; i < coursesEnrolled.length; i++) {

        // coursesEnrolled[i] = coursesEnrolled[i].toObject()
        coursesEnrolled[i].thumbnailURL = await bucketService.getThumbnailURL(coursesEnrolled[i].thumbnail)
    }

    return coursesEnrolled
}

module.exports = {
    createCourse,
    getAllCourseByTutor,
    getAllCourses,
    getCourseDetails,
    getEnrolledCourses,
    getAllCourseByQuery,
    enrollInCourse,
    addLessonToCourse,
}