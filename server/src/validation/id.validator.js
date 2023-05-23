const Joi = require('joi')

const objectIdSchema = Joi
    .string()
    .hex()
    .length(24)
    .required()
    .messages({
        'string.empty': 'ID is required',
        'string.length': 'Inavalid Id'
    })

module.exports = objectIdSchema
