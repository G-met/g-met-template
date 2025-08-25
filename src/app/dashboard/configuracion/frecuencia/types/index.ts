export interface FrequencyResponse {
  id: string;
  description: string;
  days: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
  clientId: string;
}

export type CreateFrequency = {
  description: string;
  daysQuantity: number;
}
