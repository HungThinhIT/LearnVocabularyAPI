const { query } = require('express-validator')

let getDetailCategory = () =>{
    return [
        query('pageSize').optional().isInt({min: 1}).withMessage("pageSize is number and minimum is 1"),
        query('page').optional().isInt({min: 1}).withMessage("page is number and minimun is 1")
    ]
} 

let validate = {
    getDetailCategory: getDetailCategory
}

module.exports = {validate}