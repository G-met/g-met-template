import { Role } from "@/app/api/usuarios/dominio/entity";

export const isRoleAuthorized = (authorizeRoles: Role[], incomingRole: Role) => {
  if (!authorizeRoles.includes(incomingRole)) {
    return false;
  }
  return true;
};
