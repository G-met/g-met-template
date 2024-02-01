export interface ResponsableDto {
  id: string;
  identificacion: string;
  apellido: string;
  nombre: string;
}
export interface ListaResponsableDTO {
  responsables: ResponsableDto[];
  existeSiguientePagina: boolean;
}
