import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
  ProgramacionPatrones,
} from "../dominio";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { ObtenerPatronesDtoOutput } from "../dtos/obtenerPatrones.dto.output";
import { ObtenerDatosDto } from "../../common/types";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import { ListaProgramacionPatronesDTO } from "../dtos/listaProgramacionPatrones.output";
export interface PatronRepositorio {
  crearPatron: (dto: CrearPatronDto) => Promise<Patron>;
  obtenerPatronPorCodigo: (codigo: string) => Promise<Patron | null>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    patronId: string
  ) => Promise<DatosMetrologicosPatrones>;
  crearDatosComplementarios: (
    patronId: string,
    dto: CrearDatosComplementariosDto
  ) => Promise<DatosComplementariosPatrones>;
  obtenerPatrones: (dto?: ObtenerDatosDto) => Promise<ObtenerPatronesDtoOutput>;
  editarDatosBasicos: (
    codigo: string,
    patron: Partial<Patron>
  ) => Promise<void>;
  editarDatosMetrologicos: (
    equipoId: string,
    dto: EditarDatosMetrologicosDto
  ) => Promise<void>;
  editarDatosComplementarios: (
    patronId: string,
    dto: EditarDatosComplementariosDto
  ) => Promise<void>;
  crearProgramacionPatron: (
    dto: CrearProgramacionPatronDto
  ) => Promise<ProgramacionPatrones>;
  listarPatronesProgramados: (
    dto?: ObtenerDatosDto
  ) => Promise<ListaProgramacionPatronesDTO>;
}
