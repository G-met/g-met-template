import { httpBaseV2 } from "@/app/config/api-base-v2";
import {
  EquipmentResponse,
  CreateEquipment,
  UpdateEquipment,
  EquipmentDetail,
} from "../types";
import { createFormData } from "@/lib/helpers/formData";

export const getEquipments = async () =>
  httpBaseV2.get<EquipmentResponse[]>("/equipments");

export const createEquipment = async (equipment: CreateEquipment) => {
  const formData = createFormData(equipment);
  return httpBaseV2.post<void>("/equipments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEquipmentByCode = async (code: string) =>
  httpBaseV2.get<EquipmentDetail>(`/equipments/${code}`);

export const updateEquipment = async (
  code: string,
  equipment: UpdateEquipment
) => {
  const formData = createFormData(equipment);
  return httpBaseV2.put<void>(`/equipments/${code}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
