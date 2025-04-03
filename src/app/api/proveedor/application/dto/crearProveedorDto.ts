import * as z from "zod";
import { Identificacion } from "../../dominio/entity";

export interface CrearProveedorDTO {
  nombre: string;
  tipoIdetificacion: Identificacion;
  numeroIdentificacion: string;
  direccion: string;
  telefono: string;
  email: string;
  nombreContacto: string;
  telefonoContacto: string;
}

export const schema = z.object({
  nombre: z.string(),
  tipoIdetificacion: z.enum(["NIT"]),
  numeroIdentificacion: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  email: z.string().email(),
  nombreContacto: z.string(),
  telefonoContacto: z.string(),
});
export const validarCrearProveedor = (proveedor: CrearProveedorDTO) => {
  return schema.parse(proveedor) as CrearProveedorDTO;
};
