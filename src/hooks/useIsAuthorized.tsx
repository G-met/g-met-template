import { Role } from "@/app/api/usuarios/dominio/entity";
import { isRoleAuthorized } from "@/lib/auth/roles-guard";
import { useUser } from "@clerk/nextjs";

export function useIsAuthorized(authorizedRoles: Role[]) {
  const { user } = useUser();
  console.log("User role:", user?.publicMetadata.role);
  const currentRole = (user?.publicMetadata.role as Role) ?? Role.Consulta;
  return isRoleAuthorized(authorizedRoles, currentRole);
}
