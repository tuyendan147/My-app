import axios from "axios";

const baseURL = "http://192.168.48.148:8080/api";
const api = axios.create({
  baseURL: baseURL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
