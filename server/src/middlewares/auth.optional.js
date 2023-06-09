const verifyToken = require('../utils/auth.util')

const isAuth = async (req, res, next) => {
    console.log('\nUser isAuth Optional Middleware accessed')

    const accessToken = req.cookies['accessToken'];

    /**
     * @desc for token passed in headers
     * const authHeader = req.headers['authorization'];
     * const token = authHeader && authHeader.split(' ')[1]
     */

    if (!accessToken) {
        console.log('token not found')
        return next()
    }

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((response) => {
            console.log('token verified')
            req.user = response.user;
            next()
        })
        .catch((err) => {
            console.log('error in verify optional token',err)
            req.user = null
            next()
        })
}

module.exports = isAuth