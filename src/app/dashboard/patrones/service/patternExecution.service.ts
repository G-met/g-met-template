import { httpBaseV2 } from "@/app/config/api-base-v2";
import { PatternExecutionResponse, CreatePatternExecution } from "../types/patternExecution.types";
import { createFormData } from "@/lib/helpers/formData";

export const getPatternExecutions = async () =>
  httpBaseV2.get<PatternExecutionResponse[]>("/pattern-executions");

export const createPatternExecution = async (data: CreatePatternExecution) => {
  const formData = createFormData(data);
  return httpBaseV2.post<void>("/pattern-executions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
