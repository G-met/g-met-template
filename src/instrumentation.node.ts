// lib/logger.ts
import type { Logger } from "pino";

declare global {
  // eslint-disable-next-line no-var
  var logger: Logger | undefined;
}

if (!globalThis.logger) {
  const pino = (await import("pino")).default;
  const pinoPretty = (await import("pino-pretty")).default;

  const streams: any[] = [];

  // Siempre mostrar en consola (bonito en local)
  streams.push({
    stream: pinoPretty({
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    }),
  });

  // Solo en dev y production, añadir Loki
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    const pinoLoki = (await import("pino-loki")).default;

    streams.push({
      stream: pinoLoki({
        host: process.env.LOKI_HOST || "",
        batching: true,
        interval: 5,
        labels: { app: "next-app" },
      }),
    });
  }

  const logger = pino(
    {
      level: process.env.LOG_LEVEL || "info",
    },
    pino.multistream(streams)
  );

  globalThis.logger = logger;
}

export const logger = globalThis.logger!;
