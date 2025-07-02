import { currentUser } from "@clerk/nextjs/server";
type CompanyMetadata = {
  id?: string;
  name?: string;
};

type UserMetadata = {
  company?: CompanyMetadata;
  rol?: string;
};

export const auth = async () => {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata as UserMetadata | undefined;
  return {
    user: {
      clienteId: publicMetadata?.company?.id ?? "",
      rol: publicMetadata?.rol ?? "",
      nombreCliente: publicMetadata?.company?.name ?? "",
    },
  };
};
