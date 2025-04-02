const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");

class BetTicket extends Model {}

BetTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    bonusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bonuses',
        key: 'id',
      },
    },
    registeredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "BetTicket",
    tableName: "bet_tickets",
    timestamps: true,
  }
);

module.exports = BetTicket;
