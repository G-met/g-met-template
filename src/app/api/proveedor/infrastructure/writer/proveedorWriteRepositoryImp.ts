import { prisma } from "@/lib/prisma";
import { Proveedor } from "../../dominio/entity";
import { ProveedorWriteRepository } from "../../dominio/repository";

export class ProveedorWriteRepositoryImp implements ProveedorWriteRepository {
  async editar(proveedor: Proveedor): Promise<void> {
    await prisma.proveedor.update({
      where: {
        clienteId: proveedor.cliente.id,
        id: proveedor.id,
      },
      data: {
        direccion: proveedor.direccion,
        email: proveedor.email,
        nombre: proveedor.nombre,
        numeroIdentificacion: proveedor.numeroIdentificacion,
        telefono: proveedor.telefono,
        tipoIdetificacion: proveedor.tipoIdetificacion,
        nombreContacto: proveedor.nombreContacto,
        telefonoContacto: proveedor.telefonoContacto,
      },
    });
  }
  async crear(proveedor: Proveedor): Promise<void> {
    await prisma.proveedor.create({
      data: {
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        email: proveedor.email,
        numeroIdentificacion: proveedor.numeroIdentificacion,
        telefono: proveedor.telefono,
        tipoIdetificacion: proveedor.tipoIdetificacion,
        clienteId: proveedor.cliente.id,
        nombreContacto: proveedor.nombreContacto,
        telefonoContacto: proveedor.telefonoContacto,
      },
    });
  }
}
