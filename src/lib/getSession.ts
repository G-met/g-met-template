import { NoAutorizado } from "./errors";
import { currentUser } from "@clerk/nextjs/server";
export const auth = async () => {
  const user = await currentUser();
  return {
    user: {
      clienteId: user?.publicMetadata?.company?.id ?? "",
      rol: user?.publicMetadata?.rol ?? "",
      nombreCliente: user?.publicMetadata?.company?.name ?? "",
    },
  };
};
