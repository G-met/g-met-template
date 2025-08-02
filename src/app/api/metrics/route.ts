import client from 'prom-client';
import { NextRequest, NextResponse } from 'next/server';

// Crear registro global (para que capture las métricas del middleware)
const register = client.register;

// Recolectar métricas por defecto solo una vez
if (!register.getSingleMetric('process_cpu_user_seconds_total')) {
  client.collectDefaultMetrics({ register });
}

export async function GET(request: NextRequest) {
  try {
    const metrics = await register.metrics();
    
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': register.contentType,
      },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return new NextResponse('Error generating metrics', { 
      status: 500 
    });
  }
}
