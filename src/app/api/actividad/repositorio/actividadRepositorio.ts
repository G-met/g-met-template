import { prisma } from "@/src/lib/prisma";
import { Actividad } from "../dominio";
import { CrearActividadDto } from "../dtos/crear";
import { ActividadRepositorio } from "./index";
export const actividadRepositorio: ActividadRepositorio = {
  crearActividad: async function (
    dto: CrearActividadDto,
    clienteId: string
  ): Promise<Actividad> {
    const resActividad = await prisma.tipo_actividad.create({
      data: {
        cliente_id: clienteId,
        descripcion: dto.descripcion,
      },
    });
    const actividad: Actividad = {
      id: resActividad.id,
      descripcion: resActividad.descripcion,
      fecha_creacion: resActividad.fecha_creacion,
      fecha_actualizacion: resActividad.fecha_actualizacion,
      cliente_id: resActividad.cliente_id,
    };
    return actividad;
  },
  obtenerActividades: function (clienteId: string): Promise<Actividad[]> {
    return prisma.tipo_actividad.findMany({ where: { cliente_id: clienteId } });
  },
  obtenerActividadPorDescripcion: function (
    descripcion: string,
    clienteId: string
  ): Promise<Actividad | null> {
    return prisma.tipo_actividad.findFirst({
      where: {
        descripcion: descripcion.toLowerCase(),
        cliente_id: clienteId,
      },
    });
  },
};
