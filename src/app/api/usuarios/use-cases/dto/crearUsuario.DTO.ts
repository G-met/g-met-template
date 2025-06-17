import { z } from "zod";
import { Role } from "../../dominio/entity";

export interface CrearUsuarioDTO {
  nombre: string;
  apellido: string;
  cargo: string;
  rol: Role;
  correo: string;
}

export const crearUsuarioDTOschema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  cargo: z.string(),
  rol: z.enum([Role.Metrologo, Role.Auxiliar, Role.Consulta, Role.Cordinador]),
  correo: z.string().email(),
});
export const validarCrearUsuarioDto = (usuario: CrearUsuarioDTO) => {
  return crearUsuarioDTOschema.parse(usuario) as CrearUsuarioDTO;
};
