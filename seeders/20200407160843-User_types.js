'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return queryInterface.bulkInsert('User_types', [{
      name: 'Free member',
      description: 'Free member with categories accesable up to 20',
      type: 1
    },{
      name: 'Silver member',
      description: 'Silver member with categories accesable up to 50',
      type: 2
    },{
      name: 'Gold member',
      description: 'Gold member with categories accesable up to 80',
      type: 3
    },
    {
      name: 'Premium member',
      description: 'Premium member with categories accesable unlimited',
      type: 4
    }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    return queryInterface.bulkDelete('User_types', null, {});
  }
};
