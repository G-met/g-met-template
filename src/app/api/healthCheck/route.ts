import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  return new NextResponse("OK", { status: 200 });
}
