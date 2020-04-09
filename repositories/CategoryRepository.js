const Category = require("../models").Category
const User = require("../models").User
const Card = require("../models").Card
const User_types = require("../models").User_types

exports.getCategories = async(userId, page = 1, pageSize = 10, isPublic = [0,1], type = "local") => {
    try {
        var options = {}
        if(type.localeCompare("global") == 0) {
            console.log("===== INTO GET GLOBAL CATEGORIES ======");
            options = {
                attributes: {exclude:['userId']},
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: User_types,
                        as: "UserTypes"
                    }]
                }],
                page: page, // Default 1
                paginate: pageSize, // Default 25
                order: [['vote']],
                where: { isPublic : 1}
            }
        }
        else { //Type == local
            console.log("===== INTO GET LOCAL CATEGORIES ======");
            options = {
                attributes: {exclude:['userId']},
                page: page,
                paginate: pageSize,
                order: [['id']],
                where: { userId: userId, isPublic : isPublic }
            }
        }        
        const { docs, pages, total } = await Category.paginate(options)
        return { data: docs, currentPage: page, pages, total }
    } catch (error) {   
        throw error.message
    }
}

//NEED TO REFACTOR
//refactor count association in a query
exports.getCardsByCategoryId = async(userId, categoryId, offset, limit) => {
    try {
        const cards = await Category.findOne({        
            include: [{
                model: Card,
                as: 'cards',
                duplicating: false,
                attributes: {exclude: ['categoryId']},
                limit: limit,
                offset: offset
            }],
            where: {id: categoryId, userId: userId},
        })
        if(!cards) throw { message: `Category is not exist`, statusCode: 404}
        return cards
    } catch (error) {
        throw error
    }
}

exports.createCategory = async(category) => {
    try {
        const categoryCreated = await Category.create({
            userId: category.userId,
            name: category.name, 
            isPublic: category.isPublic,
            vote: 0
        })
        if(!categoryCreated.isNewRecord) return categoryCreated.dataValues
        else throw {message: "Error! Category have not created"}
    } catch (error) {
        throw error
    }
}

exports.changeCategoryNameById = async(category) => {
    try {
        //[returning: true] only support for PogrestSQL, so I used findOne and update it via instanceOf 
        let categoryTarget = await Category.findOne({
            where:{
                id:category.categoryId,
                userId: category.userId
            }
        })
        if(!categoryTarget) throw { message: `Category is not exist`, statusCode: 404}        
        categoryTarget.name = category.name
        const categoryUpdated = categoryTarget.save()
        return categoryUpdated
    } catch (error) {
        throw error
    }
}