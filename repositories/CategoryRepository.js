const Category = require("../models").Category
const User = require("../models").User
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
        throw error
    }
}