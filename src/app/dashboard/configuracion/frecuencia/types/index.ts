export interface FrecuenciaResponse {
  id: string;
  descripcion: string;
  cantidad_dias: number;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
  cliente_id: string;
}
