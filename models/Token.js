'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
    Token.belongsTo(models.User,{
      foreignKey: 'userId',
      as: 'tokens',
      onDelete: 'CASCADE'
    });
  };
  return Token;
};