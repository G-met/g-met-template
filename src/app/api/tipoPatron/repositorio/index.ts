import { TipoPatron } from "../dominio";
import { CrearTipoPatronDto } from "../dtos/crear";

export interface TipoPatronRespositorio {
  creatTipoPatron: (
    dto: CrearTipoPatronDto,
    clienteId: string
  ) => Promise<TipoPatron>;
}
