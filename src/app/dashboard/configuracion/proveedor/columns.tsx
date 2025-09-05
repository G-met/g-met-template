"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProviderResponse, UpdateProvider, UpdateProviderProps } from "./types";
import { DropDownMenuProveedor } from "./dropDownMenu";

export const columns: ColumnDef<ProviderResponse>[] = [
  {
    accessorKey: "name",
    header: "Nombre empresa",
  },
  {
    accessorKey: "identificationType",
    header: "Tipo Identificacion",
  },
  {
    accessorKey: "identificationNumber",
    header: "Numero Identificacion",
  },
  {
    accessorKey: "contactName",
    header: "Nombre contacto",
  },
  {
    accessorKey: "contactPhone",
    header: "Telefono contacto",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const proveedorDto: UpdateProviderProps = {
        id: row.original.id,
        name: row.original.name,
        identificationType: row.original.identificationType,
        identificationNumber: row.original.identificationNumber,
        address: row.original.address || "",
        phone: row.original.phone || "",
        email: row.original.email || "",
        contactName: row.original.contactName || "",
        contactPhone: row.original.contactPhone || "",
      };
      return <DropDownMenuProveedor proveedorDto={proveedorDto} />;
    },
  },
];
