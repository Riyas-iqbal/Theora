const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    about: String,
    website: String,
    lastName: String,
    age: Number,
    address: String,
    enrolledCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    ],
    isBlocked: {
        type: Boolean,
        default: false
    },
    token: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)