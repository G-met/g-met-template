import { httpBaseV2 } from "@/app/config/api-base-v2";
import { EquipmentExecutionResponse, CreateEquipmentExecution, UploadFilesToEquipmentExecution } from "../types/equipmentExecution.types";
import { createFormData } from "@/lib/helpers/formData";

export const getEquipmentExecutions = async () =>
  httpBaseV2.get<EquipmentExecutionResponse[]>("/equipment-executions");

export const createEquipmentExecution = async (data: CreateEquipmentExecution) => {
  const formData = createFormData(data);
  return httpBaseV2.post<void>("/equipment-executions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFilesToEquipmentExecution = async (data: UploadFilesToEquipmentExecution) => {
  const formData = createFormData(data);
  return httpBaseV2.patch<void>("/equipment-executions/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};