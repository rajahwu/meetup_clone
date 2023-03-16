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
    // check('username')
    //     .exists({ checkFalsy:true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //     .not()
    //     .isEmail()
    //     .withMessage('Password mush be 6 characters or more'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

const validateUser = ((req, res, next) => {
   const { email, firstName, lastName} = req.body
   const err = new Error('Validation Error')
   err.errors = {}
    const emailRegex= new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
   if(!email || !emailRegex.test(email)) {
        err.errors.email = "Invalid Email"
   }

   if(!firstName) {
    err.errors.firstName = "First Name is required"
   }

   if(!lastName) {
    err.errors.lastName = "Last Name is required"
   }
   
   if(Object.keys(err.errors).length) {
    err.message = "Validation Error"
    err.statusCode = 400
    throw err
} else {
    next()
}
})

router.post('/', [validateUser, validateSignup], async (req, res) => {
   
    const { email, password, username, firstName, lastName } = req.body;
    const checkEmail = await User.findOne({
        where: {email: email}
    })

    let checkUserName = null
    if(username) {
        checkUserName = await User.findOne({
            where: { username: username}
        })
    }

    if(checkEmail || checkUserName) {
        const err = new Error('Validation Error')
        err.errors = {} 
        err.statusCode = 403
        err.errors.email = checkEmail ?
        "User with this email already exist" 
        : "User with this username already exist"
        throw err
    }

    let user = await User.signup({ email, username, password, firstName, lastName });
    
    await setTokenCookie(res, user);

    user = JSON.parse(JSON.stringify(user))
    user.token = ""

    console.log('login')
    return res.json({user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: user.token
    }});
})

router.use((err, req, res, next) => {
    let status = err.statusCode || 401
   return res.status(status).json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})

module.exports = router;

