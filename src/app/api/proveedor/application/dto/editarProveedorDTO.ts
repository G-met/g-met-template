import * as z from "zod";
import { Identificacion } from "../../dominio/entity";

export interface EditarProveedorDTO {
  id: string;
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
  id: z.string(),  
  nombre: z.string(),
  tipoIdetificacion: z.enum(["NIT"]),
  numeroIdentificacion: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  email: z.string().email(),
});
export const validarEditarProveedor = (proveedor: EditarProveedorDTO) => {
  return schema.parse(proveedor) as EditarProveedorDTO;
};
