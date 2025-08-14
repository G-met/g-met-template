import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";
import { MagnitudExiste } from "../errors";
import { magnitudRespositorio } from "../repositorio/magnitudRespositorio";

export const crearMagnitud = async (
  dto: CrearMagnitudDto,
  clienteId: string
) => {
  const magnitud = await magnitudRespositorio.obtenerMagnitudPorDescription(
    dto.descripcion.toLocaleLowerCase(),
    clienteId
  );
  if (magnitud) {
    throw new MagnitudExiste();
  }
  return magnitudRespositorio.crearMagnitud(dto, clienteId);
};
