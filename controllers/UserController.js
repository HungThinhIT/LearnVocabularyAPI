class UserController {

    constructor() {}
    getUser(req, res, next){
        var test = {message: "Hello! This's response from UserController"}
        return res.status(200).send(test)
    }
}

module.exports = UserController