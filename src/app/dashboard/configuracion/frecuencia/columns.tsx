"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FrequencyResponse } from "./types";

export const columns: ColumnDef<FrequencyResponse>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "daysQuantity",
    header: "Días",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("createdAt"));
      return (
        <>
          {fecha.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      );
    },
  },
];
