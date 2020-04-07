'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    categoryId: DataTypes.NUMBER,
    frontFace: DataTypes.STRING,
    backFace: DataTypes.STRING,
    isLearned: DataTypes.BOOLEAN,
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
    // Card.belongsTo(models.Category, {
    //   foreignKey: 'categoryId',
    //   as: 'category',
    //   onDelete: 'CASCADE'
    // });
    Card.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'category'})
  };
  sequelizePaginate.paginate(Card)
  return Card;
};