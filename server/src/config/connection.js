const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then((e) => console.log(`connected to database - ${e.connections[0].name}`))
    } catch (err) {
        console.log(err)
    }
}

if(process.env.FAKE_BUCKET) console.log('Faking S3 bucket')
console.log(process.env.NODE_ENV)

mongoose.connection
    .on('open', () => console.log('Mongoose connected successfully'))
    .on('error', (err) => console.error('Mongoose connection error:', err))

module.exports = connectDB