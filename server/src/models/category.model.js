const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: true,
    },
}, {
    timestamps: true
})

module.exports = model('categories',categorySchema)