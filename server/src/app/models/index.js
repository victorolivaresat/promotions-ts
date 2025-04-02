const ActionLog = require("./ActionLog");
const BetTicket = require("./BetTicket");
const Client = require("./Client");
const Bonus = require("./Bonus");
const User = require("./User");

// User associations
User.hasMany(BetTicket, { foreignKey: 'userId' });
BetTicket.belongsTo(User, { foreignKey: 'userId' });

// Client associations
Client.hasMany(BetTicket, { foreignKey: 'clientId' });
BetTicket.belongsTo(Client, { foreignKey: 'clientId' });

// Bonus associations
Bonus.hasOne(BetTicket, { foreignKey: 'bonusId' });
BetTicket.belongsTo(Bonus, { foreignKey: 'bonusId' });
Bonus.belongsTo(User, { as: 'register', foreignKey: 'registeredBy' });

// ActionLog associations
ActionLog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ActionLog, { foreignKey: 'userId' });

module.exports = {
  ActionLog,
  BetTicket,
  Client,
  Bonus,
  User,
};
