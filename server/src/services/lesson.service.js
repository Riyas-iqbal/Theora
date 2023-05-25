const bucketService = require('./bucket.service')
const Lesson = require('../models/lesson.model')
const courseService = require('./course.service')
const lessonRepository = require('../repository/lesson.repository')

const addLessonToCourse = async (lesson) => {
    // console.log(lesson);

    const lessonKey = await bucketService.uploadLesson(lesson)
    if (!lessonKey) {
        console.log('error while uploading lesson to bucket')
        return false
    }

    const lessonModel = new Lesson({
        title: lesson.data.title,
        course: lesson.data.courseId,
        description: lesson.data.description,
        videoKey: lessonKey,
        duration: 60 * 10, // upcoming feature
        order: 0, // upcoming feature
    })

    const lessonData = await lessonModel.save()
        .catch(err => {
            console.log('error while saving lesson', err)
            return false
        })

    
    const data = await courseService.addLessonToCourse(lessonData._id,lesson.data.courseId)
    
    if(!data){
        console.log('error while adding lesson to course')
        return false
    }

    return 'success';
}


const getLesson = async (lessonId) => {
    let lesson = await lessonRepository.findLessonById(lessonId)
    lesson = lesson.toObject()
    lesson.videoURL = await bucketService.getVideoURL(lesson.videoKey)
    return lesson
}

module.exports = {
    addLessonToCourse,
    getLesson
}