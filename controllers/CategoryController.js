const CategoryRepository = require("../repositories/CategoryRepository")
const CardRepository = require("../repositories/CardRepository")
const { validationResult } = require('express-validator')
const functions = require('../core/functions')

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

exports.getCardsInCategory = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }

    const categoryId = req.params.categoryId
    const {page = 1, pageSize = 10} = req.query
    const total = await CardRepository.countByCategoryId(categoryId)
    const { offset, limit, currentPage, pages} = await functions.paginate(+page, +pageSize, total)
    const userId = req.userInfo.id
    CategoryRepository.getCardsByCategoryId(userId, categoryId, offset, limit)
    .then(data => {
        Object.assign(data.dataValues, {currentPage, pages, total});
        res.status(200).send({data})
    })
    .catch(error => {
        if(error.statusCode) res.status(error.statusCode).send({error: error.message})
        else res.status(500).send({error: error.message})
    })
}

exports.createCategory = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }

    const {name, isPublic} = req.body
    const category = { 
        userId: req.userInfo.id, 
        name: name, 
        isPublic: +isPublic,
        vote: 0
    }
    
    CategoryRepository.createCategory(category).then(data => {
        res.status(201).send({message: "Create category successfully", category: data})
    })
    .catch(error => {
        res.status(500).send({error: error.message})
    })
}

exports.changeCategoryName = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }
    const categoryId = req.params.categoryId
    const {name} = req.body
    CategoryRepository.changeCategoryNameById(categoryId, name)
}