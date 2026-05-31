"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "Jerome Buckler",
        email: "jerome@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Navy Suman",
        email: "navy@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "Sasha Nalani",
        email: "sasha@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "Francis Medina",
        email: "francis@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: "Ike Cuevas",
        email: "ike@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: "Zachery Barton",
        email: "zachery@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: "Alberto Lewis",
        email: "alberto@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: "Scott Burton",
        email: "scott@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: "Manuela Harrington",
        email: "manuela@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: "Diego Huang",
        email: "diego@example.com",
        password_hash: "password",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
