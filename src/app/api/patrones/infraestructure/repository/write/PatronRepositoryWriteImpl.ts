import { prisma } from "@/lib/prisma";
import { PatronEntity } from "../../../dominio/entity/intex";
import { PatronWriteRepository } from "../../../dominio/repository/index";
import { Prisma } from "@prisma/client";
export class PatronWriteRepositoryImp implements PatronWriteRepository {
  async crearDatosBasicos(
    clienteId: string,
    patron: PatronEntity
  ): Promise<void> {
    await prisma.patron.create({
      data: {
        id: patron.id,
        cliente_id: clienteId,
        codigo: patron.codigo,
        descripcion: patron.descripcion,
        modelo: patron.modelo,
        serie: patron.serie,
        marca_id: patron.marca.id,
        tipo_patron_id: "",
        documentos: patron.documentos as Prisma.JsonArray,
        ubicacion_id: patron.ubicacion.id,
      },
    });
  }
}
