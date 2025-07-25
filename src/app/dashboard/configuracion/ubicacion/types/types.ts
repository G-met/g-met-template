import { Responsable } from "@/app/api/responsables/domain/entity";

export interface Ubicacion {
  id: string;
  nombre: string;
  responsable_id: string;
  responsable: Responsable;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
}
