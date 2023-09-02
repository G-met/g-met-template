export interface Patron {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion: Date | null;
  ubicacionId?: string | null;
  datos_metrologicos?: DatosMetrologicosPatrones | null;
  datos_complementarios?: DatosComplementariosPatrones | null;
}

export interface DatosMetrologicosPatrones {
  id: string;
  emp: number;
  division_escala: number;
  resolucion: number;
  rango_minimo: number;
  rango_maximo: number;
  valor_nominal: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
  patrones_id: string;
}

export interface DatosComplementariosPatrones {
  id: string;
  descripcion_especificaciones?: string | null;
  cumple_especificacion_instalaciones: cumple;
  utiliza_software: cumple;
  descripcion_software?: string | null;
  version_software?: string | null;
  fireware?: string | null;
  observaciones?: string | null;
  patron_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export enum cumple {
  SI = "SI",
  NO = "NO",
}
