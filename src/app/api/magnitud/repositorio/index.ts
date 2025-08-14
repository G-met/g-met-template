import { Magnitud } from "../dominio";
import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";

export interface MagnitudRepositorio {
  crearMagnitud: (
    dto: CrearMagnitudDto,
    clienteId: string
  ) => Promise<Magnitud>;
  obtenerMagnitudPorId: (
    id: string,
    clienteId: string
  ) => Promise<Magnitud | null>;
  obtenerMagnitudes: (clienteId: string) => Promise<Magnitud[]>;
  obtenerMagnitudPorDescription: (
    description: string,
    clienteId: string
  ) => Promise<Magnitud | null>;
}
