export class ResponsableNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El responsable con esa identificacion ya no existe"
        this.cause="negocio"
        this.status = 400;
    }
}

export class ResponsableYaTieneUbicacion extends Error{
    status:number
    constructor() {
        super();
        this.message="El responsable con ese ID ya tiene una ubicacion asignada"
        this.cause="negocio"
        this.status = 400;
    }
}