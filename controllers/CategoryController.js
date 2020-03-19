const CategoryRepository = require("../repositories/CategoryRepository")
const { validationResult } = require('express-validator')

exports.getCategory = async (req, res) => {
    CategoryRepository.getCategory(req.userInfo.id)
    .then(data => ( res.status(200).send(data)))
    .catch(error => {
        res.status(422).send({error: error})
    })
}