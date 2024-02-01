import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearResponsable } from "../dtos/crearResponsable.dto";
import { obtenerResponsables } from "../servicios/obtenerResponsables";
import { crearResponsable } from "../servicios/crearResponsable";
import { auth } from "@/lib/getSession";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearResponsable(body);
    const session = await auth();

    await crearResponsable(body, session.user.cliente_id);
    return NextResponse.json({ msg: "responsable creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();  
    const responsables = await obtenerResponsables(session.user.cliente_id);
    return NextResponse.json(responsables);
  } catch (error: any) {
    return errorHandler(error);
  }
}
