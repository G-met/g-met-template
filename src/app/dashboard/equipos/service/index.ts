import { httpBaseV2 } from "@/app/config/api-base-v2";
import {
  EquipmentResponse,
  CreateEquipment,
  UpdateEquipment,
  EquipmentDetail,
  CreateMetrologicalDataEquipment,
  UpdateMetrologicalDataEquipment,
  CreateComplementaryDataEquipment,
  UpdateComplementaryDataEquipment,
  MetrologicalDataEquipmentResponse,
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

export const createMetrologicalDataEquipment = async (
  data: CreateMetrologicalDataEquipment
) => httpBaseV2.post<MetrologicalDataEquipmentResponse>("/metrological-data-equipments", data);

export const updateMetrologicalDataEquipment = async (
  equipmentCode: string,
  data: UpdateMetrologicalDataEquipment
) =>
  httpBaseV2.put<void>(
    `/metrological-data-equipments/${equipmentCode}`,
    data
  );

export const createComplementaryDataEquipment = async (
  data: CreateComplementaryDataEquipment
) => httpBaseV2.post<void>("/complementary-data-equipments", data);

export const updateComplementaryDataEquipment = async (
  equipmentCode: string,
  data: UpdateComplementaryDataEquipment
) =>
  httpBaseV2.put<void>(
    `/complementary-data-equipments/${equipmentCode}`,
    data
  );
