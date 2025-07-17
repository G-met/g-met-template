import { Variable } from "../dominio";
import { CrearVariableDto } from "../dtos/crear";

export interface VariableRespositorio {
  crearVariable: (
    dto: CrearVariableDto,
    clienteId: string
  ) => Promise<Variable>;
  obtenerTodasVariables: (clienteId: string) => Promise<Variable[]>;
}
