export interface VariableResponse {
  id: string;
  alias: string;
  descripcion: string;
  magnitud_id: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
  clienteId: string;
}
