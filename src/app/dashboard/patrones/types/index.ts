export interface Brand {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface Responsible {
  id: string;
  name: string;
}

export interface PatternType {
  id: string;
  name: string;
}

export interface PatternDetail {
  id: string;
  code: string;
  description: string;
  model: string;
  serial: string;
  brand: Brand;
  location: Location;
  responsible: Responsible;
  patternType: PatternType;
}

export interface PatternResponse {
  id: string;
  code: string;
  description: string;
  brandName: string;
  responsible: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
}

export interface MetrologicalData {
  id: string;
  emp: number;
  scaleDivision: number;
  resolution: number;
  minRange: number;
  maxRange: number;
  nominalValue: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  patternId: string;
}

export interface ComplementaryData {
  id: string;
  specificationsDescription?: string | null;
  meetsInstallationSpecifications: boolean;
  usesSoftware: boolean;
  softwareDescription?: string | null;
  softwareVersion?: string | null;
  firmware?: string | null;
  observations?: string | null;
  patternId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreatePattern {
  code: string;
  description: string;
  model: string;
  serial: string;
  brandId: string;
  locationId: string;
  patternTypeId: string;
  files: File[] | null;
  lote?: string;
  expirationDate?: string;
}

export interface CreateMetrologicalData {
  emp: number;
  scaleDivision: number;
  resolution: number;
  minRange: number;
  maxRange: number;
  nominalValue: number;
}

export interface CreateComplementaryData {
  specificationsDescription?: string | null;
  meetsInstallationSpecifications: boolean;
  usesSoftware: boolean;
  softwareDescription?: string | null;
  softwareVersion?: string | null;
  firmware?: string | null;
  observations?: string | null;
}

export interface Location {
  id: string;
  // add other fields if needed
}

export interface Client {
  id: string;
  // add other fields if needed
}
