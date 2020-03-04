'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isNull : function (val) {
          if(!val) throw new Error('Email is required')
          else return true
        }
        
      }
    },
    isVerifyEmail: DataTypes.INTEGER,
    userType: DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Category,{
      foreignKey: 'userId',
      as: 'categories'
    });
    User.hasMany(models.Token, {
      foreignKey: 'userId',
      as: 'tokens'
    });
    User.belongsTo(models.User_types, {
      foreignKey: 'userType',
      as: 'UserTypes'
    });
  };
  return User;
};
