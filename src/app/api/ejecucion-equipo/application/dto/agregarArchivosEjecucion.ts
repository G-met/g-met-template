import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { z } from "zod";

export interface AgregarArchivosEjecucionDTO {
  ejecucionId: string;
  archivos: File[];
}

export const schema = z.object({
  ejecucionId: z.string({ description: "ejecucionId" }),
  archivos: z
    .any()
    .refine((value) => value.length > 0, {
      message: "Debe enviar al menos un archivo",
    })
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    }),
});
export const validarAgregarArchivos = (
  ejecucion: AgregarArchivosEjecucionDTO
) => {
  return schema.parse(ejecucion) as AgregarArchivosEjecucionDTO;
};
