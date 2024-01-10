import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: "https://api-clarke-energia.onrender.com",
  timeout: 60000,  
  headers: {
    'Content-Type': 'application/json',
   },
});

export default instance;