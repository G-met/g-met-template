import { format } from "date-fns";
import { EjecucionEquipo } from "../../../dominio/entity";
import { EjecucionEquipoReadRepository } from "../../../dominio/repository";
import { ListarEjecucionDTO } from "../../dto/listarEjecucionEquipos.dto";

export class ListarEjecucionEquipos {
  constructor(private ejecucionEquiposRead: EjecucionEquipoReadRepository) {}

  async execute(clienteId: string) {
    const listado = await this.ejecucionEquiposRead.listar(clienteId);
    return this.convertToDto(listado);
  }

  private convertToDto(listado: EjecucionEquipo[]): ListarEjecucionDTO[] {
    return listado.map((e) => ({
      id: e.id,
      codigo: e.programacionEquipo.equipo?.codigo ?? "knonw",
      observaciones: e.observaciones,
      equipoDescripcion: e.programacionEquipo.equipo?.descripcion ?? "",
      fechaEjecucion: format(new Date(e.fechaEjecucion), "dd-MM-yyyy"),
      responsable: e?.proveedor ? e.proveedor.nombre : e.usuario?.nombre ?? "",
      documentos: e.documentos,
    }));
  }
}
