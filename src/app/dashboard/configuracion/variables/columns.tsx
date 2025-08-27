"use client";

import { ColumnDef } from "@tanstack/react-table";

import { VariableResponse } from "./types";

export const columns: ColumnDef<VariableResponse>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "alias",
    header: "Alias",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
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
