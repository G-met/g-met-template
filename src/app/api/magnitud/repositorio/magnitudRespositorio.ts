import { prisma } from "@/src/lib/prisma";
import { MagnitudRepositorio } from ".";
import { Magnitud } from "../dominio";
import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";

export const magnitudRespositorio: MagnitudRepositorio = {
  crearMagnitud: async function (
    dto: CrearMagnitudDto,
    clienteId: string
  ): Promise<Magnitud> {
    return prisma.magnitud.create({
      data: {
        alias: dto.alias,
        cliente_id: clienteId,
        descripcion: dto.descripcion,
      },
    });
  },
  obtenerMagnitudPorId: async function (
    id: string,
    clienteId: string
  ): Promise<Magnitud | null> {
    return prisma.magnitud.findUnique({
      where: {
        id,
        cliente_id: clienteId,
      },
    });
  },
  obtenerMagnitudes: function (clienteId: string): Promise<Magnitud[]> {
    return prisma.magnitud.findMany({ where: { cliente_id: clienteId } });
  },
  obtenerMagnitudPorDescription: async function (
    description: string,
    clienteId: string
  ): Promise<Magnitud | null> {
    return prisma.magnitud.findFirst({
      where: {
        descripcion: description,
        cliente_id: clienteId,
      },
    });
  },
};
