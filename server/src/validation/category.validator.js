const Joi = require('joi');

const createCategorySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.base': 'Title should be a type of text',
            'string.empty': 'Title is required',
            'any.required': 'Title is required',
            'string.min': 'Title should have a minimum length of {#limit}',
            'string.max': 'Title should have a maximum length of {#limit}',
            'string.alphanum': 'Title should only contain alpha-numeric characters'
        }),
        
        
        description: Joi.string()
        .required()
        .min(50)
        .max(90)
        .messages({
            'string.base': 'Description should be a type of text',
            'string.empty': 'Description is required',
            'string.min': 'Description should have a minimum length of {#limit}',
            'string.max': 'Description should have a maximum length of {#limit}',
            'any.required': 'Description is required',
        }),

}).required()

module.exports = { createCategorySchema }