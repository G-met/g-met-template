import { AgregarArchivosEjecucionDTO } from "../../dto/agregarArchivosEjecucion";
import {
  EjecucionEquipoReadRepository,
  EjecucionEquipoWriteRepository,
} from "../../../dominio/repository/index";
import { th } from "date-fns/locale";
import { EjecucionEquipoNoExiste } from "../../../dominio/errors";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { Documentos } from "@/app/api/common/types";

interface AgregarArchivosEjecucionUseCase {
  execute(clienteId: string, dto: AgregarArchivosEjecucionDTO): Promise<void>;
}

export class AgregarArchivosEjecucionUseCaseImp
  implements AgregarArchivosEjecucionUseCase
{
  constructor(
    private ejecucionEquipoReadRepository: EjecucionEquipoReadRepository,
    private ejecucionEquipoWriteRepository: EjecucionEquipoWriteRepository,
    private saveFilesAdaptor: IFilesAdaptor
  ) {}
  async execute(
    clienteId: string,
    dto: AgregarArchivosEjecucionDTO
  ): Promise<void> {
    const ejecucionEquipo =
      await this.ejecucionEquipoReadRepository.obtenerPorID(
        clienteId,
        dto.ejecucionId
      );
    if (!ejecucionEquipo) {
      throw new EjecucionEquipoNoExiste();
    }
    let archivosUrls: Documentos[] = [];
    if (dto.archivos) {
      // /ejecucion-equipos/clienteID/ejecucionID
      const pathName = `ejecucion-equipos/${clienteId}/${ejecucionEquipo.id}`;
      const res = await this.saveFilesAdaptor.saveFiles(pathName, dto.archivos);
      archivosUrls = res;
    }
    ejecucionEquipo.documentos.push(...archivosUrls);
    await this.ejecucionEquipoWriteRepository.actualizar(ejecucionEquipo);
  }
}
