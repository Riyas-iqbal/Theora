const verifyToken = require('../utils/auth.util')

const isAuthTutor = async (req, res, next) => {
    console.log('\ntutor isAuth Middleware accessed')

    const accessToken = req.cookies['accessTokenTutor'];

    /**
     * @desc for token passed in headers
     * const authHeader = req.headers['authorization']; 
     * const token = authHeader && authHeader.split(' ')[1]
     */

    if (!accessToken) return res.status(400).json({ err: "token is missing" });

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((response) => {

            if (response.user.role !== 'tutor'){
                console.log('role is not tutor');
                return res.status(403).json({ messsage : 'Not Authorized' })
            } 

            console.log('token verified')
            req.tutor = response.user;
            next()
        })
        .catch((err) => {
            console.error('token error')
            
            if (err?.name == "TokenExpiredError") console.log('token expired')
            else console.log(err)

            return res.status(401).json({ message : err?.message })
        })
}

module.exports = isAuthTutor