const Card = require("../models").Card

exports.countByCategoryId = async(id) => {
    return await Card.count({distinct:true, col: 'id', where:{categoryId: id}})
}   