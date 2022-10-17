'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jon Doe',
          email: 'jondoe@example.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Marc Sam',
          email: 'ms@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alice John',
          email: 'aj@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Peter Parker',
          email: 'pp@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
