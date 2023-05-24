const IdValidationSchema = require('../validation/id.validator')

const validateParams = (req, res, next) => {
    const ObjectId = req.params.id
    console.log(ObjectId)
    const { error } = IdValidationSchema.validate(ObjectId)
    if (error) {
        return res.status(400).json({ error: error.details[0].message , message: `'${ObjectId}' - is Invalid Id` });
    }
    next()
}

module.exports = {
    validateParams
}