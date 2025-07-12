import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import {
  CrearEquipoDto,
  validarCrearEquipo,
} from "../application/dtos/crearEquipo.dto";
import { crearEquipo } from "../application/servicios/crearEquipo";
import { validarEditarEquipo } from "../application/dtos/editarEquipo.dto";
import { editarEquipo } from "../application/servicios/editarEquipo";
import { auth } from "@/lib/getSession";
import { ListarEquiposUseCaseImp } from "../application/use-cases/reader/listarEquipos";
import { EquipoReadRepositoryImp } from "../infrastructure/reader/equipoReadRepository";
import { ListarEquipoTerminoUseCaseImp } from "../application/use-cases/reader/listarEquiposPorTermino";
import { CrearDatosBasicosUseCaseImp } from "../application/use-cases/writer/crearDatosBasicos";
import { EquipoWriteRepositoryImp } from "../infrastructure/writer/equipoWriteRepository";
import { MarcaReadRepositoryImp } from "../../marca/infrastructure/reader/marcaReadRepositoryImp";
import { UbicacionRepositoryReadImp } from "../../ubicaciones/infrastructure/read/ubicacionRepositoryReadImp";
import { EquipoService } from "../dominio/service";
import { formDataToDto } from "@/lib/helpers/formData";
import { SaveFiles } from "../../common/files/saveFiles";
const equipoReadRepository = new EquipoReadRepositoryImp();
const equipoWriteRepository = new EquipoWriteRepositoryImp();
const marcaReadRepository = new MarcaReadRepositoryImp();
const ubicacionReadRepository = new UbicacionRepositoryReadImp();
const listarEquiposUseCase = new ListarEquiposUseCaseImp(equipoReadRepository);
const equipoService = new EquipoService(equipoReadRepository);
const fileService = new SaveFiles();
const crearDatosBasicosUseCase = new CrearDatosBasicosUseCaseImp(
  equipoWriteRepository,
  equipoService,
  marcaReadRepository,
  ubicacionReadRepository,
  fileService
);
const listarEquipoTerminoUseCase = new ListarEquipoTerminoUseCaseImp(
  equipoReadRepository
);
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const dto = formDataToDto<CrearEquipoDto>(formData);
    const dtoTransform = validarCrearEquipo(dto);
    const session = await auth();
    await crearDatosBasicosUseCase.execute(
      session.user.clienteId,
      dtoTransform
    );
    return NextResponse.json({ msg: "equipo creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarEquipo(body);
    const session = await auth();
    await editarEquipo(body, session.user.clienteId);
    return NextResponse.json({ msg: "equipo editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const termino = searchParams.get("termino");
    const valor = searchParams.get("valor");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);

    //validar terminos de busqueda

    const session = await auth();
    if (termino && valor) {
      const equiposTermino = await listarEquipoTerminoUseCase.execute(
        session.user.clienteId,
        {
          limit,
          page,
          valor,
          termino,
        }
      );

      return NextResponse.json(equiposTermino);
    }
    const equipos = await listarEquiposUseCase.execute(
      session.user.clienteId,
      {
        limit,
        page,
        valor,
        termino,
      }
    );
    return NextResponse.json(equipos);
  } catch (error: any) {
    return errorHandler(error);
  }
}
