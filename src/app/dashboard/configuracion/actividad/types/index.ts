export interface ActivityResponse {
  id: string;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  inactivatedAt?: string | Date | null;
  clientId: string;
}

export interface CreateActivity {
  description: string;
}
