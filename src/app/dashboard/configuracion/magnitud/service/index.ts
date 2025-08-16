import { httpBaseV2 } from "@/app/config/api-base-v2";
import { MagnitudResponse, CreateMagnitud } from "../types";

export const getMagnitudes = async () => httpBaseV2.get<MagnitudResponse[]>("/magnitude");

export const createMagnitud = async (magnitud: CreateMagnitud) =>
  httpBaseV2.post<void>("/magnitude", magnitud);
