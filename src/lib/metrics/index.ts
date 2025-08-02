// lib/metrics.ts
import client, { Counter, Registry } from "prom-client";

// Crear registro único
export const register = new client.Registry();

declare global {
  // eslint-disable-next-line no-var
  var metrics:
    | {
        registry: Registry;
        userSignups: Counter;
      }
    | undefined;
}

// Configurar métricas por defecto UNA SOLA VEZ
client.collectDefaultMetrics({
  register,
  prefix: "nextjs_",
});

// Métricas personalizadas (si las necesitas)
export const httpRequestsTotal = new client.Counter({
  name: "nextjs_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "status_code", "route"],
  registers: [register], // Importante: registrar explícitamente
});

export const httpRequestDuration = new client.Histogram({
  name: "nextjs_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "status_code", "route"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

console.log("✅ Prometheus metrics configured");
