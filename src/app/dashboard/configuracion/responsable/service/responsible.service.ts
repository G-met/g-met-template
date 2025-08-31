import { httpBaseV2 } from "@/app/config/api-base-v2";
import { CreateResponsible, Responsible } from "../types";

const BASE_URL = "/responsable";

export const getAllResponsible = async (): Promise<Responsible[]> => {
  const { data } = await httpBaseV2.get<Responsible[]>(BASE_URL);
  return data;
};

export const createResponsible = async (
  payload: CreateResponsible
): Promise<Responsible> => {
  const { data } = await httpBaseV2.post<Responsible>(BASE_URL, payload);
  return data;
};
