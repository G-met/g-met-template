import { Role } from "@/app/dashboard/configuracion/usuario/types";

export const isRoleAuthorized = (authorizeRoles: Role[], incomingRole: Role) => {
  if (!authorizeRoles.includes(incomingRole)) {
    return false;
  }
  return true;
};
