import { httpBaseV2 } from "@/app/config/api-base-v2";
import { EquipmentScheduleResponse, CreateEquipmentSchedule } from "../types/equipmentSchedule.types";

export const getEquipmentSchedules = async () =>
  httpBaseV2.get<EquipmentScheduleResponse[]>("/equipment-schedules");

export const createEquipmentSchedule = async (data: CreateEquipmentSchedule) =>
  httpBaseV2.post<void>("/equipment-schedules", data);
