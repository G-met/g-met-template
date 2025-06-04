import axios from "axios";

axios.defaults.withCredentials = true;

export const httpBaseV2 = axios.create({
  baseURL: "http://localhost:4000/api",
});
