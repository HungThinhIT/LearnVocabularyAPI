const { check, query } = require('express-validator')

let getDetailCategory = () => {
    return [
        query('pageSize').optional().isInt({min: 1}).withMessage("pageSize is number and minimum is 1"),
        query('page').optional().isInt({min: 1}).withMessage("page is number and minimun is 1")
    ]
} 

let createCategory = () => {
    return [
        check('name')
            .notEmpty().withMessage("Name is required")
            .isLength({max: 255}).withMessage("The maximum of name field is 255 characters"),
        check('isPublic')
            .notEmpty().withMessage("Public is required")
            .isInt({min: 0, max: 1}).withMessage("Public accept only number from 0(non-public) to 1(public)")
    ]
}

let changeName = () => {
    return [
        check('name')
            .notEmpty().withMessage("Name is required")
            .isLength({max: 255}).withMessage("The maximum of name field is 255 characters")
    ]
}
let validate = {
    create : createCategory,
    getDetailCategory: getDetailCategory,
    changeName: changeName
}

module.exports = {validate}