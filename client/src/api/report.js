import axios from './axios';

// Obtener el reporte de bonos
export const getBonusReport = async () => {
  try {
    const response = await axios.get('/reports/bonuses');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error al obtener el reporte de bonos');
  }
};

// Obtener el reporte de tickets de apuesta
export const getBetTicketsReport = async () => {
  try {
    const response = await axios.get('/reports/bet-tickets');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error al obtener el reporte de tickets de apuesta');
  }
};
