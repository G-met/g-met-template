import { EjecucionPatronWriteRepository } from "../../../dominio/repository";

import {
  ProgramacionNoExiste,
  ProgramacionYaCompletada,
} from "@/app/api/equipos/dominio/errors";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { CrearEjecucionDTO } from "../../dto/crearEjecucionPatron";
import {
  ProgramacionPatronesRepositoryRead,
  ProgramacionPatronesRepositoryWrite,
} from "@/app/api/programacion-patrones/domain/repository";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { randomUUID } from "crypto";
import { Documentos, TipoEjecutor } from "@/app/api/common/types";
import { UsuarioService } from "@/app/api/usuarios/dominio/service";
import { ProveedorService } from "@/app/api/proveedor/dominio/service";
import { Usuario } from "@/app/api/usuarios/dominio/entity";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";

export class CrearEjecucionPatrones {
  constructor(
    private ejecucionRepo: EjecucionPatronWriteRepository,
    private programacionRepoRead: ProgramacionPatronesRepositoryRead,
    private programacionRepoWrite: ProgramacionPatronesRepositoryWrite,
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
    const programacionPatron =
      await this.programacionRepoRead.obtenerProgramacionPorId(
        dto.programacionPatronId,
        clienteId
      );
    if (!programacionPatron) {
      throw new ProgramacionNoExiste();
    }
    if (programacionPatron.estado === EstadoProgramacion.COMPLETADO) {
      throw new ProgramacionYaCompletada();
    }
    const ejecucionPatronId = randomUUID().toString();
    let archivosUrls: Documentos[] = [];
    if (dto.archivos) {
      // /ejecucion-patrones/clienteID/ejecucionID
      const pathName = `ejecucion-equipos/${clienteId}/${ejecucionPatronId}`;
      const res = await this.saveFilesAdaptor.saveFiles(pathName, dto.archivos);
      archivosUrls = res;
    }
    await this.ejecucionRepo.crear({
      id: ejecucionPatronId,
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
      programacionPatron: programacionPatron,
      documentos: archivosUrls,
      tipoEjecutor: dto.tipoEjecutor,
      proveedor: proveedor,
      usuario: usuario,
    });
    await this.programacionRepoWrite.cambiarProgramacionEstado(
      dto.programacionPatronId,
      clienteId,
      EstadoProgramacion.COMPLETADO
    );
  }
}
