'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Auths', [{
      email: 'example@example.com',
      username: 'John Doe',
      password: 'gunadarma',
      token: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
