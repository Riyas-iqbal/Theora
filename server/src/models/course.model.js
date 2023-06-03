const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    tutor: {
        type: Schema.Types.ObjectId, ref: 'tutors', required: true
    },
    about: {
        type: String, required: true,
    },
    tagline: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    difficulty: {
        type: String, required: true
    },
    thumbnail: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    isVisible: {
        type: Boolean, default: true
    },
    lessons: [
        { type: Schema.Types.ObjectId, ref: 'lessons' },
    ]
}, {
    timestamps: true
})

module.exports = model('courses', courseSchema)