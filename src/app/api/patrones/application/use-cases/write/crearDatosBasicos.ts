import { MarcaReadRepository } from "../../../../marca/dominio/repository";
import { MarcaNoExiste } from "@/app/api/marca/dominio/errors";
import { UbicacionReadRepository } from "@/app/api/ubicaciones/dominio/repository";
import { UbicacionNoExiste } from "@/app/api/ubicaciones/dominio/errors";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { randomUUID } from "crypto";
import { Documentos } from "@/app/api/common/types";
import { CrearPatronDto } from "../../dto/crearPatrones";
import { PatronWriteRepository } from "../../../dominio/repository/index";
import { PatronEntity } from "../../../dominio/entity/intex";
import { PatronService } from "../../../dominio/service";
interface CrearDatosBasicos {
  execute(clienteId: string, crearEquipoDto: CrearPatronDto): Promise<void>;
}

export class CrearDatosBasicosUseCaseImp implements CrearDatosBasicos {
  constructor(
    private patronWriteRepository: PatronWriteRepository,
    private patronService: PatronService,
    private marcaReadRepository: MarcaReadRepository,
    private ubicacionReadRepository: UbicacionReadRepository,
    private saveFilesAdaptor: IFilesAdaptor
  ) {}
  async execute(
    clienteId: string,
    crearPatronDto: CrearPatronDto
  ): Promise<void> {
    const [_, marca, ubicacion] = await Promise.all([
      this.patronService.obtenerPatronCodigo(crearPatronDto.codigo, clienteId),
      this.marcaReadRepository.obtenerPorID(clienteId, crearPatronDto.marcaId),
      this.ubicacionReadRepository.obtenerPorID(
        clienteId,
        crearPatronDto.ubicacionId
      ),
    ]);

    if (!marca) {
      throw new MarcaNoExiste();
    }
    if (!ubicacion) {
      throw new UbicacionNoExiste();
    }

    const equipoID = this.generarPatronId();

    const documentos = await this.guardarArchivos(
      clienteId,
      equipoID,
      crearPatronDto.archivos
    );

    const datosBasicos = new PatronEntity({
      id: equipoID,
      codigo: crearPatronDto.codigo,
      descripcion: crearPatronDto.descripcion,
      marca: marca,
      ubicacion: ubicacion,
      modelo: crearPatronDto.modelo,
      serie: crearPatronDto.serie,
      documentos: documentos,
    });
    await this.patronWriteRepository.crearDatosBasicos(clienteId, datosBasicos);
  }

  private generarPatronId() {
    return randomUUID().toString();
  }

  private async guardarArchivos(
    clienteId: string,
    patronId: string,
    archivos?: File[]
  ): Promise<Documentos[]> {
    if (!archivos) return [];
    const pathName = `patrones/${clienteId}/${patronId}`;
    return this.saveFilesAdaptor.saveFiles(pathName, archivos);
  }
}
