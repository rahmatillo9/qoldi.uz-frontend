import axios from "axios";


const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000, // 30 sekund
});

// Tokenni har bir requestga qo‘shish
API.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 holatida login sahifasiga redirect qilish
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // to‘g‘ridan-to‘g‘ri login sahifasiga o‘tkazadi
    }
    
    return Promise.reject(error);
  }
);

export default API;
