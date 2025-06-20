export const Role = {
  Admin: "Admin",
  Metrologo: "Metrologo",
  Auxiliar: "Auxiliar",
  Consulta: "Consulta",
  Cordinador: "Cordinador",
} as const;

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}


export type Role = (typeof Role)[keyof typeof Role];

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  position: string;
  role: Role;
  email: string;
  status: UserStatus;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  role: Role;
  idCode?: string;
}
