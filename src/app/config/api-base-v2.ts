import axios from "axios";

axios.defaults.withCredentials = true;

const isServer = typeof window === "undefined";

const baseURL = isServer ? process.env.API_DOMAIN : process.env.NEXT_API_DOMAIN;

export const httpBaseV2 = axios.create({
  baseURL,
});
