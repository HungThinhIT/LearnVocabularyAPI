const { check } = require('express-validator')

exports.login = [
    check('email').isEmail().withMessage("Your email is not valid"),
    check('password').isLength({min:6}).withMessage("Password is not valid (min is 6 characters)")
]
