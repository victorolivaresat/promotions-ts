import axios from './axios';

export const cashInBonus = async (formData) => {
  try {
    const { bonusCode, ...rest } = formData; // Extraer el código del bono y el resto de los datos
    const response = await axios.post(`/bonuses/${bonusCode}/cash-in`, rest); // Enviar el resto de los datos en el cuerpo
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
