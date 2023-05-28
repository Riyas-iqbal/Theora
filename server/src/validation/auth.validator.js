const Joi = require('joi');

const signInSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email is required',
            'string.email': 'Email should be a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$'))
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password is required',
            // 'string.pattern.base': 'Password should contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long'
        })
})

const signUpSchema = Joi.object({
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

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': '{{#label}} should be a type of text',
            'string.empty': 'Email is required',
            'string.email': 'Email should be a valid email address',
            'any.required': `Email is required`
        }),

    password: Joi.string()
        // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$'))
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'any.required': 'password is required field'
            // 'string.pattern.base': 'Password should contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long'
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
});



module.exports = {
    signInSchema, signUpSchema
};