import { CrearProveedorDTO } from "../../dto/crearProveedorDto";
import { ProveedorService } from "../../../dominio/service/index";
import { Proveedor } from "../../../dominio/entity";

interface CrearProveedor {
  execute(clienteId: string, dto: CrearProveedorDTO): Promise<void>;
}

export class CrearProveedorImp implements CrearProveedor {
  constructor(private proveedorService: ProveedorService) {}
  async execute(clienteId: string, dto: CrearProveedorDTO): Promise<void> {
    const proveedorToCreate = new Proveedor({
      nombre: dto.nombre,
      cliente: { id: clienteId, nombre: clienteId },
      direccion: dto.direccion,
      email: dto.email,
      numeroIdentificacion: dto.numeroIdentificacion,
      telefono: dto.telefono,
      tipoIdetificacion: dto.tipoIdetificacion,
      nombreContacto: dto.nombreContacto,
      telefonoContacto: dto.telefonoContacto,
    });
    await this.proveedorService.crear(proveedorToCreate);
  }
}
