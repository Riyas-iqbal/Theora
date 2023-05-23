const Course = require('../models/course.model')
const bucketService = require('./bucket.service')


const createCourse = async (courseData, tutorId) => {
    const course = new Course({
        title: courseData.title,
        about: courseData.about,
        tutor: tutorId,
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
    await Course.findOneAndUpdate({_id: courseId},{ $push : { lessons: lessonId }})
    return true
}

const getAllCourseByTutor = async (couresId) => {
    const courses = await Course.find({ tutor: couresId }).catch(err => { console.log(err) });
    
    // code refractor needed
    for (let i = 0; i < courses.length; i++) {
        courses[i] = courses[i].toObject()
        courses[i].thumbnailURL = await bucketService.getThumbnailURL(courses[i].thumbnail)
    }

    return courses
}

const getCourseDetails = async (courseId) => {
    let course = await Course
        .findOne({ _id: courseId })
        .populate('lessons')
        .populate('tutor')
        .catch(err => { console.log(err) });
    
    course = course.toObject()
    course.thumbnailURL = await bucketService.getThumbnailURL(course.thumbnail);
    return course
}

module.exports = {
    createCourse,
    getAllCourseByTutor,
    getCourseDetails,
    addLessonToCourse
}