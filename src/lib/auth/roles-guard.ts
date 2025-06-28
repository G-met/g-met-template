import { Role } from "@/app/api/usuarios/dominio/entity";

export const rolesGuard = (authorizeRoles: Role[], incomingRole: Role) => {
  if (!authorizeRoles.includes(incomingRole)) {
    return false;
  }
  return true;
};
