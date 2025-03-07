import { format } from "date-fns";
import { EjecucionPatron } from "../../../dominio/entity";
import { EjecucionPatronReadRepository } from "../../../dominio/repository";
import { ListarEjecucionDTO } from "../../dto/listarEjecucionPatrones.dto";

export class ListarEjecucionPatrones {
  constructor(private ejecucionEquiposRead: EjecucionPatronReadRepository) {}

  async execute(clienteId: string) {
    const listado = await this.ejecucionEquiposRead.listar(clienteId);
    return this.convertToDto(listado);
  }

  private convertToDto(listado: EjecucionPatron[]): ListarEjecucionDTO[] {
    return listado.map((e) => ({
      codigo: e.programacionPatron.patron?.codigo ?? "unknown",
      observaciones: e.observaciones,
      patronDescripcion: e.programacionPatron.patron?.descripcion ?? "",
      fechaEjecucion: format(new Date(e.fechaEjecucion), "dd-MM-yyyy"),
      responsable: e?.proveedor ? e.proveedor.nombre : e.usuario?.nombre ?? "",
      documentos: e.documentos,
    }));
  }
}
