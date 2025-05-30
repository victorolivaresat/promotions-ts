'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bonuses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bonusCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isRedeemed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      redeemedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      redeemedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bonuses');
  },
};
