export enum AlertLevel {
  EXPIRED = 'EXPIRED',
  WARNING = 'WARNING',
  ON_TIME = 'ON_TIME',
}

export enum ScheduleStatus {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

export interface AlertStatus {
  level: AlertLevel;
  daysUntilDue: number;
}

export interface PatternScheduleResponse {
  id: string;
  activity: string;
  code: string;
  description: string;
  scheduledDate: string;
  frequency: string;
  alertStatus: AlertStatus;
  status: ScheduleStatus;
}

export interface CreatePatternSchedule {
  activityId: string;
  frequencyId: string;
  patternId: string;
  scheduledDate: string;
  status: ScheduleStatus;
}
