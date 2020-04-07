'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    isPublic: DataTypes.NUMBER,
    vote: DataTypes.NUMBER,
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Card, {
      as: 'cards',
      foreignKey: 'categoryId'
    });
    Category.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  sequelizePaginate.paginate(Category)
  return Category;
};