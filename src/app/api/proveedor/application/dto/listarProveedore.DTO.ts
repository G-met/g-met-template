import { Identificacion, Proveedor } from "../../dominio/entity";

export class ListarProveedoresDTO {
  id: string;
  nombre: string;
  tipoIdentificacion: Identificacion;
  numeroIdentificacion: string;
  telefono: string;
  email: string;
  direccion: string;
  nombreContacto: string;
  telefonoContacto: string;

  static entityToDto(proveedor: Proveedor): ListarProveedoresDTO {
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      tipoIdentificacion: proveedor.tipoIdetificacion as Identificacion,
      numeroIdentificacion: proveedor.numeroIdentificacion,
      telefono: proveedor.telefono,
      email: proveedor.email,
      direccion: proveedor.direccion,
      nombreContacto: proveedor.nombreContacto,
      telefonoContacto: proveedor.telefonoContacto,
    };
  }
}
