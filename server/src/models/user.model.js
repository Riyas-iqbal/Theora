const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number,
    address: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)