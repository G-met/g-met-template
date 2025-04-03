import { prisma } from "@/lib/prisma";
import { Identificacion, Proveedor } from "../../dominio/entity";
import { ProveedorReadRepository } from "../../dominio/repository";
import { Proveedor as ProveedorPrisma } from "@prisma/client";

export class ProveedorReadRepositoryImp implements ProveedorReadRepository {
  private mapToDomainProveedor(
    proveedorPrisma: ProveedorPrisma,
    clienteId: string
  ): Proveedor {
    return new Proveedor({
      id: proveedorPrisma.id,
      nombre: proveedorPrisma.nombre,
      tipoIdetificacion: proveedorPrisma.tipoIdetificacion as Identificacion,
      numeroIdentificacion: proveedorPrisma.numeroIdentificacion,
      direccion: proveedorPrisma.direccion ?? undefined,
      telefono: proveedorPrisma.telefono ?? undefined,
      email: proveedorPrisma.email ?? undefined,
      cliente: { id: clienteId, nombre: "" },
      nombreContacto: proveedorPrisma.nombreContacto ?? undefined,
      telefonoContacto: proveedorPrisma.telefonoContacto ?? undefined,
    });
  }

  async obtenerListadoProveedores(clienteId: string): Promise<Proveedor[]> {
    const res = await prisma.proveedor.findMany({
      where: {
        clienteId,
      },
    });
    return res.map((proveedor) =>
      this.mapToDomainProveedor(proveedor, clienteId)
    );
  }

  async obtenerPorID(id: string, clienteId: string): Promise<Proveedor | null> {
    const res = await prisma.proveedor.findUnique({
      where: {
        clienteId,
        id,
      },
    });

    if (!res) return null;
    return this.mapToDomainProveedor(res, clienteId);
  }

  async obtenerPorIdentificacion(
    id: string,
    clienteId: string
  ): Promise<Proveedor | null> {
    const res = await prisma.proveedor.findUnique({
      where: {
        clienteId,
        numeroIdentificacion: id,
      },
    });

    if (!res) return null;
    return this.mapToDomainProveedor(res, clienteId);
  }

  async listarProveedores(clienteId: string): Promise<Proveedor[]> {
    const res = await prisma.proveedor.findMany({
      where: {
        clienteId: clienteId,
      },
    });

    return res.map((proveedor) =>
      this.mapToDomainProveedor(proveedor, clienteId)
    );
  }
}
