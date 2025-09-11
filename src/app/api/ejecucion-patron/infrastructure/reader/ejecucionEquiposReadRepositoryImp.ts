import { prisma } from "@/lib/prisma";
import { EjecucionPatron } from "../../dominio/entity";
import { EjecucionPatronReadRepository } from "../../dominio/repository";

import { EstadoProgramacion } from "../../../equipos/dominio/index";
import { ProgramacionPatrones } from "@/app/api/programacion-patrones/domain/entity";
import { Patron } from "@/app/api/patrones/dominio";
import { Cliente } from "@/app/api/cliente/dominio/entity";
import { Frecuencia } from "@/app/api/frecuencia/dominio";
import { Actividad } from "@/app/api/actividad/dominio";
import { Documentos } from "@/app/api/common/types";
import { Role, Usuario } from "@/app/api/usuarios/dominio/entity";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";

export class EjecucionPatronesReadRepositoryImp
  implements EjecucionPatronReadRepository
{
  async listar(clienteId: string): Promise<EjecucionPatron[]> {
    const res = await prisma.ejecucionPatrones.findMany({
      where: { clienteId },
      include: {
        programacionPatron: {
          include: {
            patron: true,
          },
        },
        proveedor: true,
        usuario: true,
      },
    });

    return res.map(
      (res) =>
        new EjecucionPatron({
          id: res.id,
          fechaEjecucion: res.fechaEjecucion,
          observaciones: res.observaciones,
          cliente: { id: clienteId, nombre: clienteId },
          documentos: res.documentos as Documentos[],
          programacionPatron: new ProgramacionPatrones({
            id: res.programacionPatron.id,
            estado: res.programacionPatron.estado as EstadoProgramacion,
            fechaActualizacion: res.programacionPatron.fechaActualizacion,
            fechaCreacion: res.programacionPatron.fechaCreacion,
            fechaProgramacion: res.programacionPatron.fechaProgramacion,
            patron: new Patron({
              id: res.programacionPatron.patron.id,
              descripcion: res.programacionPatron.patron.descripcion,
              codigo: res.programacionPatron.patron.codigo,
              modelo: res.programacionPatron.patron.modelo,
              fecha_actualizacion:
                res.programacionPatron.patron.fecha_actualizacion,
              fecha_creacion: res.programacionPatron.patron.fecha_creacion,
              serie: res.programacionPatron.patron.serie,
              marca_id: res.programacionPatron.patron.marca_id,
              ubicacionId: res.programacionPatron.patron.ubicacion_id,
            }),
            actividad: new Actividad(),
            cliente: new Cliente(),
            frecuencia: new Frecuencia(),
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
            rol: (res.usuario?.role as Role) ?? Role.Consulta,
            cargo: res.usuario?.cargo ?? "",
          }),
        })
    );
  }
}
