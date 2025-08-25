import { httpBaseV2 } from "@/app/config/api-base-v2";
import { FrequencyResponse, CreateFrequency } from "../types";

export const getFrequencies = async () => httpBaseV2.get<FrequencyResponse[]>("/frequency");

export const createFrequency = async (frequency: CreateFrequency) =>
  httpBaseV2.post<void>("/frequency", frequency);
