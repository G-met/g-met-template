import { ExecutorType } from "@/app/api/common/types";

export interface PatternExecutionDocument {
  name: string;
  url: string;
}

export interface PatternExecutionResponse {
  code: string;
  responsible: string;
  observations: string;
  executionDate: string;
  patternDescription: string;
  documents: PatternExecutionDocument[];
}


export interface CreatePatternExecution {
  executionDate: string;
  observations: string;
  patternScheduleId: string;
  executorId: string;
  executorType: ExecutorType;
  archivos?: File[];
}
