import { prisma } from "@/src/lib/prisma";
import { VariableRespositorio } from ".";
import { Variable } from "../dominio";
import { CrearVariableDto } from "../dtos/crear";

export const variableRepositorio: VariableRespositorio = {
  crearVariable: function (
    dto: CrearVariableDto,
    clienteId: string
  ): Promise<Variable> {
    return prisma.variable.create({
      data: {
        alias: dto.alias,
        cliente_id: clienteId,
        descripcion: dto.descripcion,
        magnitud_id: dto.magnitud_id,
      },
    });
  },
  obtenerTodasVariables: function (clienteId: string): Promise<Variable[]> {
    return prisma.variable.findMany({
      where: { cliente_id: clienteId },
      orderBy: { fecha_creacion: "desc" },
    });
  },
};
