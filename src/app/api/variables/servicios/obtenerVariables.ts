import { variableRepositorio } from "../repositorio/variableRepositorio";

export async function obtenerVariables(clienteId: string) {
  return variableRepositorio.obtenerTodasVariables(clienteId);
}
