import { EditarProveedorDTO } from "../../dto/editarProveedorDTO";
import { ProveedorService } from "../../../dominio/service/index";
import { Proveedor } from "../../../dominio/entity";

interface EditarProveedor {
  execute(clienteId: string, dto: EditarProveedorDTO): Promise<void>;
}

export class EditarProveedorImp implements EditarProveedor {
  constructor(private proveedorService: ProveedorService) {}
  async execute(clienteId: string, dto: EditarProveedorDTO): Promise<void> {
    const proveedorToCreate = new Proveedor({
      id: dto.id,
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
    await this.proveedorService.editar(proveedorToCreate);
  }
}
