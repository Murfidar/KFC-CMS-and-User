"use strict";

const data = require("../data/user.json");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.forEach((el) => {
      var hash = bcrypt.hashSync(el.password, salt);
      el.password = hash;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
