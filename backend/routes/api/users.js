const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    // check('email')
    //     .exists({ checkFalsy: true })
    //     .isEmail()
    //     .withMessage('Please provide a vaild email.'),
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

router.post('/', validateSignup, async (req, res) => {

    let userEmails = await User.findAll({
        attributes: ['email']
    })

    userEmails = JSON.parse(JSON.stringify(userEmails))
    const emails = userEmails.filter(user => user.email === req.body.email)
    if(emails.length) {
        const err = new Error('User already exists')
        err.statusCode = 403
        res.statusCode = 403
        err.errors = {
            email: "User with that email already exists"
        }
        throw err
    }

    if(!req.body.firstName) {
        const err = new Error('Validation Error')
        err.errors = {}
        err.statusCode = 400
        res.statusCode = 400
        err.errors.firstName = "First Name is required"
        throw err
    }

    if(!req.body.lastName) {
        const err = new Error('Validation Error')
        err.errors = {}
        err.statusCode = 400
        res.statusCode = 400
        err.errors.firstName = "Last Name is required"
        throw err
    }

    const emailTest = new RegExp( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if(!emailTest.test(req.body.email)) {
        const err = new Error('Validation Error')
        err.errors = {}
        err.statusCode = 400
        res.statusCode = 400
        err.errors.email = "Invalid Email"
        throw err
    }

    const { email, password, username, firstName, lastName } = req.body;
    let user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    user = JSON.parse(JSON.stringify(user))
    user.token = ""
    delete user.createdAt
    delete user.updatedAt

    return res.json( user );
})

router.use((err, req, res, next) => {
    console.log()
    res.send({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})

module.exports = router;

