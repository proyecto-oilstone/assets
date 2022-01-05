import axios from "axios";

const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

const headers = {};

if (localStorage.token) {
  headers.Authorization = localStorage.token;
}

const axiosInstance = axios.create({
  baseURL,
  headers,
});

export default axiosInstance;
