import { prisma } from "@/lib/prisma";
import {
  EjecucionEquipo,
} from "../../dominio/entity";
import { EjecucionEquipoWriteRepository } from "../../dominio/repository";
import { Prisma } from "@prisma/client";
import { Documentos, TipoEjecutor } from "@/app/api/common/types";

export class EjecucionEquipoWriteRepositoryImp
  implements EjecucionEquipoWriteRepository
{
  async crear(
    ejecucionEquipo: EjecucionEquipo
  ): Promise<Omit<EjecucionEquipo, "cliente" | "programacionEquipo">> {
    const res = await prisma.ejecucionEquipos.create({
      data: {
        id: ejecucionEquipo.id,
        observaciones: ejecucionEquipo.observaciones,
        clienteId: ejecucionEquipo.cliente.id,
        fechaEjecucion: ejecucionEquipo.fechaEjecucion,
        programacionEquipoId: ejecucionEquipo.programacionEquipo.id,
        documentos: ejecucionEquipo.documentos as Prisma.JsonArray,
        proveedorId: ejecucionEquipo.proveedor?.id,
        usuarioId: ejecucionEquipo.usuario?.id,
        tipoEjecutor: ejecucionEquipo.tipoEjecutor,
      },
    });

    return {
      fechaEjecucion: res.fechaEjecucion,
      id: res.id,
      observaciones: res.observaciones,
      documentos: res.documentos as Documentos[],
      tipoEjecutor: res.tipoEjecutor as TipoEjecutor,
    };
  }
}
