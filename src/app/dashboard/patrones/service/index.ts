import { httpBaseV2 } from "@/app/config/api-base-v2";
import {
  PatternResponse,
  CreatePattern,
  CreateMetrologicalData,
  CreateComplementaryData,
  PatternDetail,
  CreateMetrologicalDataPattern,
  UpdateMetrologicalDataPattern,
  CreateComplementaryDataPattern,
  UpdateComplementaryDataPattern,
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

export const createMetrologicalDataPattern = async (
  data: CreateMetrologicalDataPattern
) => httpBaseV2.post<void>("/metrological-data-patterns", data);

export const updateMetrologicalDataPattern = async (
  patternCode: string,
  data: UpdateMetrologicalDataPattern
) => httpBaseV2.put<void>(`/metrological-data-patterns/${patternCode}`, data);

export const createComplementaryData = async (data: CreateComplementaryData) =>
  httpBaseV2.post<void>("/patterns/complementary", data);

export const createComplementaryDataPattern = async (
  data: CreateComplementaryDataPattern
) => httpBaseV2.post<void>("/complementary-data-patterns", data);

export const updateComplementaryDataPattern = async (
  patternCode: string,
  data: UpdateComplementaryDataPattern
) => httpBaseV2.put<void>(`/complementary-data-patterns/${patternCode}`, data);

export const getPatternByCode = async (code: string) =>
  httpBaseV2.get<PatternDetail>(`/patterns/${code}`);
