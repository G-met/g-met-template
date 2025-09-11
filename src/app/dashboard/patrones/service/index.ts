import { httpBaseV2 } from "@/app/config/api-base-v2";
import {
  PatternResponse,
  CreatePattern,
  CreateMetrologicalData,
  CreateComplementaryData,
} from "../types";
import { createFormData } from "@/lib/helpers/formData";

export const getPatterns = async () =>
  httpBaseV2.get<PatternResponse[]>("/patterns");

export const createPattern = async (pattern: CreatePattern) => {
  const formData = createFormData(pattern);
  return httpBaseV2.post<void>("/patterns", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createMetrologicalData = async (data: CreateMetrologicalData) =>
  httpBaseV2.post<void>("/patterns/metrological", data);

export const createComplementaryData = async (data: CreateComplementaryData) =>
  httpBaseV2.post<void>("/patterns/complementary", data);
