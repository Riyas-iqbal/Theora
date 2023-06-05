const Joi = require('joi')

const userDetailsSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .required()
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of {#limit}',
            'string.max': 'Name should have a maximum length of {#limit}',
            'string.alphanum': 'Name should only contain alpha-numeric characters',
            'any.required': `'name' is a required field`
        }),

    lastName: Joi.string().max(30).optional().empty('')
        .messages({
            'string.base': 'last name should be a type of text',
            'string.max': 'last name should have a maximum length of {#limit}',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': '{{#label}} should be a type of text',
            'string.empty': 'Email is required',
            'string.email': 'Email should be a valid email address',
            'any.required': `Email is required`
        }),

    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.base': 'Phone number should be a type of text',
            'string.empty': 'Phone number is required',
            'string.length': 'Phone number should contain ten characters',
            'string.pattern.base': 'Phone number should only contain numbers',
            'any.required': 'Phone is required field'
        }),

    about: Joi.string()
        .optional()
        .min(3)
        .empty(''),

    website: Joi.string()
        .uri()
        .optional()
        .empty('')
        
}).required()

module.exports = userDetailsSchema