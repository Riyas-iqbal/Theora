const { lessonService } = require("../services")
const { createLessonSchema } = require('../validation/lesson.validator')

const addLessonToCourse = async (req, res) => {
    // console.log('tutor - ', req.tutor, '\n body - ', req.body, '\nfile - ', req.file)

    const { value, error } = createLessonSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error?.details[0]?.message })

    const lesson = {
        data: value,
        file: req.file,
        tutor: req.tutor
    }

    const lessonData = await lessonService.addLessonToCourse(lesson)

    res.status(200).json({ message: 'lessson added successfully' })
}


const getLesson = async (req, res) => {
    const lesson = await lessonService.getLesson(req.params.id)
    return res.status(200).json({ message: "course found successfully", lesson })
}


module.exports = {
    addLessonToCourse,
    getLesson
}


