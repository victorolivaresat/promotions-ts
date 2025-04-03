import axios from "./axios";

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const { data } = await axios.get("users");
  return data;
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const { data } = await axios.get(`users/${id}`);
  return data;
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  const { data } = await axios.post("users", user);
  return data;
};

// Actualizar un usuario
export const updateUser = async (id, user) => {
  const { data } = await axios.put(`users/${id}`, user);
  return data;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const { data } = await axios.delete(`users/${id}`);
  return data;
};

// Cambiar el estado de un usuario
export const toggleUserStatus = async (id) => {
  const { data } = await axios.patch(`users/${id}/toggle-status`);
  return data;
};
