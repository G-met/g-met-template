import { EjecucionEquipo } from "../../dominio/entity";

export interface EjecucionEquipoReadRepository {
  listar(clienteId: string): Promise<EjecucionEquipo[]>;
  obtenerPorID(
    clienteId: string,
    ejecucionId: string
  ): Promise<EjecucionEquipo | null>;
}
export interface EjecucionEquipoWriteRepository {
  crear(
    ejecucionEquipo: EjecucionEquipo
  ): Promise<Omit<EjecucionEquipo, "cliente" | "programacionEquipo">>;
  actualizar(ejecucionEquipo: EjecucionEquipo): Promise<void>;
}
