"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bonuses = Array.from({ length: 20 }).map((_, i) => ({
      bonusCode: `TROMAT-${Math.random().toString(36).substring(2, 7)}`,
      isRedeemed: false,
      redeemedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("bonuses", bonuses);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bonuses", {
      bonusCode: {
        [Sequelize.Op.like]: "TROMAT-%",
      },
    });
  },
};
