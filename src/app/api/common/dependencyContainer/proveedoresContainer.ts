import { ProveedorService } from "../../proveedor/dominio/service/index";
import { ProveedorReadRepositoryImp } from "../../proveedor/infrastructure/reader/proveedorReadRepositoryImp";
import { ProveedorWriteRepositoryImp } from "../../proveedor/infrastructure/writer/proveedorWriteRepositoryImp";

export class ProveedoresContainer {
  public proveedorService: ProveedorService;

  constructor() {
    const proveedorReadRepositoryImp = new ProveedorReadRepositoryImp();
    const proveedorWriteRepositoryImp = new ProveedorWriteRepositoryImp();
    this.proveedorService = new ProveedorService(proveedorWriteRepositoryImp, proveedorReadRepositoryImp);
  }
}
