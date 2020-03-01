'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    categories: DataTypes.NUMBER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Category,{
      foreignKey: 'userId',
      as: 'cards'
    })
  };
  return User;
};