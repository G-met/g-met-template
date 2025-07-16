import { Actividad } from "../dominio";
import { CrearActividadDto } from "../dtos/crear";

export interface ActividadRepositorio {
  crearActividad: (
    dto: CrearActividadDto,
    clienteId: string
  ) => Promise<Actividad>;
  obtenerActividades: (clienteId: string) => Promise<Actividad[]>;
  obtenerActividadPorDescripcion: (
    descripcion: string,
    clienteId: string
  ) => Promise<Actividad | null>;
}
