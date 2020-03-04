const User = require("../models").User
const Token = require("../models").Token
const User_types = require("../models").User_types
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.create = async(name, email, password) => {
    try {        
        const data = await User.create({
            name: name,
            email: email,
            password: await bcrypt.hash(password, 8),
            isVerifyEmail: 0,
            userType: 1,
        });
        return data
    } catch (error) {
        console.log(error);
        throw error 
    }
}

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({
            where: {email: email},
            attributes:{
                exclude: ["UserType","userType"]
            },
            include: [{
                model: User_types,
                as: "UserTypes",
            }]
        })
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
            attributes: { exclude: ["password","UserType","userType"] },
            include: [{
                model: Token,
                as: "tokens",
                where: {token : token},
            },{
                model: User_types,
                as: 'UserTypes'
            }]
        })
        if(!user) return null
        return user.dataValues
    } catch (error) {
        console.log("ERROR IN|[UserRepository]_FindByIdAndToken");
        throw {error: error}
    }
}

exports.updateById = async(userId, request) => {
    try {        
        const isUpdated = await User.update(
            request
            , {
                where: {id: userId}
            }
        )
        console.log("DEBUG IN|[UserRepository]updateById");
        console.log(isUpdated);
        
        if(isUpdated == 1){ // = 1
            return User.findByPk(userId, {
                attributes: { exclude: ["password","UserType","userType"] },
                include: [{
                    model: User_types,
                    as: 'UserTypes'
                }]
            })
        }
        else throw "Update is not successfully"
    } catch (error) {
        console.log("ERROR IN|[UserRepository]updateById");
        console.log(error);
        
        throw error
        
    }
}
