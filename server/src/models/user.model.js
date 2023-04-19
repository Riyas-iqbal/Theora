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
    age: Number,
    address: String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    token: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)