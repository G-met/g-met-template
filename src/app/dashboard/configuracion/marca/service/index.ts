import { httpBaseV2 } from "@/app/config/api-base-v2";
import { BrandResponse, CreateBrand, UpdateBrand } from "../types";

export const getBrands = async () => httpBaseV2.get<BrandResponse[]>("/brands");

export const createBrand = async (brand: CreateBrand) =>
  httpBaseV2.post<void>("/brands", brand);

export const updateBrand = async (brand: UpdateBrand) =>
  httpBaseV2.put<void>(`/brands/${brand.id}`, brand);
