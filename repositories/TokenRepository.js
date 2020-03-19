const User = require("../models").User
const Token = require("../models").Token

//[WARN] Need to refactor
exports.clearAToken = async (token) => {
    Token.destroy({
        where: {token : token}
    }).then( function(deletedRow){
        if(deletedRow === 1){
            return 1
        } 
        else return 0
    }).catch(function (error){
        throw error
    })
}
