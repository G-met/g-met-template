export interface ActivityResponse {
  id: string;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  inactivatedAt?: string | Date | null;
}

export interface CreateActivity {
  description: string;
}
