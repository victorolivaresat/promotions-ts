const Bonus = require("../models/Bonus");
const Client = require("../models/Client");
const BetTicket = require("../models/BetTicket");
const ActionLog = require("../models/ActionLog");
const { sequelize } = require("../../config/database");

const validateBonus = async (req, res) => {
  const { code } = req.params;

  try {
    const bonus = await Bonus.findOne({ where: { bonusCode: code } });

    if (!bonus) {
      return res
        .status(404)
        .json({ success: false, message: "Bono no encontrado" });
    }

    if (bonus.isRedeemed) {
      return res
        .status(400)
        .json({ success: false, message: "El bono ya ha sido canjeado" });
    }

    return res.status(200).json({ success: true, message: "Bono válido" });
  } catch (error) {
    console.error("Error al validar el bono:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error al procesar la validación del bono",
      });
  }
};

const cashInBonus = async (req, res) => {
  const { code } = req.params;
  const { documentNumber, documentType, fullName, ticketCode, userId } =
    req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "El userId es obligatorio" });
  }

  const transaction = await sequelize.transaction();

  try {
    // 1. Validar bono
    const bonus = await Bonus.findOne({
      where: { bonusCode: code },
      transaction,
    });

    if (!bonus) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Bono no encontrado" });
    }

    if (bonus.isRedeemed) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ success: false, message: "El bono ya fue canjeado" });
    }

    // 2. Crear o buscar cliente
    let client = await Client.findOne({
      where: { documentNumber },
      transaction,
    });

    if (!client) {
      client = await Client.create(
        {
          fullName,
          documentNumber,
          documentType,
        },
        { transaction }
      );
    }

    // 3. Registrar ticket
    const ticket = await BetTicket.create(
      {
        ticketCode,
        userId,
        clientId: client.id,
        bonusId: bonus.id,
        registeredAt: new Date(),
      },
      { transaction }
    );

    // 4. Actualizar estado del bono
    await bonus.update(
      {
        isRedeemed: true,
        redeemedAt: new Date(),
        redeemedBy: userId,
      },
      { transaction }
    );

    await ActionLog.create(
      {
        userId,
        action: "BONUS_REDEEM",
        context: {
          bonusCode: bonus.bonusCode,
          ticketCode: ticket.ticketCode,
          clientId: client.id,
        },
        timestamp: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Bono canjeado correctamente",
      data: {
        bonusCode: bonus.bonusCode,
        ticketCode: ticket.ticketCode,
        redeemedAt: bonus.redeemedAt,
        clientName: client.fullName,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al canjear bono:", error);
    return res.status(500).json({
      success: false,
      message: "Error al procesar el canje",
    });
  }
};

module.exports = {
  cashInBonus,
  validateBonus,
};
