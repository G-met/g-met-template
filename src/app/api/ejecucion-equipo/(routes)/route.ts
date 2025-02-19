import { NextResponse } from "next/server";
import { auth } from "@/lib/getSession";
import { errorHandler } from "../../common/errors/error.handler";
import { CrearEjecucionEquipos } from "../application/use-cases/writer/crearEjecucionEquipos";
import { EjecucionEquipoWriteRepositoryImp } from "../infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import {
  validarCrearEjecucionEquipo,
  CrearEjecucionDTO,
} from "../application/dto/crearEjecucionEquipo";
import { EquipoReadRepositoryImp } from "../../equipos/infrastructure/reader/equipoReadRepository";
import { EquipoWriteRepositoryImp } from "../../equipos/infrastructure/writer/equipoWriteRepository";
import { ListarEjecucionEquipos } from "../application/use-cases/reader/listarEjecucionEquipos";
import { EjecucionEquiposReadRepositoryImp } from "../infrastructure/reader/ejecucionEquiposReadRepositoryImp";
import { SaveFilesVercel } from "../../common/files/saveFiles";
import { ProveedorService } from "../../proveedor/dominio/service/index";
import { UsuarioService } from "../../usuarios/dominio/service";
import { UsuarioReadRepositoryImp } from "../../usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "../../usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { ProveedorReadRepositoryImp } from "../../proveedor/infrastructure/reader/proveedorReadRepositoryImp";
import { ProveedorWriteRepositoryImp } from "../../proveedor/infrastructure/writer/proveedorWriteRepositoryImp";
import { TipoEjecutor } from "../../common/types";

const ejecucionRepo = new EjecucionEquipoWriteRepositoryImp();
const equipoRepo = new EquipoReadRepositoryImp();
const equipoRepoWrite = new EquipoWriteRepositoryImp();
const fileService = new SaveFilesVercel();
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const proveedorReadRepositoryImp = new ProveedorReadRepositoryImp();
const proveedorWriteRepositoryImp = new ProveedorWriteRepositoryImp();
const proveedorService = new ProveedorService(
  proveedorWriteRepositoryImp,
  proveedorReadRepositoryImp
);
const crearEjecucionEquipos = new CrearEjecucionEquipos(
  ejecucionRepo,
  equipoRepo,
  equipoRepoWrite,
  usuarioService,
  proveedorService,
  fileService
);
const ejecucionRepoRead = new EjecucionEquiposReadRepositoryImp();
const listarEjecucionEquipos = new ListarEjecucionEquipos(ejecucionRepoRead);
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body: CrearEjecucionDTO = {
      fechaEjecucion: formData.get("fechaEjecucion") as string,
      observaciones: formData.get("observaciones") as string,
      ejecutorId: formData.get("ejecutorId") as string,
      programacionEquipoId: formData.get("programacionEquipoId") as string,
      archivos: formData.getAll("archivos") as File[],
      tipoEjecutor: formData.get("tipoEjecutor") as TipoEjecutor,
    };

    const dto = validarCrearEjecucionEquipo(body);
    const session = await auth();

    await crearEjecucionEquipos.execute(session.user.clienteId, dto);
    return NextResponse.json({ msg: "ejecucion creada" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    const listado = await listarEjecucionEquipos.execute(
      session.user.clienteId
    );
    return NextResponse.json(listado);
  } catch (error: any) {
    return errorHandler(error);
  }
}
