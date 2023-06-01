require('dotenv').config()
const connectDB = require('./config/connection')

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const compression = require('./middlewares/compression')
const authLimiter = require('./middlewares/rate.limiter')
const customLog = require('./middlewares/logger')
const errorHandler = require('./middlewares/error.handler')
const corsOptions =  require('./config/cors.options')

const app = express()

//Custom Http logging console and local
app.use(customLog)

//Applies gzip compression to responses for better network performance
app.use(compression)

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Limit requests - Brute force attacks to auth endpoint
if (process.env.NODE_ENV === 'production') {
    app.use('/api/auth', authLimiter)
}

// Application Routes
app.use('/api', require('./router'))

app.use('*', (req, res) => {
    res.status(404).json('Not found')
})

app.use(errorHandler)

connectDB()

module.exports = app