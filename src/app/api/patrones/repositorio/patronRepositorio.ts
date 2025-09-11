import { prisma } from "@/src/lib/prisma";
import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
  ProgramacionPatrones,
} from "../dominio";
import { CrearPatronDto } from "../application/dto/crearPatrones";
import { PatronRepositorio } from "./index";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { queryValuesDTO } from "../../common/types";
import {
  ObtenerPatronesDtoOutput,
  PatronesResponse,
} from "../dtos/obtenerPatrones.dto.output";
import { calcularPagina } from "@/lib/pagination";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import {
  ListaProgramacionPatronesDTO,
  PatronProgramacionDto,
} from "../dtos/listaProgramacionPatrones.output";
import { format } from "date-fns";
export const patronRepositorio: PatronRepositorio = {
  crearPatron: async function (
    dto: CrearPatronDto,
    clienteId: string
  ): Promise<Patron> {
    const patron = await prisma.patron.create({
      data: {
        cliente_id: clienteId,
        codigo: dto.codigo,
        descripcion: dto.descripcion,
        modelo: dto.modelo,
        serie: dto.serie,
        marca_id: dto.marcaId,
        ubicacion_id: dto.ubicacionId,
        tipo_patron_id: dto.tipoPatronId,
      },
    });
    return patron;
  },
  obtenerPatronPorCodigo: async function (
    codigo: string,
    clienteId: string
  ): Promise<Patron | null> {
    const patron = await prisma.patron.findUnique({
      where: {
        codigo,
        cliente_id: clienteId,
      },
      include: {
        datos_metrologicos: true,
        datos_complementarios: true,
        marca: true,
        ubicacion: true,
      },
    });
    return patron;
  },
  crearDatosMetrologicos: function (
    dto: CrearDatosMetrologicosDto,
    patronId: string,
    clienteId: string
  ): Promise<DatosMetrologicosPatrones> {
    return prisma.datos_metrologicos_patrones.create({
      data: {
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        emp: dto.emp,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
        patrones_id: patronId,
        valor_nominal: dto.valorNominal,
        cliente_id: clienteId,
      },
    });
  },
  crearDatosComplementarios: function (
    patronId: string,
    dto: CrearDatosComplementariosDto,
    clienteId: string
  ): Promise<DatosComplementariosPatrones> {
    return prisma.datos_complementarios_patrones.create({
      data: {
        fireware: dto.fireware,
        cumple_especificacion_instalaciones:
          dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        observaciones: dto.observaciones,
        utiliza_software: dto.utilizaSoftware,
        version_software: dto.versionSoftware,
        patron_id: patronId,
        cliente_id: clienteId,
      },
    });
  },
  obtenerPatrones: async function (
    clienteId: string,
    dto?: queryValuesDTO | undefined
  ): Promise<ObtenerPatronesDtoOutput> {
    const { porPagina, skip } = calcularPagina(dto?.page ?? 1);
    const dbResponse = await prisma.patron.findMany({
      where: {
        cliente_id: clienteId,
      },
      orderBy: {
        fecha_creacion: "desc",
      },
      take: porPagina,
      skip,
      select: {
        id: true,
        codigo: true,
        descripcion: true,
        marca: {
          select: {
            descripcion: true,
          },
        },
        ubicacion: {
          select: {
            responsable: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    const patrones = dbResponse.map<PatronesResponse>((patron) => ({
      codigo: patron.codigo,
      descripcion: patron.descripcion,
      id: patron.id,
      marca: patron.marca.descripcion,
      responsable: patron.ubicacion.responsable.nombre,
    }));

    const countNextPage = await prisma.patron.count({
      where: { cliente_id: clienteId },
      take: porPagina,
      skip,
    });

    const existeSiguientePagina = countNextPage === 0 ? true : false;

    return {
      patrones: patrones,
      existeSiguientePagina,
    };
  },
  editarDatosBasicos: async function (
    codigo: string,
    patron: Partial<Patron>,
    clienteId: string
  ): Promise<void> {
    await prisma.patron.update({
      where: { codigo, cliente_id: clienteId },
      data: {
        marca_id: patron.marca_id,
        descripcion: patron.descripcion,
        ubicacion_id: patron.ubicacionId,
        serie: patron.serie,
        modelo: patron.modelo,
      },
    });
  },
  editarDatosMetrologicos: async function (
    patronId: string,
    dto: EditarDatosMetrologicosDto,
    clienteId: string
  ): Promise<void> {
    await prisma.datos_metrologicos_patrones.update({
      where: {
        patrones_id: patronId,
        cliente_id: clienteId,
      },
      data: {
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
      },
    });
  },
  editarDatosComplementarios: async function (
    patronId: string,
    dto: EditarDatosComplementariosDto,
    clienteId: string
  ): Promise<void> {
    await prisma.datos_complementarios_patrones.update({
      where: {
        patron_id: patronId,
        cliente_id: clienteId,
      },
      data: {
        cumple_especificacion_instalaciones:
          dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        fireware: dto.fireware,
        utiliza_software: dto.utilizaSoftware,
        observaciones: dto.observaciones,
        version_software: dto.versionSoftware,
      },
    });
  },
  crearProgramacionPatron: function (
    dto: CrearProgramacionPatronDto,
    clienteId: string
  ): Promise<ProgramacionPatrones> {
    return prisma.programacionPatrones.create({
      data: {
        frecuenciaId: dto.frecuenciaId,
        fechaProgramacion: dto.fechaProgramacion,
        actividadId: dto.actividadId,
        clienteId: clienteId,
        patronId: dto.patronId,
      },
    });
  },
  listarPatronesProgramados: async function (
    clienteId: string,
    dto?: queryValuesDTO | undefined
  ): Promise<ListaProgramacionPatronesDTO> {
    const { skip, porPagina } = calcularPagina(dto?.page ?? 1);

    const equipoProgramacion = await prisma.programacionPatrones.findMany({
      where: { clienteId },
      take: porPagina,
      skip,
      orderBy: {
        fechaCreacion: "desc",
      },
      include: {
        patron: {
          select: {
            codigo: true,
            descripcion: true,
          },
        },
        actividad: {
          select: {
            descripcion: true,
          },
        },
        frecuencia: {
          select: {
            descripcion: true,
          },
        },
      },
    });

    const countNextPage = await prisma.programacionPatrones.count({
      where: { clienteId },
      take: porPagina,
      skip,
    });

    const existeSiguientePagina = countNextPage === 0 ? true : false;

    const listadoProgramacion = equipoProgramacion.map<PatronProgramacionDto>(
      (element) => ({
        codigo: element.patron.codigo,
        actividad: element.actividad.descripcion,
        descripcion: element.patron.descripcion,
        fechaProgramacion: format(element.fechaProgramacion, "dd-MM-yyyy"),
        frecuencia: element.frecuencia.descripcion,
      })
    );
    return {
      patronesProgramados: listadoProgramacion,
      existeSiguientePagina: existeSiguientePagina,
    };
  },
};
