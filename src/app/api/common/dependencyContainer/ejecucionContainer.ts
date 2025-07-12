import { SaveFiles } from "../../common/files/saveFiles";

import type { UsuariosContainer } from "./usuariosContainer";
import type { EquiposContainer } from "./equiposContainer";
import type { ProveedoresContainer } from "./proveedoresContainer";
import { EjecucionEquipoWriteRepositoryImp } from "../../ejecucion-equipo/infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import { EjecucionEquiposReadRepositoryImp } from "../../ejecucion-equipo/infrastructure/reader/ejecucionEquiposReadRepositoryImp";
import { CrearEjecucionEquipos } from "../../ejecucion-equipo/application/use-cases/writer/crearEjecucionEquipos";
import { ListarEjecucionEquipos } from "../../ejecucion-equipo/application/use-cases/reader/listarEjecucionEquipos";
import {
  EjecucionEquipoWriteRepository,
  EjecucionEquipoReadRepository,
} from "../../ejecucion-equipo/dominio/repository";
import { AgregarArchivosEjecucionUseCaseImp } from "../../ejecucion-equipo/application/use-cases/writer/agregarArchivosEjecucion";

export class EjecucionContainer {
  public ejecucionEquipoWriteRepository: EjecucionEquipoWriteRepository;
  public ejecucionEquipoReadRepository: EjecucionEquipoReadRepository;
  //use cases
  public crearEjecucionEquipos: CrearEjecucionEquipos; // Inyección diferida
  public listarEjecucionEquipos: ListarEjecucionEquipos;
  public agregarArchivosEjecucionUseCase: AgregarArchivosEjecucionUseCaseImp;

  constructor() {
    this.ejecucionEquipoWriteRepository =
      new EjecucionEquipoWriteRepositoryImp();
    this.ejecucionEquipoReadRepository =
      new EjecucionEquiposReadRepositoryImp();
  }

  public initialize(
    usuarios: UsuariosContainer,
    equipos: EquiposContainer,
    proveedores: ProveedoresContainer
  ) {
    const fileService = new SaveFiles();

    this.crearEjecucionEquipos = new CrearEjecucionEquipos(
      this.ejecucionEquipoWriteRepository,
      equipos.equipoReadRepository,
      equipos.equipoWriteRepository,
      usuarios.usuarioService,
      proveedores.proveedorService,
      fileService
    );

    this.listarEjecucionEquipos = new ListarEjecucionEquipos(
      this.ejecucionEquipoReadRepository
    );

    this.agregarArchivosEjecucionUseCase = new AgregarArchivosEjecucionUseCaseImp(
      this.ejecucionEquipoReadRepository,
      this.ejecucionEquipoWriteRepository,
      fileService
    );
  }
}
