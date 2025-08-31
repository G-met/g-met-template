import { httpBaseV2 } from "@/app/config/api-base-v2";
import { CreatePatternTypePayload, PatternTypeResponse } from "../types";

const BASE_URL = "/pattern-type";

export const getAllPatternTypes = async () =>
  httpBaseV2.get<PatternTypeResponse[]>(BASE_URL);

export const createPatternType = async (payload: CreatePatternTypePayload) =>
  httpBaseV2.post<PatternTypeResponse>(BASE_URL, payload);
