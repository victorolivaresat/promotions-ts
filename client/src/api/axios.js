import config from "../../app.json";
import axios from "axios";

const apiBaseUrl = config.VITE_API_BASE_URL;
const instance = axios.create({  
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export default instance;