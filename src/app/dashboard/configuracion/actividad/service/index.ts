import { httpBaseV2 } from "@/app/config/api-base-v2";
import { ActivityResponse, CreateActivity } from "../types";

export const getActivities = async () => httpBaseV2.get<ActivityResponse[]>("/activity");

export const createActivity = async (activity: CreateActivity) =>
  httpBaseV2.post<void>("/activity", activity);
