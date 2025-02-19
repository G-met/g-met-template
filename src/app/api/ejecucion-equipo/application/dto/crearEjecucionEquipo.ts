import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { TipoEjecutor } from "@/app/api/common/types";
import * as z from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  programacionEquipoId: string;
  archivos?: File[];
  ejecutorId: string;
  tipoEjecutor: TipoEjecutor;
}

export const schema = z.object({
  fechaEjecucion: z.string({ description: "fechaEjecucion" }),
  observaciones: z.string({ description: "observaciones" }),
  programacionEquipoId: z.string({ description: "programacionEquipoId" }),
  archivos: z.any().refine(validateFileListSize, {
    message: "Los archivos no deben pensar mas de 4 MB",
  }),
  ejecutorId: z.string({ description: "ejecutorId" }),
  tipoEjecutor: z.nativeEnum(TipoEjecutor),
});
export const validarCrearEjecucionEquipo = (ejecucion: CrearEjecucionDTO) => {
  return schema.parse(ejecucion);
};
