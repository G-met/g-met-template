export interface BrandResponse {
  id: string;
  identification: string;
  description: string;
  createdAt: Date;
}

export type CreateBrand = {
  description: string;
  identification: string;
}

export type UpdateBrand = CreateBrand & {
  id: string;
}
