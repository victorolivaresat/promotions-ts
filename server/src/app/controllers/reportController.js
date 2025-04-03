const { BetTicket, Client, Bonus, User } = require('../models');
const { Op, fn, col, literal } = require('sequelize');


const getBonusReport = async (req, res) => {
  try {
    const totalBonuses = await Bonus.count();
    const redeemedBonuses = await Bonus.count({ where: { isRedeemed: true } });
    const nonRedeemedBonuses = totalBonuses - redeemedBonuses;
    const dailyRedeemedBonuses = await Bonus.findAll({
      attributes: [
        [fn('DATE', col('redeemedAt')), 'date'],
        [fn('COUNT', col('id')), 'count'],
      ],
      where: {
        isRedeemed: true,
        redeemedAt: {
          [Op.ne]: null,
        },
      },
      group: [fn('DATE', col('redeemedAt'))],
      order: [[literal('date'), 'ASC']],
    });

    res.status(200).json({
      success: true,
      data: {
        totalBonuses,
        redeemedBonuses,
        nonRedeemedBonuses,
        dailyRedeemedBonuses,
      },
    });
  } catch (error) {
    console.error('Error al obtener el reporte de bonos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar el reporte de bonos',
    });
  }
};

const getBetTicketsReport = async (req, res) => {
    try {
      const betTickets = await BetTicket.findAll({
        attributes: ['ticketCode'],
        include: [
          {
            model: Client,
            attributes: ['documentNumber', 'fullName', 'documentType'],
          },
          {
            model: Bonus,
            attributes: ['bonusCode', 'redeemedBy', 'redeemedAt'],
            include: [
              {
                model: User,
                as: 'redeemer',
                attributes: ['userName'],
              },
            ],
          },
        ],
      });
  
      const formattedData = betTickets.map((ticket) => ({
        bonusCode: ticket.Bonus.bonusCode,
        redeemedBy: ticket.Bonus.redeemer?.userName || null,
        redeemedAt: ticket.Bonus.redeemedAt,
        documentNumber: ticket.Client.documentNumber,
        documentType: ticket.Client.documentType,
        clientName: ticket.Client.fullName,
        ticketCode: ticket.ticketCode,
      }));
  
      res.status(200).json({
        success: true,
        data: formattedData,
      });
    } catch (error) {
      console.error('Error al obtener el reporte de tickets de apuesta:', error);
      res.status(500).json({
        success: false,
        message: `Error al procesar el reporte de tickets de apuesta: ${error.message}`,
      });
    }
  };

module.exports = {
  getBonusReport,
  getBetTicketsReport,
};


