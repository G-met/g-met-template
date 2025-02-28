import { prisma } from "@/lib/prisma";
import { EjecucionEquipo } from "../../dominio/entity";
import { EjecucionEquipoReadRepository } from "../../dominio/repository";
import {
  EstadoProgramacion,
  ProgramacionEquipos,
} from "@/app/api/equipos/dominio";
import { Equipo } from "../../../equipos/dominio/index";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";
import { Role, Usuario } from "@/app/api/usuarios/dominio/entity";
import { Documentos } from "@/app/api/common/types";
import { EjecucionEquipos as EjecucionEquiposPrisma } from "@prisma/client";
export class EjecucionEquiposReadRepositoryImp
  implements EjecucionEquipoReadRepository
{
  async obtenerPorID(
    clienteId: string,
    ejecucionId: string
  ): Promise<EjecucionEquipo | null> {
    const res = await prisma.ejecucionEquipos.findUnique({
      where: { clienteId: clienteId, id: ejecucionId },
    });

    if (!res) return null;
  }
  async listar(clienteId: string): Promise<EjecucionEquipo[]> {
    const res = await prisma.ejecucionEquipos.findMany({
      where: { clienteId },
      include: {
        programacionEquipo: {
          include: {
            equipo: true,
          },
        },
        proveedor: true,
        usuario: true,
      },
    });

    return res.map(
      (res) =>
        new EjecucionEquipo({
          id: res.id,
          fechaEjecucion: res.fechaEjecucion,
          observaciones: res.observaciones,
          cliente: { id: clienteId, nombre: clienteId },
          documentos: res.documentos as Documentos[],
          programacionEquipo: new ProgramacionEquipos({
            id: res.programacionEquipo.id,
            estado: res.programacionEquipo.estado as EstadoProgramacion,
            fechaActualizacion: res.programacionEquipo.fechaActualizacion,
            fechaCreacion: res.programacionEquipo.fechaCreacion,
            fechaProgramacion: res.programacionEquipo.fechaProgramacion,
            equipo: new Equipo({
              id: res.programacionEquipo.equipo.id,
              descripcion: res.programacionEquipo.equipo.descripcion,
              codigo: res.programacionEquipo.equipo.codigo,
              cliente_id: clienteId,
              modelo: res.programacionEquipo.equipo.modelo,
              fecha_actualizacion:
                res.programacionEquipo.equipo.fecha_actualizacion,
              fecha_creacion: res.programacionEquipo.equipo.fecha_creacion,
              serie: res.programacionEquipo.equipo.serie,
              marca_id: res.programacionEquipo.equipo.marca_id,
              ubicacion_id: res.programacionEquipo.equipo.ubicacion_id,
            }),
          }),
          proveedor: new Proveedor({
            id: res.proveedor?.id ?? "",
            nombre: res.proveedor?.nombre ?? "",
          }),
          usuario: new Usuario({
            id: res.usuario?.id ?? "",
            nombre: res.usuario?.nombre ?? "",
            apellido: res.usuario?.apellido ?? "",
            correo: res.usuario?.correo ?? "",
            rol: (res.usuario?.rol as Role) ?? Role.Consulta,
            cargo: res.usuario?.cargo ?? "",
          }),
        })
    );
  }

  mapToDomainEjecucionEquipo(
    ejecucionPrisma: EjecucionEquiposPrisma
  ): EjecucionEquipo {
    return new EjecucionEquipo({
      id: ejecucionPrisma.id,
      fechaEjecucion: ejecucionPrisma.fechaEjecucion,
      observaciones: ejecucionPrisma.observaciones,
      cliente: { id: ejecucionPrisma.clienteId, nombre: ejecucionPrisma.clienteId },
      documentos: ejecucionPrisma.documentos as Documentos[],
      programacionEquipo: new ProgramacionEquipos({
        id: ejecucionPrisma.programacionEquipoId,
        estado: ejecucionPrisma.estado as EstadoProgramacion,
        fechaActualizacion: ejecucionPrisma.programacionEquipo.fechaActualizacion,
        fechaCreacion: ejecucionPrisma.programacionEquipo.fechaCreacion,
        fechaProgramacion: ejecucionPrisma.programacionEquipo.fechaProgramacion,
        equipo: new Equipo({
          id: ejecucionPrisma.programacionEquipo.equipo.id,
          descripcion: ejecucionPrisma.programacionEquipo.equipo.descripcion,
          codigo: ejecucionPrisma.programacionEquipo.equipo.codigo,
          cliente_id: clienteId,
          modelo: ejecucionPrisma.programacionEquipo.equipo.modelo,
          fecha_actualizacion:
            ejecucionPrisma.programacionEquipo.equipo.fecha_actualizacion,
          fecha_creacion: ejecucionPrisma.programacionEquipo.equipo.fecha_creacion,
          serie: ejecucionPrisma.programacionEquipo.equipo.serie,
          marca_id: ejecucionPrisma.programacionEquipo.equipo.marca_id,
          ubicacion_id: ejecucionPrisma.programacionEquipo.equipo.ubicacion_id,
        }),
      }),
      proveedor: new Proveedor({
        id: res.proveedor?.id ?? "",
        nombre: res.proveedor?.nombre ?? "",
      }),
      usuario: new Usuario({
        id: res.usuario?.id ?? "",
        nombre: res.usuario?.nombre ?? "",
        apellido: res.usuario?.apellido ?? "",
        correo: res.usuario?.correo ?? "",
        rol: (res.usuario?.rol as Role) ?? Role.Consulta,
        cargo: res.usuario?.cargo ?? "",
      }),
    });
  }
}
