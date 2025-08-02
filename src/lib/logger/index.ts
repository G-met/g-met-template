// lib/getLogger.ts
import type { Logger } from "pino";

declare global {
  // eslint-disable-next-line no-var
  var logger: Logger | undefined;
}

export const getLogger = async (): Promise<Logger> => {
  if (globalThis.logger) return globalThis.logger;

  const pino = (await import("pino")).default;
  const pinoPretty = (await import("pino-pretty")).default;

  const streams: any[] = [];

  streams.push({
    stream: pinoPretty({
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    }),
  });

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

  globalThis.logger = pino(
    {
      level: process.env.LOG_LEVEL || "info",
    },
    pino.multistream(streams)
  );

  globalThis.logger.info("Logger initialized");

  return globalThis.logger;
};
