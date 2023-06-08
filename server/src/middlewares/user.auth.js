const verifyToken = require('../utils/auth.util')

const isAuth = async (req, res, next) => {
    console.log('\nUser isAuth Middleware accessed')

    const accessToken = req.cookies['accessToken'];

    /**
     * @desc for token passed in headers
     * const authHeader = req.headers['authorization'];
     * const token = authHeader && authHeader.split(' ')[1]
     */

    if (!accessToken) return res.status(401).json({ err: "token is missing", name: "TokenMissingError" });

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((response) => {
            if (response.user.role !== 'user') {
                console.log('role is not user');
                return res.status(403).json({ messsage: 'Not Authorized' })
            }
            console.log('token verified - ', response.user.name)
            req.user = response.user;
            next()
        })
        .catch((err) => {
            console.error('token error')
            console.log(err)
            return res.status(401).json({ err })
        })
}

module.exports = isAuth