'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
    vote: DataTypes.NUMBER,
  }, {});
  Category.associate = function(models) {
    // associations can be defined here\
    Category.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Category.hasMany(models.Card,{
      foreignKey: 'categoryId',
      as: 'category'
    })

  };
  return Category;
};