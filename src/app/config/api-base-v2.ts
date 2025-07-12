import axios from "axios";

axios.defaults.withCredentials = true;

const isServer = typeof window === "undefined";

const baseURL = isServer ? process.env.API_DOMAIN : process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("Base URL:", baseURL);
console.log("Is Server:", isServer);
export const httpBaseV2 = axios.create({
  baseURL,
});
