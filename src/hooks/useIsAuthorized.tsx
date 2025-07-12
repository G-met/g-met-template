import { Role } from "@/app/api/usuarios/dominio/entity";
import { isRoleAuthorized } from "@/lib/auth/roles-guard";
import { useUser } from "@clerk/nextjs";

export function useIsAuthorized(authorizedRoles: Role[]) {
  const { user } = useUser();
  console.log("User role:", user?.publicMetadata.rol);
  const currentRole = (user?.publicMetadata.rol as Role) ?? Role.Consulta;
  return isRoleAuthorized(authorizedRoles, currentRole);
}
