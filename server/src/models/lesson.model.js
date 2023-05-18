const { Schema, model } = require('mongoose')

const  lessonSchema = new Schema({
    title: {
        type: String, required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
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
        { type: Schema.Types.ObjectId, ref: 'users' }
    ],
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'users' },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    reports: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'users' },
            reason: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
},{
    timestamps: true
});


module.exports = model('lessons',lessonSchema)