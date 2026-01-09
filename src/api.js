import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "api-key": "kajal",
    "Content-Type": "application/json",
  },
});

export default api;
