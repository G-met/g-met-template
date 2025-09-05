import { httpBaseV2 } from "@/app/config/api-base-v2";
import { ProviderResponse, CreateProvider, UpdateProvider } from "../types";

export const getProviders = async () => httpBaseV2.get<ProviderResponse[]>("/providers");

export const createProvider = async (provider: CreateProvider) =>
  httpBaseV2.post<void>("/providers", provider);

export const updateProvider = async (id: string, provider: UpdateProvider) =>
  httpBaseV2.patch<void>(`/providers/${id}`, provider);
