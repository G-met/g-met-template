import { equipoRepositorio } from "../repositorio/equipoRepositorio"

export const obtenerPorCodigo=(codigo:string)=>{
    return equipoRepositorio.obtenerEquiporPorCodigo(codigo)
}