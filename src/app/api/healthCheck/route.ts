import { getLogger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const log = await getLogger();
  log.info("Health check endpoint hit");
  return new NextResponse("OK", { status: 200 });
}
