import { ActividadYaExiste } from "../dominio/errors";
import { CrearActividadDto } from "../dtos/crear";
import { actividadRepositorio } from "../repositorio/actividadRepositorio";

export const crearActividad = async (
  dto: CrearActividadDto,
  clienteId: string
) => {
  if (!dto.descripcion) {
    throw new Error("La descripción es obligatoria");
  }
  const actividad = await actividadRepositorio.obtenerActividadPorDescripcion(
    dto.descripcion,
    clienteId
  );
  if (actividad) {
    throw new ActividadYaExiste();
  }
  return actividadRepositorio.crearActividad(dto, clienteId);
};
