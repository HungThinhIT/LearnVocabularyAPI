'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_types = sequelize.define('User_types', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
  User_types.associate = function(models) {
    // associations can be defined here
    User_types.hasOne(models.User, {
      foreignKey: "UserType",
      as: "UserTypes"
    })
  };
  return User_types;
};