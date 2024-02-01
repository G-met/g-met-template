import { auth } from "@/lib/getSession";
import { obtenerResponsables } from "../../servicios/obtenerResponsables";
import { NextResponse } from "next/server";
import { errorHandler } from "@/app/api/common/errors/error.handler";
import { listarResponsables } from "../../servicios/listarResponsables";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    console.log(searchParams.get("page"));
    const page = Number(searchParams.get("page")) || 1;
    const responsables = await listarResponsables(
      session.user.cliente_id,
      page
    );
    return NextResponse.json(responsables);
  } catch (error: any) {
    return errorHandler(error);
  }
}
