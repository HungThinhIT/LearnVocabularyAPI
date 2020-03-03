const User = require("../models").User
const Token = require("../models").Token
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.create = async(user) => {
    try {        
        const data = await User.create({
            username: user.username,
            email: user.email,
            password: await bcrypt.hash(user.password, 8),
        });
        return data
    } catch (error) {
        throw error 
    }
}

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({where: {email: email}})
        if(!user) throw {error: "Wrong email or password"}
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) throw {error: "Wrong email or password"}
        // console.log(user);
        const token = await this.generateTokens(user.id)
        if(!token) throw {error: "Can not to create tokens"} 
        user.dataValues.token = token.token
        return user
    } catch (error) {
        throw error
    }
}

exports.generateTokens = async (userId) => {
    try {
        const token = jwt.sign({id: userId}, process.env.JWT_KEY)
        const tokens = await Token.create({
            userId : userId,
            type: "NonModify_WebAPI",
            token: token
        });
        return tokens
        
    } catch (error) {
        return null
    }
}

exports.findByIdAndToken = async(userId, token) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
            include: [{
                model: Token,
                as: "tokens",
                where: {token : token},
            }]
        })
        if(!user) return null
        return user.dataValues
    } catch (error) {
        throw {error: error}
    }
}