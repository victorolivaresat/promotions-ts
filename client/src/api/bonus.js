import axios from './axios';

export const cashInBonus = async (formData) => {
  try {
    const { bonusCode, ...rest } = formData;
    const response = await axios.post(`/bonuses/${bonusCode}/cash-in`, rest);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error al canjear el bono');
  }
};

export const validateBonus = async (bonusCode) => {
  try {
    const response = await axios.get(`/bonuses/${bonusCode}/validate`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error al validar el bono');
  }
};
