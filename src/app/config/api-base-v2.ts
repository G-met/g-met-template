import axios from "axios";

axios.defaults.withCredentials = true;

export const httpBaseV2 = axios.create({
  baseURL: process.env.API_DOMAIN,
});
