import axios from './axios';

// Obtener el reporte de bonos
export const getBonusReport = async ({ startDate, endDate }) => {
  const response = await axios.get('/reports/bonuses', {
    params: { startDate, endDate },
  });
  return response.data;
};

// Obtener el reporte de tickets de apuesta
export const getBetTicketsReport = async () => {
  const response = await axios.get('/reports/bet-tickets');
  return response.data;
};

// obtener los bonos bloqueados
export const getBetTicketsReportBlocked = async () => {
  const response = await axios.get('/reports/bet-tickets-blocked');
  return response.data;
};
