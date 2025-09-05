export interface ProviderResponse {
  id: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  address?: string;
  phone?: string;
  email?: string;
  contactName?: string;
  contactPhone?: string;
  createdAt: Date | string;
}

export type CreateProvider = {
  name: string;
  identificationType: string;
  identificationNumber: string;
  address?: string;
  phone?: string;
  email?: string;
  contactName?: string;
  contactPhone?: string;
};

export type UpdateProvider = {
  name: string;
  identificationType: string;
  identificationNumber: string;
  address: string;
  phone: string;
  email: string;
  contactName: string;
  contactPhone: string;
};

export interface UpdateProviderProps extends UpdateProvider {
  id: string;
}
