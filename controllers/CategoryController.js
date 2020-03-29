const CategoryRepository = require("../repositories/CategoryRepository")
const { validationResult } = require('express-validator')

exports.getCategories = async (req, res) => {
    
    const { page = 1, pageSize = 10, isPublic = [0,1], type = "local"} = req.query    
    CategoryRepository.getCategories(req.userInfo.id, +page, +pageSize, isPublic, type)
    .then(data => ( res.status(200).send(data)))
    .catch(error => {
        res.status(422).send({error: error})
    })
}   

exports.getGlobalCategories = async(req, res) => {
    const { page = 1, pageSize = 10, isPublic = [0,1]} = req.query
    CategoryRepository.getCategories(req.userInfo.id, +page, +pageSize, isPublic)
    .then(data => ( res.status(200).send(data)))
    .catch(error => {
        res.status(422).send({error: error})
    })
}