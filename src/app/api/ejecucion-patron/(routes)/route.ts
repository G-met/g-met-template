import { NextResponse } from "next/server";
import { auth } from "@/lib/getSession";
import { errorHandler } from "../../common/errors/error.handler";
import { CrearEjecucionPatrones } from "../application/use-cases/writer/crearEjecucionPatron";
import { EjecucionPatronWriteRepositoryImp } from "../infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import { ResponsableReaderRepoImp } from "../../responsables/infrastructure/reader/responsableReaderRepoImp";
import {
  CrearEjecucionDTO,
  validarCrearEjecucionPatron,
} from "../application/dto/crearEjecucionPatron";
import { ListarEjecucionPatrones } from "../application/use-cases/reader/listarEjecucionPatrones";
import { EjecucionPatronesReadRepositoryImp } from "../infrastructure/reader/ejecucionEquiposReadRepositoryImp";
import { ProgramacionPatronesRepositoryReadImp } from "../../programacion-patrones/infraestructure/read/programacionPatronesRepoImp";
import { ProgramacionPatronesWriteRepoImp } from "../../programacion-patrones/infraestructure/write/programacionPatronesWriteRepoImp";
import { SaveFiles } from "../../common/files/saveFiles";
import { ExecutorType } from "../../common/types";
import { ProveedorReadRepositoryImp } from "../../proveedor/infrastructure/reader/proveedorReadRepositoryImp";
import { ProveedorWriteRepositoryImp } from "../../proveedor/infrastructure/writer/proveedorWriteRepositoryImp";
import { ProveedorService } from "../../proveedor/dominio/service";
import { UsuarioReadRepositoryImp } from "../../usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "../../usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { UsuarioService } from "../../usuarios/dominio/service";

const ejecucionRepo = new EjecucionPatronWriteRepositoryImp();
const programacionRepoRead = new ProgramacionPatronesRepositoryReadImp();
const programacionRepoWrite = new ProgramacionPatronesWriteRepoImp();
const fileService = new SaveFiles();
const proveedorReadRepositoryImp = new ProveedorReadRepositoryImp();
const proveedorWriteRepositoryImp = new ProveedorWriteRepositoryImp();
const proveedorService = new ProveedorService(
  proveedorWriteRepositoryImp,
  proveedorReadRepositoryImp
);
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);

const crearEjecucionEquipos = new CrearEjecucionPatrones(
  ejecucionRepo,
  programacionRepoRead,
  programacionRepoWrite,
  usuarioService,
  proveedorService,
  fileService
);
const ejecucionRepoRead = new EjecucionPatronesReadRepositoryImp();
const listarEjecucionEquipos = new ListarEjecucionPatrones(ejecucionRepoRead);
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body: CrearEjecucionDTO = {
      fechaEjecucion: formData.get("fechaEjecucion") as string,
      observaciones: formData.get("observaciones") as string,
      ejecutorId: formData.get("ejecutorId") as string,
      programacionPatronId: formData.get("programacionPatronId") as string,
      archivos: formData.getAll("archivos") as File[],
      tipoEjecutor: formData.get("tipoEjecutor") as ExecutorType,
    };
    validarCrearEjecucionPatron(body);
    const session = await auth();

    await crearEjecucionEquipos.execute(session.user.clienteId, body);
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
