import { httpBaseV2 } from "@/app/config/api-base-v2";
import { PatternScheduleResponse, CreatePatternSchedule } from "../types/patternSchedule.types";

export const getPatternSchedules = async () =>
  httpBaseV2.get<PatternScheduleResponse[]>("/pattern-schedules");

export const createPatternSchedule = async (data: CreatePatternSchedule) =>
  httpBaseV2.post<void>("/pattern-schedules", data);
