import { object, string } from "zod";

export interface CrearMagnitudDto {
  alias: string;
  descripcion: string;
}

export const validarCrearMagnitud = (responsable: CrearMagnitudDto) => {
  object({
    alias: string({ description: "alias requerido" }),
    descripcion: string({ description: "descripcion requerido" }).transform(
      (value: string) => value.toLocaleLowerCase()
    ),
  }).parse(responsable);
};
