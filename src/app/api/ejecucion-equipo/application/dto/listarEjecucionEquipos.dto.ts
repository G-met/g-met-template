import { Documentos } from "@/app/api/common/types";

export interface ListarEjecucionDTO {
  id: string;
  codigo: string;
  responsable: string;
  observaciones: string;
  fechaEjecucion: string | Date;
  equipoDescripcion: string;
  documentos?: Documentos[];
}
