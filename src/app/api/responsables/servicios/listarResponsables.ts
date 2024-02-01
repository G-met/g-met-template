import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const listarResponsables = async (clienteId: string, page: number) => {
  return responsableRepositorio.obtenerResponsablesPaginado(clienteId, page);
};
