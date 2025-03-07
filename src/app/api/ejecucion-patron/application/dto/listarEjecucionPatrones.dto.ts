import { Documentos } from "@/app/api/common/types";

export interface ListarEjecucionDTO {
  codigo: string;
  responsable: string;
  observaciones: string;
  fechaEjecucion: string | Date;
  patronDescripcion: string;
  documentos?: Documentos[];
}
