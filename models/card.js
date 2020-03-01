'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    categoryId: DataTypes.NUMBER,
    frontFace: DataTypes.STRING,
    backFace: DataTypes.STRING,
    isLearned: DataTypes.BOOLEAN,
    cards: DataTypes.NUMBER
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.Category,{
      foreignKey: "categoryId",
      onDelete: 'CASCADE'
    });
  };
  return Card;
};