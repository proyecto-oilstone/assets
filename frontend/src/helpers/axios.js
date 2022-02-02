import axios from "axios";
import { baseURL } from "./constants";

const headers = {};

if (localStorage.token) {
  headers.Authorization = localStorage.token;
}

const axiosInstance = axios.create({
  baseURL,
  headers,
});

export default axiosInstance;
