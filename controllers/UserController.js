const UserRepository = require("../repositories/UserRepository")
const TokenRepository = require("../repositories/TokenRepository")

exports.getUser = async(req, res) => {
    res.status(200).send(req.userInfo)
}

exports.create = async (req, res, next) => {
    UserRepository.create(req.body).
    then(data => ( res.status(201).send(data)))
    .catch(error => (res.status(422).send({error: error.message})
    ))
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
    const isDeleted = await TokenRepository.clearAToken(token)
    .then( function (isOk){
        console.log("CO OK HAY LA KO");
        
        console.log(isOk);
        
    })
}