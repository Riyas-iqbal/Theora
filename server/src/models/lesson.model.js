const { Schema, model } = require('mongoose')
const { COURSES, USERS, LESSONS } = require('../config/collection')

const lessonSchema = new Schema({
    title: {
        type: String, required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: COURSES,
        required: true
    },
    description: {
        type: String, required: true,
    },
    videoKey: {
        type: String, required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
    },
    likes: [
        { type: Schema.Types.ObjectId, ref: USERS }
    ],
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: USERS },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    reports: [
        {
            user: { type: Schema.Types.ObjectId, ref: USERS },
            reason: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});


module.exports = model(LESSONS, lessonSchema)