const verifyToken = require('../utils/auth.util')

const isAuth = async (req, res, next) => {

    const accessToken = req.cookies['accessToken'];


    /**
     * @desc for token passed in headers
     * const authHeader = req.headers['authorization']; 
     * const token = authHeader && authHeader.split(' ')[1]
     */

    if (!accessToken) return res.status(401).json({ err: "token is missing" });

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((user) => {
            console.log('token verified', user)
            req.user = user.user;
            next()
        })
        .catch((err) => {
            console.error('token error')
            return res.status(401).json({ err })
        })
}

module.exports = isAuth