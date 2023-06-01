const Joi = require('joi');

const createLessonSchema = Joi.object({
    title: Joi.string().min(3).max(30).trim().required()
        .messages({
            'string.base': 'Title should be a type of text',
            'string.empty': 'Title is required',
            'string.min': 'Title should have a minimum length of {#limit}',
            'string.max': 'Title should have a maximum length of {#limit}',
            'string.alphanum': 'Title should only contain alpha-numeric characters'
        }),

    courseId: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'Course ID is required',
            'string.length': 'Inavalid course'
        }),

    description: Joi.string()
        .required(),

    

}).required()

module.exports = { createLessonSchema }