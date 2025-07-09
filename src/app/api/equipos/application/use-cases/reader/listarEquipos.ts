import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";
import { EquipoInformacionBasicaDTO } from "../../dtos/obtenerEquipos.dto.output";
import { queryValuesDTO } from "@/app/api/common/types";
import { EquipoReadRepository } from "../../../dominio/repository/index";
import { calcularPagina, paginaSiguienteExiste } from "@/lib/pagination";

interface ListarEquiposUseCase {
  execute(
    clienteId: string,
    queryOpstions: queryValuesDTO
  ): Promise<ResponseListadoPaginado<EquipoInformacionBasicaDTO>>;
}

export class ListarEquiposUseCaseImp implements ListarEquiposUseCase {
  constructor(private equipoReadRepository: EquipoReadRepository) {}
  async execute(
    clienteId: string,
    queryOpstions: queryValuesDTO
  ): Promise<ResponseListadoPaginado<EquipoInformacionBasicaDTO>> {
    const { limit = 5, page } = queryOpstions;
    const { porPagina, skip } = calcularPagina(page, limit);

    const total = await this.equipoReadRepository.totalEquipos(clienteId);
    const existePaginaSiguiente = paginaSiguienteExiste(page, total, limit);

    const equipos = await this.equipoReadRepository.listarEquipos(
      clienteId,
      skip,
      porPagina
    );

    const data = EquipoInformacionBasicaDTO.converToDTO(equipos);

    return {
      data,
      existePaginaSiguiente,
      pagina: page,
      total,
    };
  }
}
