export interface PatternTypeResponse {
  id: string;
  alias: string;
  description: string;
  createdAt: string;
  inactivatedAt: string | null;
}

export type CreatePatternTypePayload = Omit<
  PatternTypeResponse,
  "id" | "createdAt" | "inactivatedAt"
>;
