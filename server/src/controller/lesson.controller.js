const { lessonService } = require("../services")
const { createLessonSchema } = require('../validation/lesson.validator')

const addLessonToCourse = async (req, res) => {
    // console.log('tutor - ', req.tutor, '\n body - ', req.body, '\nfile - ', req.file)

    const { value, error } = createLessonSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error?.details[0]?.message })

    const lesson = {
        data: req.body,
        file: req.file,
        tutor: req.tutor
    }

    const thumbnail = await lessonService.addLessonToCourse(lesson)

    res.status(200).json({ message: 'lessson added successfully' })
}


module.exports = {
    addLessonToCourse
}


