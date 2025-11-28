import { ExecutorType } from "@/app/api/common/types";

export interface EquipmentExecutionDocument {
  name: string;
  url: string;
}

export interface EquipmentExecutionResponse {
  code: string;
  responsible: string;
  observations: string;
  executionDate: string;
  equipmentDescription: string;
  documents: EquipmentExecutionDocument[];
}

export interface CreateEquipmentExecution {
  executionDate: string;
  observations: string;
  equipmentScheduleId: string;
  executorId: string;
  executorType: ExecutorType;
  files?: File[];
}