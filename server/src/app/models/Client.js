const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/database");

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.ENUM('DNI', 'CE', 'PASAPORTE'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "clients",
    timestamps: true,
    hooks: {
      beforeSave: (client) => {
        if (client.fullName) {
          client.fullName = client.fullName.toUpperCase();
        }
      },
    },
  }
);

module.exports = Client;
