corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.DOMAIN_URL : process.env.LOCALE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

module.exports = corsOptions