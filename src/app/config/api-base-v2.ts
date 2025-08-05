import axios from "axios";

axios.defaults.withCredentials = true;

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.API_DOMAIN
  : process.env.NEXT_PUBLIC_API_BASE_URL;
export const httpBaseV2 = axios.create({
  baseURL,
});

if (!isServer) {
  httpBaseV2.interceptors.request.use(async (config) => {
    const { Clerk } = await import("@clerk/clerk-js");

    const clerk = new Clerk(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
    );
    try {
      await clerk.load();
      const token = await clerk?.session?.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("No se pudo obtener el token de Clerk", error);
    }

    return config;
  });
}
