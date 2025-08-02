import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/metrics";

export async function GET(_request: NextRequest) {
  try {
    const metrics = await register.metrics();

    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": register.contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error generating metrics:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

// Opcional: También permitir HEAD requests para health checks
export const HEAD = GET;
