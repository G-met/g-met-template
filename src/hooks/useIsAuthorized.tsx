import { Role } from "@/app/dashboard/common/types";
import { isRoleAuthorized } from "@/lib/auth/roles-guard";
import { useUser } from "@clerk/nextjs";

export function useIsAuthorized(authorizedRoles: Role[]) {
  const { user } = useUser();
  const currentRole = (user?.publicMetadata.role as Role) ?? Role.Consulta;
  return isRoleAuthorized(authorizedRoles, currentRole);
}
