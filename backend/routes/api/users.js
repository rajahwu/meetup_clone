const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a vaild email.'),
    check('username')
        .exists({ checkFalsy:true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Password mush be 6 characters or more'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

router.post('/', [validateSignup], async (req, res) => {
   
    const { email, password, username, firstName, lastName } = req.body;
    const checkEmail = await User.findOne({
        where: {email: email}
    })

    const checkUserName = await User.findOne({
        where: { username: username}
    })

    if(checkEmail || checkUserName) {
        const err = new Error('Validation Error')
        err.errors = {} 
        err.statusCode = 400
        err.errors.email = checkEmail ?
        "User with this email already exist" 
        : "User with this username already exist"
        throw err
    }

    let user = await User.signup({ email, username, password, firstName, lastName });
    
    await setTokenCookie(res, user);

    user = JSON.parse(JSON.stringify(user))
    user.token = ""
    delete user.createdAt
    delete user.updatedAt

    return res.json( user );
})

router.use((err, req, res, next) => {
    res.json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})

module.exports = router;

