import { calcularPagina } from "@/lib/queryUtils";
import { ResponsableRepositorio } from ".";
import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { ListaResponsableDTO } from "../dtos/listarResponsable.dto";
import { Responsable } from "../types";
import { prisma } from "@/lib/prisma";

const crearResponsable = async (
  responsable: CrearResponsableDto,
  clienteId: string
): Promise<void> => {
  console.log(clienteId);
  await prisma.responsable.create({
    data: {
      identificacion: responsable.identificacion,
      nombre: responsable.nombre,
      apellido: responsable.apellido,
      cliente_id: clienteId,
    },
  });
};

const obtenerResponsables = (clienteId: string): Promise<Responsable[]> => {
  return prisma.responsable.findMany({
    where: { cliente_id: clienteId },
  });
};
const obtenerResponsableIdent = async (
  identificacion: string,
  clienteId: string
): Promise<Responsable | null> => {
  const res = await prisma.responsable.findUnique({
    where: {
      identificacion: identificacion,
      cliente_id: clienteId,
    },
  });
  return res;
};

const obtenerResponsableID = (id: string, clienteId: string) => {
  return prisma.responsable.findUnique({
    where: {
      id,
      cliente_id: clienteId,
    },
  });
};

export const responsableRepositorio: ResponsableRepositorio = {
  crearResponsable: crearResponsable,
  obtenerResponsables,
  obtenerResponsableIdent: obtenerResponsableIdent,
  obtenerResponsableID: obtenerResponsableID,
  obtenerResponsablesPaginado: async function (
    clienteId: string,
    page: number
  ): Promise<ListaResponsableDTO> {
    const { porPagina, skip } = calcularPagina(page);
    const responsables = await prisma.responsable.findMany({
      where: {
        cliente_id: clienteId,
      },
      skip,
      take: porPagina,
    });

    const nextpagecount = await prisma.responsable.count({
      skip: skip + porPagina,
      take: porPagina,
    });

    const existeSiguientePagina = nextpagecount !== 0 ? true : false;

    return {
      responsables: responsables.map((responsable) => ({
        apellido: responsable.apellido,
        id: responsable.id,
        identificacion: responsable.identificacion,
        nombre: responsable.nombre,
      })),
      existeSiguientePagina
    };
  },
};
