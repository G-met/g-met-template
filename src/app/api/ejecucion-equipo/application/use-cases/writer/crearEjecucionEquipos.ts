import { EjecucionEquipoWriteRepository } from "../../../dominio/repository";
import { ResponsableNoExiste } from "@/app/api/responsables/errors";
import {
  EquipoReadRepository,
  EquipoWriteRepository,
} from "@/app/api/equipos/dominio/repository";
import {
  ProgramacionNoExiste,
  ProgramacionYaCompletada,
} from "@/app/api/equipos/dominio/errors";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { ResponsableRepositoryReader } from "@/app/api/responsables/domain/repository";
import { CrearEjecucionDTO } from "../../dto/crearEjecucionEquipo";

export class CrearEjecucionEquipos {
  constructor(
    private ejecucionRepo: EjecucionEquipoWriteRepository,
    private programacionRepo: EquipoReadRepository,
    private programacionRepoWrite: EquipoWriteRepository,
    private responsableRepo: ResponsableRepositoryReader
  ) {}
  async execute(clienteId: string, dto: CrearEjecucionDTO) {
    const responsable = await this.responsableRepo.obtenerResponsablePorID(
      clienteId,
      dto.ejecutorId
    );
    if (!responsable) {
      throw new ResponsableNoExiste();
    }
    const programacionEquipo =
      await this.programacionRepo.obtenerProgramacionPorId(
        dto.programacionEquipoId,
        clienteId
      );
    if (!programacionEquipo) {
      throw new ProgramacionNoExiste();
    }
    if (programacionEquipo.estado === EstadoProgramacion.COMPLETADO) {
      throw new ProgramacionYaCompletada();
    }
    await this.ejecucionRepo.crear({
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      responsable: responsable,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
      programacionEquipo: programacionEquipo,
    });
    await this.programacionRepoWrite.cambiarProgramacionEstado(
      dto.programacionEquipoId,
      clienteId,
      EstadoProgramacion.COMPLETADO
    );
  }
}
