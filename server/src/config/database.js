const { Sequelize } = require("sequelize");
require("dotenv").config();

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    timezone: "America/Lima",
    charset: "UTF-8",
  }
);

// Option 2: Using a connection URI
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Synchronize the database
const connect = async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

initializeDatabase();

module.exports = {
  sequelize,
  connect,
};
