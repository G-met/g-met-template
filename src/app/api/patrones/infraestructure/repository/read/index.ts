import { prisma } from "@/lib/prisma";
import { Patron } from "../../../dominio";
import { PatronReadRepository } from "../../../dominio/repository";
import { PatronEntity } from "../../../dominio/entity/intex";
import { Documentos, PaginationOptions } from "@/app/api/common/types";

export class PatronRepositoryReadImp implements PatronReadRepository {
  async obtenerPatronesPorTermino(
    clienteId: string,
    termino: string,
    valor: string,
    paginationOptions: PaginationOptions
  ): Promise<PatronEntity[]> {
    const res = await prisma.patron.findMany({
      skip: paginationOptions.page,
      take: paginationOptions.limit,
      where: {
        [termino]: {
          contains: valor,
        },
        cliente_id: clienteId,
      },
      include: {
        marca: true,
        ubicacion: {
          include: {
            responsable: true,
          },
        },
      },
    });

    return res.map(
      (e) =>
        new PatronEntity({
          id: e.id,
          codigo: e.codigo,
          descripcion: e.descripcion,
          modelo: e.modelo,
          fechaCreacion: e.fecha_creacion,
          serie: e.serie,
          marca: e.marca,
          ubicacion: {
            ...e.ubicacion,
            responsable: {
              ...e.ubicacion.responsable,
              identificacion: e.ubicacion.responsable.identificacion,
              nombre: e.ubicacion.responsable.nombre,
              apellido: e.ubicacion.responsable.apellido,
            },
          },
          documentos: e.documentos as Documentos[],
        })
    );
  }
  async totalPatronesPorTermino(
    clienteId: string,
    termino: string,
    valor: string
  ): Promise<number> {
    return prisma.patron.count({
      where: {
        cliente_id: clienteId,
        [termino]: {
          contains: valor,
        },
      },
    });
  }
  totalPatrones(clienteId: string): Promise<number> {
    return prisma.patron.count({
      where: {
        cliente_id: clienteId,
      },
    });
  }
  async listarPatrones(
    clienteId: string,
    page: number,
    limit: number
  ): Promise<PatronEntity[]> {
    const res = await prisma.patron.findMany({
      where: {
        cliente_id: clienteId,
      },
      take: limit,
      skip: page,
      include: {
        ubicacion: {
          include: {
            responsable: true,
          },
        },
        marca: true,
      },
    });

    return res.map(
      (e) =>
        new PatronEntity({
          id: e.id,
          codigo: e.codigo,
          descripcion: e.descripcion,
          modelo: e.modelo,
          fechaCreacion: e.fecha_creacion,
          serie: e.serie,
          marca: e.marca,
          ubicacion: {
            ...e.ubicacion,
            responsable: {
              ...e.ubicacion.responsable,
              identificacion: e.ubicacion.responsable.identificacion,
              nombre: e.ubicacion.responsable.nombre,
              apellido: e.ubicacion.responsable.apellido,
            },
          },
          documentos: e.documentos as Documentos[],
        })
    );
  }
  async obtenerPorID(ID: string, clienteId: string): Promise<Patron | null> {
    const patron = await prisma.patron.findUnique({
      where: { cliente_id: clienteId, id: ID },
    });
    if (!patron) {
      return null;
    }
    const patronEntity: Patron = {
      id: patron?.id,
      codigo: patron.codigo,
      descripcion: patron.descripcion,
      modelo: patron.modelo,
      serie: patron.serie,
      marca_id: patron.marca_id,
      fecha_creacion: patron.fecha_creacion,
      fecha_actualizacion: patron.fecha_actualizacion,
      fecha_inactivacion: patron.fecha_inactivacion,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
    };
    return patronEntity;
  }
}
