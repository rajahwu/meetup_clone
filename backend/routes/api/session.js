const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const parseCredential = (req, res, next) => {
    if(req.body.email) {
        req.body.credential = req.body.email
    } else if (req.body.username) {
        req.body.credential = req.body.username
    }
    next()
}

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
        handleValidationErrors
];

const router = express.Router();


router.post('/', [parseCredential, validateLogin], async (req, res, next) => {

 
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if(!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid' };
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user })
})

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' })
});

router.get('/', (req, res) => {
    const { user } = req;
    if ( user ) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({user: null}) 
    
})

module.exports = router;