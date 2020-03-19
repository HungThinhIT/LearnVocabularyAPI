const User = require("../models").User
const User_types = require("../models").User_types
const Category = require("../models").Category

exports.getCategory = async(userId) => {
    try {
        const category = await Category.findAll({
            attributes : {exclude:['userId']},
            where:{
                userId : userId
            }
        })
        return category
    } catch (error) {
        throw error
    }
    
}