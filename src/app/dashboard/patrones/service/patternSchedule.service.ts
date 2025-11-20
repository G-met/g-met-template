import { httpBaseV2 } from "@/app/config/api-base-v2";
import { PatternScheduleResponse } from "../types/patternSchedule.types";

export const getPatternSchedules = async () =>
  httpBaseV2.get<PatternScheduleResponse[]>("/pattern-schedules");
