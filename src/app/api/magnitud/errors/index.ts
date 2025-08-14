export class MagnitudExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "La magnitud con ese nombre ya existe";
    this.cause = "negocio";
    this.status = 400;
  }
}
