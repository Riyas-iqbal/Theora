const mongoose = require('moongose');
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'tutors',
        required: true
    },
    about: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isVisible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('course', courseSchema)