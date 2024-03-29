import NextAuth, { DefaultSession } from "next-auth";

export interface User {
  id: string;
  usuario: string;
  nombre: string;
  apellido: string;
  cargo: string;
  rol: string;
  correo: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_inactivacion?: string | null;
  cliente_id: string;
  cliente: {
    id: string;
    nombre: string;
  };
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
