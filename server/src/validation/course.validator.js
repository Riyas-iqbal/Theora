const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.base': 'Title should be a type of text',
            'string.empty': 'Title is required',
            'string.min': 'Title should have a minimum length of {#limit}',
            'string.max': 'Title should have a maximum length of {#limit}',
            'string.alphanum': 'Title should only contain alpha-numeric characters'
        }),

    tagline: Joi.string()
        .min(3)
        .max(60)
        .required()
        .messages({
            'string.base': 'Tagline should be a type of text',
            'string.empty': 'Tagline is required',
            'string.min': 'Tagline should have a minimum length of {#limit}',
            'string.max': 'Tagline exceeded maximum character',
            'string.alphanum': 'Tagline should only contain alpha-numeric characters'
        }),

    about: Joi.string()
        .required(),

    category: Joi.string()
        .required(),

    difficulty: Joi.string()
        .required(),

    price: Joi.number()
        .required()
        .positive()
        .max(1000 * 50),

}).required()

module.exports = { createCourseSchema }