require('dotenv').config()
const connectDB = require('./config/connection')

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const compression = require('./middlewares/compression')
const authLimiter = require('./middlewares/rate.limiter')
const customLog = require('./middlewares/logger')

const app = express()

//Custom Http logging console and local
app.use(customLog)

//Applies gzip compression to responses for better network performance
app.use(compression)

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Limit requests - Prevents DDos, Dos and Brute force attacks
if (process.env.NODE_ENV === 'production') {
    app.use('/api/auth', authLimiter)
}

// Routes
app.use('/api', require('./router'))

app.use('*', (req, res) => {
    res.status(404).json('Not found')
})

connectDB()

module.exports = app