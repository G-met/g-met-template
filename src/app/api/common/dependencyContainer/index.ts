import { UsuariosContainer } from "./usuariosContainer";
import { EquiposContainer } from "./equiposContainer";
import { EjecucionContainer } from "./ejecucionContainer";
import { ProveedoresContainer } from "./proveedoresContainer";

class DependencyContainer {
  private static instance: DependencyContainer;

  public usuarios: UsuariosContainer;
  public equipos: EquiposContainer;
  public ejecucion: EjecucionContainer;
  public proveedores: ProveedoresContainer;

  private constructor() {
    this.usuarios = new UsuariosContainer();
    this.equipos = new EquiposContainer();
    this.proveedores = new ProveedoresContainer();
    this.ejecucion = new EjecucionContainer();
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
      DependencyContainer.instance.ejecucion.initialize(
        DependencyContainer.instance.usuarios,
        DependencyContainer.instance.equipos,
        DependencyContainer.instance.proveedores
      );
    }
    return DependencyContainer.instance;
  }
}

export const container = DependencyContainer.getInstance();
