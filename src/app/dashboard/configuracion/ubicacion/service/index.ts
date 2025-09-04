import { httpBaseV2 } from "@/app/config/api-base-v2";
import { LocationResponse, CreateLocation } from "../types";

export const getLocations = async () => httpBaseV2.get<LocationResponse[]>("/location");

export const createLocation = async (location: CreateLocation) =>
  httpBaseV2.post<void>("/location", location);
