export interface queryValuesDTO {
  termino?: string | null;
  valor?: string | null;
  page: number;
  limit?: number;
}

export interface SearchValuesDTO {
  termino: string;
  valor: string;
  page: number;
  limit: number;
}


export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface Documentos {
  name?: string;
  url?: string;
}

export enum ExecutorType {
  INTERNO = "INTERNO",
  EXTERNO = "EXTERNO",
}

export enum Role {
  Admin = "Admin",
  Metrologo = "Metrologo",
  Auxiliar = "Auxiliar",
  Consulta = "Consulta",
  Cordinador = "Cordinador",
}

export enum Cumple {
  SI = "SI",
  NO = "NO",
}
