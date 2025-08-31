export interface Responsible {
  id: string;
  identification: string;
  name: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateResponsible {
  identification: string;
  name: string;
  lastName: string;
}
