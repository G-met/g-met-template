import { Cliente } from "../../cliente/dominio";
import { Marca } from "../../marca/dominio";
import { Ubicacion } from "../../ubicaciones/types";

export { type equipo } from "@prisma/client";

export interface Equipo {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id: string;
  marca?: Marca;
  ubicacion?: Ubicacion;
  ubicacion_id: string;
  cliente_id: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
  datos_metrologicos?: DatosMetrologicosEquipos | null;
  datos_complementarios?: DatosComplementariosEquipo | null;
  cliente?: Cliente | null;
}

export interface DatosMetrologicosEquipos {
  id: string;
  equipo_id: string;
  emp: number;
  division_escala: number;
  resolucion: number;
  rango_minimo: number;
  rango_maximo: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export interface DatosComplementariosEquipo {
  id: string;
  descripcion_especificaciones?: string | null;
  cumple_especificacion_instalaciones: cumple;
  utiliza_software: cumple;
  descripcion_software?: string | null;
  version_software?: string | null;
  fireware?: string | null;
  observaciones?: string | null;
  equipo_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export enum cumple {
  SI = "SI",
  NO = "NO",
}

export interface ProgramacionEquipos {
  id: string;
  actividad_id: string;
  frecuencia_id: string;
  equipo_id: string;
  equipo?: Equipo;
  fecha_programacion: Date;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}
