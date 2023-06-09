
attachTokenToCookie = (cookieName, Token, res) => {
    console.log('cookie set - https only ? - ',process.env.NODE_ENV === 'production')
    res.cookie(cookieName, Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: false,
        maxAge: 24 * 60 * 60 * 1000
    })
}


module.exports = attachTokenToCookie