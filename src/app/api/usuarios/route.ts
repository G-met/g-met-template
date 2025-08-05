import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { UsuarioService } from "./dominio/service/index";
import { UsuarioReadRepositoryImp } from "./infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "./infrastructure/write/usuarioWriteRepositoryImp";
import { auth } from "../../../lib/getSession";
import { ListarUsuariosImp } from "./use-cases/read/listarUsurios";
import { EmailService } from "../common/email/index";
import { validarCrearUsuarioDto } from "./use-cases/dto/crearUsuario.DTO";
import { ClienteService } from "../cliente/dominio/service/index";
import { ClienteReadRepositoryImp } from "../cliente/infrastructure/read/clienteReadRepositoryImp";
import { Cliente } from "../cliente/dominio/entity";
import { isRoleAuthorized } from "@/lib/auth/roles-guard";
import { Role } from "./dominio/entity";

const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);

const listarUsuariosImp = new ListarUsuariosImp(usuarioService);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarCrearUsuarioDto(body);
    const session = await auth();
    isRoleAuthorized([Role.Admin], session.user.rol as Role);
    const cliente: Cliente = {
      id: session.user.clienteId,
      nombre: session.user.nombreCliente,
    };
    //await crearUsuarioImp.execute(cliente, dto);
    return NextResponse.json({ msg: "usuario creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const searchParams = request.nextUrl.searchParams;
    const roles = searchParams.getAll("role");
    const usuarios = await listarUsuariosImp.execute(session.user.clienteId);
    return NextResponse.json(usuarios);
  } catch (error: any) {
    return errorHandler(error);
  }
}
