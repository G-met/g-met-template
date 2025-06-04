export const Role = {
  Admin: "Admin",
  Metrologo: "Metrologo",
  Auxiliar: "Auxiliar",
  Consulta: "Consulta",
  Cordinador: "Cordinador",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  position: string;
  role: Role;
  email: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  role: Role;
  clientId: string;
}
