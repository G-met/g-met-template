import { ObtenerDatosDto } from "../../common/types";
import {
  DatosMetrologicosEquipos,
  Equipo,
  DatosComplementariosEquipo,
  ProgramacionEquipos,
} from "../dominio";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { ListaProgramacionEquiposDTO } from "../dtos/listaProgramacionEquipos.output";
import { ObtenerEquiposDtoOutput } from "../dtos/obtenerEquipos.dto.output";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto, clienteId: string) => Promise<void>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    equipoId: string
  ) => Promise<DatosMetrologicosEquipos>;
  obtenerEquipoPorCodigo: (codigo: string) => Promise<Equipo | null>;
  obtenerEquipoPorId: (id: string) => Promise<Equipo | null>;
  crearDatosComplementarios: (
    equipoId: string,
    dto: CrearDatosComplementariosDto
  ) => Promise<DatosComplementariosEquipo>;
  crearProgramacionEquipo: (
    dto: CrearProgramacionEquipoDto
  ) => Promise<ProgramacionEquipos>;
  obtenerEquipos: (
    clienteId: string,
    page: number,
  ) => Promise<ObtenerEquiposDtoOutput>;
  obtenerEquiposPorCodigo: (codigo: string) => Promise<ObtenerEquiposDtoOutput>;
  obtenerEquiposPorMarca: (marca: string) => Promise<Equipo[]>;
  editarEquipo: (codigo: string, equipo: Partial<Equipo>) => Promise<void>;
  editarDatosMetrologicos: (
    equipoId: string,
    dto: EditarDatosMetrologicosDto
  ) => Promise<void>;
  editarDatosComplementarios: (
    equipoId: string,
    dto: EditarDatosComplementariosDto
  ) => Promise<void>;
  listarEquiposProgramados: (
    dto?: ObtenerDatosDto
  ) => Promise<ListaProgramacionEquiposDTO>;
}
