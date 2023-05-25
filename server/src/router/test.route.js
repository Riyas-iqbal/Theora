const router = require('express').Router();
const isAuth = require('../middlewares/user.auth')

/*
 * test private routes
 */

router
    .route('/')
    .post(
        isAuth,
        (req, res) => {
            console.log(req.user)
            res.send(req.user)
        }
    )


module.exports = router