import { EjecucionEquipoWriteRepository } from "../../../dominio/repository";
import {
  EquipoReadRepository,
  EquipoWriteRepository,
} from "@/app/api/equipos/dominio/repository";
import {
  ProgramacionNoExiste,
  ProgramacionYaCompletada,
} from "@/app/api/equipos/dominio/errors";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { CrearEjecucionDTO } from "../../dto/crearEjecucionEquipo";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { randomUUID } from "crypto";
import { UsuarioService } from "../../../../usuarios/dominio/service/index";
import { ProveedorService } from "../../../../proveedor/dominio/service/index";
import { Usuario } from "@/app/api/usuarios/dominio/entity";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";
import { Documentos, TipoEjecutor } from "@/app/api/common/types";

export class CrearEjecucionEquipos {
  constructor(
    private ejecucionRepo: EjecucionEquipoWriteRepository,
    private programacionRepo: EquipoReadRepository,
    private programacionRepoWrite: EquipoWriteRepository,
    private usuarioService: UsuarioService,
    private proveedorService: ProveedorService,
    private saveFilesAdaptor: IFilesAdaptor
  ) {}
  async execute(clienteId: string, dto: CrearEjecucionDTO) {
    let usuario: Usuario | undefined;
    let proveedor: Proveedor | undefined;
    if (dto.tipoEjecutor === TipoEjecutor.INTERNO) {
      usuario = await this.usuarioService.validarUsuarioPorId(dto.ejecutorId);
    } else {
      proveedor = await this.proveedorService.validarPorId(
        dto.ejecutorId,
        clienteId
      );
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
    const ejecucionEquipoId = randomUUID().toString();
    let archivosUrls: Documentos[] = [];
    if (dto.archivos) {
      // /ejecucion-equipos/clienteID/ejecucionID
      const pathName = `ejecucion-equipos/${clienteId}/${ejecucionEquipoId}`;
      const res = await this.saveFilesAdaptor.saveFiles(pathName, dto.archivos);
      archivosUrls = res;
    }
    await this.ejecucionRepo.crear({
      id: ejecucionEquipoId,
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
      programacionEquipo: programacionEquipo,
      documentos: archivosUrls,
      tipoEjecutor: dto.tipoEjecutor,
      proveedor: proveedor,
      usuario: usuario,
    });
    await this.programacionRepoWrite.cambiarProgramacionEstado(
      dto.programacionEquipoId,
      clienteId,
      EstadoProgramacion.COMPLETADO
    );
  }
}
