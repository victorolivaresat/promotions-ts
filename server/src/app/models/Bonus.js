const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");

class Bonus extends Model {}

Bonus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bonusCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isRedeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    redeemedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    redeemedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Bonus",
    tableName: "bonuses",
    timestamps: true,
  }
);

module.exports = Bonus;
