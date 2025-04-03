import axios from "./axios";

// Login
export const login = async (email, password) => {
  const { data } = await axios.post("auth/login", { email, password });
  return data;
};

// Logout
export const logout = async () => {
  const { data } = await axios.post('auth/logout');
  return data;
};

// Verify Token
export const verifyToken = async () => {
  const { data } = await axios.get('auth/verify-token');
  return data;
};