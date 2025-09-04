export interface LocationResponse {
  id: string;
  name: string;
  responsible: {
    id: string;
    name: string;
  };
  createdAt: Date | string;
}

export type CreateLocation = {
  name: string;
  responsibleId: string;
}
