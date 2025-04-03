const { Sequelize } = require("sequelize");
const config = require("./database.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port || 5432,
    timezone: "America/Lima",
    charset: "UTF-8",
    define: {
      timestamps: true,
    },
    logging: false,
  }
);

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
