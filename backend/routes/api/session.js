const express = require("express");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { handleValidationErrors } = require('../../utils/validation');

const parseCredential = (req, res, next) => {
    const err = new Error()
    err.errors = {}
    const { email, password, credential } = req.body
    if(!email) {
        err.errors.email = 'Email is required'
    }

    if(!password) {
        err.errors.password = 'Password is required'
    }

    if(Object.keys(err.errors).length) {
        err.message = "Validation Error"
        err.statusCode = 400
        throw err
    } 

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

    let user = await User.login({ credential, password });

    if(!user) {
        const err = new Error('Invalid credentials');
        err.title = 'Login Failed'
        err.statusCode = 401;
        err.errors = { credential: 'The provided credentials were invalid' };
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    }})
})

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' })
});

router.get('/', [restoreUser, requireAuth], (req, res) => {
    const { user } = req;
    if ( user ) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({user: null}) 
    
})

router.use((err, req, res, next) => {
    res.status(err.statusCode || 401).json({
       message: err.message,
       status: err.statusCode || 401,
       errors: err.errors
    })

})

module.exports = router;