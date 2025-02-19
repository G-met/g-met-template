import { prisma } from "@/lib/prisma";
import {  EjecucionPatron } from "../../dominio/entity";
import { EjecucionPatronWriteRepository } from "../../dominio/repository";
import { Prisma } from "@prisma/client";

export class EjecucionPatronWriteRepositoryImp
  implements EjecucionPatronWriteRepository
{
  async crear(ejecucionPatron: EjecucionPatron): Promise<void> {
    await prisma.ejecucionPatrones.create({
      data: {
        id: ejecucionPatron.id,
        observaciones: ejecucionPatron.observaciones,
        clienteId: ejecucionPatron.cliente.id,
        tipoEjecutor: ejecucionPatron.tipoEjecutor,
        proveedorId: ejecucionPatron.proveedor?.id,
        fechaEjecucion: ejecucionPatron.fechaEjecucion,
        documentos: ejecucionPatron.documentos as Prisma.JsonArray,
        programacionPatronId: ejecucionPatron.programacionPatron.id,
      },
    });
  }
}
