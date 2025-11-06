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

export interface EquipmentDetail {
  id: string;
  code: string;
  description: string;
  model: string;
  serial: string;
  brand: Brand;
  location: Location;
  responsible: Responsible;
  metrologicalData?: {
    id: string;
    emp: number;
    scaleDivision: number;
    resolution: number;
    minimumRange: number;
    maximumRange: number;
    nominalValue: number;
  } | null;
  complementaryData?: {
    id: string;
    specificationsDescription?: string | null;
    meetsInstallationSpecifications: boolean;
    usesSoftware: boolean;
    softwareDescription?: string | null;
    softwareVersion?: string | null;
    firmware?: string | null;
    observations?: string | null;
  } | null;
  documents?: Document[];
}

export interface EquipmentResponse {
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
  equipmentId: string;
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
  equipmentId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateEquipment {
  code: string;
  description: string;
  model: string;
  serial: string;
  brandId: string;
  locationId: string;
  documents?: File[] | null;
}

export interface UpdateEquipment {
  description?: string;
  model?: string;
  serial?: string;
  brandId?: string;
  locationId?: string;
  documents?: File[] | null;
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

export interface CreateMetrologicalDataEquipment {
  emp: number;
  scaleDivision: number;
  resolution: number;
  minimumRange: number;
  maximumRange: number;
  nominalValue: number;
  equipmentCode: string;
}

export interface UpdateMetrologicalDataEquipment {
  emp?: number;
  scaleDivision?: number;
  resolution?: number;
  minimumRange?: number;
  maximumRange?: number;
  nominalValue?: number;
}

export interface CreateComplementaryDataEquipment {
  specificationsDescription: string;
  meetsInstallationSpecifications: boolean;
  usesSoftware: boolean;
  softwareDescription?: string | null;
  softwareVersion?: string | null;
  firmware?: string | null;
  observations?: string | null;
  equipmentId: string;
}

export interface UpdateComplementaryDataEquipment {
  specificationsDescription?: string;
  meetsInstallationSpecifications?: boolean;
  usesSoftware?: boolean;
  softwareDescription?: string | null;
  softwareVersion?: string | null;
  firmware?: string | null;
  observations?: string | null;
}
