import axios from "axios";


const api = axios.create({
  baseURL: 'https://financialcontrol-ly37.onrender.com/',
  withCredentials: true, 
})

export default api;