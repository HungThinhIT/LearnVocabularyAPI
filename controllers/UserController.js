const UserRepository = require("../repositories/UserRepository")
const TokenRepository = require("../repositories/TokenRepository")
const bcrypt = require('bcryptjs')

exports.getUser = async(req, res) => {
    res.status(200).send(req.userInfo)
}

exports.create = async (req, res, next) => {
    const {name, email, password} = req.body
    UserRepository.create(name, email, password).
    then(data => ( res.status(201).send(data)))
    .catch(error => {
        res.status(422).send({error: error.errors[0].message})
    })
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    UserRepository.login(email, password)
    .then(user => {
        res.status(200).send(user)
    })
    .catch(error => {
        res.status(401).send(error)
    })
}

exports.logout = async (req, res) => {
    const token = req.userInfo.tokens
    TokenRepository.clearAToken(token)
    .then(user => {
        res.status(200).send({message: "Logout successfully"})
    })
    .catch(error => {
        res.status(401).send(error)
    })
}

//[WARN] Need to refactor
exports.update = async(req, res) => {
    let request = {
        name: req.body.name,
        email: req.body.email
    }
    Object.keys(request).forEach(function (item) {
        if (request[item] == undefined || request[item] == null || request[item] == '') {
            delete request[item]
        }
    })
    const isObjectEmpty = !Object.keys(request).length
    if(isObjectEmpty) return res.status(422).send({error: 'Do not have any input data'})

    //Check if email is duplicate
    let isDuplicate = false
    console.log(req.body);
    
    Object.keys(request).forEach(function (item) {
        if (item == "name" && request[item] == req.userInfo.name) isDuplicate = true
        if (item == "email" && request[item] == req.userInfo.email) delete request[item]
    })

    if(isDuplicate == true) return res.send({error: 'Name is not changed'}) 
    if(Object.keys(request).length === 0 && request.constructor === Object){
        return res.send({error: 'Email is not changed'}) 
    }

    UserRepository.updateById(req.userInfo.id, request)
    .then(user => {
        res.status(200).send({message: "Update information successfully", user})
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({error: error.errors[0].message})
    })
}

//[WARN] Need to refactor   (Add express-validator for validate repassword)
exports.changePassword = async (req, res) => {
    const {oldPassword, password, rePassword} = req.body
    //Validate input
    if(password.localeCompare(rePassword) != 0) res.status(422).send({error: "Password confirmation is wrong"})
    else if(password.localeCompare(oldPassword) == 0) res.status(422).send({error: "Password and old password must be different"})
    
    UserRepository.changePasswordById(req.userInfo.id, oldPassword, password)
    .then(data => {
        res.status(200).send({message: data})
    })
    .catch(error => {
        res.status(500).send({error: error})
    })
    
}