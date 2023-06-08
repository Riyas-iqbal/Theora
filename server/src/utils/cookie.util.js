
attachTokenToCookie = (cookieName, Token, res) => {
    console.log('cookie set')
    res.cookie(cookieName, Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge: 24 * 60 * 60 * 1000
    })
}

module.exports = attachTokenToCookie