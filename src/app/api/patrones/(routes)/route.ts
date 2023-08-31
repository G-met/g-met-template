import { NextResponse } from "next/server";
import { crearPatron } from "../servicios/crearPatron";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearPatron } from "../dtos/crearPatrones";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearPatron(body);
    const patron = await crearPatron(body);
    return NextResponse.json({ msg: "patron creado creado", patron });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
  } catch (error: any) {
    return errorHandler(error);
  }
}