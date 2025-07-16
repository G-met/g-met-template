export interface PatternTypeResponse {
  id: string;
  alias: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}
