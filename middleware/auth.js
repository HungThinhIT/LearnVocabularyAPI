const jwt = require("jsonwebtoken")
const UserRepositor = require("../repositories/UserRepository")

const auth = async(req, res, next) => {
    try {
        const token = req.get("Authorization").replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await UserRepositor.findByIdAndToken(data.id, token)
        if(!user)
            throw {error: 'Invalid Tokens'}
        req.userInfo = user
        req.userInfo.tokens = token
        next()
    } catch (error) {
        if(error.message == "Cannot read property 'replace' of undefined") return res.status(401).send({error: "Token is missing"})
        if(error.message == "invalid signature") return res.status(401).send({error: "Invalid signature"})
        if(error.message == "jwt malformed") return res.status(401).send({error: "JWT malformed"})
        else res.status(401).send({error: "Not authorized to access this resources"})
    }
}

module.exports = auth