/* eslint-disable @next/next/no-typos */
export class ActividadNoExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "La actividad con ese ID no existe";
    this.cause = "negocio";
    this.status = 400;
  }
}

export class ActividadYaExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "Ya existe una actividad con esa descripción";
    this.cause = "negocio";
    this.status = 400;
  }
}
