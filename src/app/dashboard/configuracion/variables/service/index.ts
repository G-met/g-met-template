import { httpBaseV2 } from "@/app/config/api-base-v2";
import { VariableResponse, CreateVariable } from "../types";

export const getVariables = async () => httpBaseV2.get<VariableResponse[]>("/variable");

export const createVariable = async (variable: CreateVariable) =>
  httpBaseV2.post<void>("/variable", variable);
