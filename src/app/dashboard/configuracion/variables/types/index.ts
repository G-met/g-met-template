export interface VariableResponse {
  id: string;
  alias: string;
  description: string;
  magnitudeId: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  inactiveAt: string | null;
}

export interface CreateVariable {
  alias: string;
  description: string;
  magnitudeId: string;
}
