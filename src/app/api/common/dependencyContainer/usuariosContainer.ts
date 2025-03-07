import { UsuarioService } from "../../usuarios/dominio/service";
import { UsuarioReadRepositoryImp } from "../../usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "../../usuarios/infrastructure/write/usuarioWriteRepositoryImp";

export class UsuariosContainer {
  public usuarioService: UsuarioService;

  constructor() {
    const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
    const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
    this.usuarioService = new UsuarioService(usuarioReadRepositoryImp, usuarioWriteRepositoryImp);
  }
}
