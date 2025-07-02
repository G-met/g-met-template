import { Role } from "@/app/api/usuarios/dominio/entity";
import { rolesGuard } from "@/lib/auth/roles-guard";
import { useUser } from "@clerk/nextjs";

export function useIsAuthorized(authorizedRoles: Role[]) {
  const { user } = useUser();
  const currentRole = (user?.publicMetadata.role as Role) ?? Role.Consulta;
  return rolesGuard(authorizedRoles, currentRole);
}
