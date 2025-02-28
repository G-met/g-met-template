export class EjecucionEquipoNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Equipo con esa ejecucion no existe"
        this.cause="negocio"
        this.status = 400;
    }
}
