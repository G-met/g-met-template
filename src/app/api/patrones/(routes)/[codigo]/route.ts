import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { obtenerPatronPorCodigo } from "../../servicios/obtenerPatronPorCodigo";
import { auth } from "@/lib/getSession";

export async function GET(_request: Request, props: { params: Promise<{ codigo: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    const equipo = await obtenerPatronPorCodigo(
      params.codigo,
      session.user.clienteId
    );
    return NextResponse.json(equipo);
  } catch (error: any) {
    return errorHandler(error);
  }
}
