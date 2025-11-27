import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { ExecutorType } from "@/app/api/common/types";
import { object, string, z } from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  programacionPatronId: string;
  archivos?: File[];
  ejecutorId: string;
  tipoEjecutor: ExecutorType;
}

export const schema = object({
  fechaEjecucion: string({ description: "fechaEjecucion" }),
  observaciones: string({ description: "observaciones" }),
  programacionPatronId: string({ description: "programacionEquipoId" }),
  archivos: z.any().refine(validateFileListSize, {
    message: "Los archivos no deben pensar mas de 4 MB",
  }),
  ejecutorId: z.string({ description: "ejecutorId" }),
  tipoEjecutor: z.nativeEnum(ExecutorType),
});
export const validarCrearEjecucionPatron = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
