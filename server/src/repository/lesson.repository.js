const Lesson = require("../models/lesson.model")



const findLessonById = async (lessonId) => {
    const lesson = Lesson.findById({_id: lessonId})
    // .populate('course')
    return lesson
}

module.exports = {
    findLessonById
}