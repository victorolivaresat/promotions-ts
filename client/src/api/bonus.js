import axios from './axios';

export const cashInBonus = async (formData) => {
  const { bonusCode, ...rest } = formData; // Extraer el código del bono y el resto de los datos
  const response = await axios.post(`/bonuses/${bonusCode}/cash-in`, rest); // Enviar el resto de los datos en el cuerpo
  return response.data;
};

export const validateBonus = async (bonusCode) => {
  const response = await axios.get(`/bonuses/${bonusCode}/validate`);
  return response.data;
};
