const ActionLog = require("./ActionLog");
const BetTicket = require("./BetTicket");
const Client = require("./Client");
const Bonus = require("./Bonus");
const User = require("./User");

// User ↔ BetTicket
User.hasMany(BetTicket, { foreignKey: 'userId' });
BetTicket.belongsTo(User, { foreignKey: 'userId' });

// Client ↔ BetTicket
Client.hasMany(BetTicket, { foreignKey: 'clientId' });
BetTicket.belongsTo(Client, { foreignKey: 'clientId' });

// Bonus ↔ BetTicket
Bonus.hasOne(BetTicket, { foreignKey: 'bonusId' });
BetTicket.belongsTo(Bonus, { foreignKey: 'bonusId' });

// Bonus ↔ User (redeemer)
Bonus.belongsTo(User, { as: 'redeemer', foreignKey: 'redeemedBy' });
User.hasMany(Bonus, { foreignKey: 'redeemedBy', as: 'redeemedBonuses' });

// ActionLog ↔ User
ActionLog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ActionLog, { foreignKey: 'userId' });

module.exports = {
  ActionLog,
  BetTicket,
  Client,
  Bonus,
  User,
};
