import { EquipoReadRepository ,EquipoWriteRepository } from "../../equipos/dominio/repository";
import { EquipoReadRepositoryImp } from "../../equipos/infrastructure/reader/equipoReadRepository";
import { EquipoWriteRepositoryImp } from "../../equipos/infrastructure/writer/equipoWriteRepository";

export class EquiposContainer {
  public equipoReadRepository: EquipoReadRepository;
  public equipoWriteRepository: EquipoWriteRepository;

  constructor() {
    this.equipoReadRepository = new EquipoReadRepositoryImp();
    this.equipoWriteRepository = new EquipoWriteRepositoryImp();
  }
}
